'use strict';
'require view';

/* Nebula dashboard embedded as the LuCI "仪表板" view.
   Loads the standalone dashboard page in an iframe so its own CSS/JS
   stays isolated from LuCI's theme, and hides the duplicated icon rail
   (LuCI already provides the left menu).

   On narrow screens (phones) the iframe reports its real content height
   via postMessage so the page scrolls naturally instead of showing a
   nested scrollbar / clipped bottom. */
return view.extend({
	handleSave: null,
	handleSaveApply: null,
	handleReset: null,
	render: function () {
		var node = E('div', { 'class': 'nebula-dash-wrap', 'style': 'margin:calc(-1 * var(--v-card-px,16px));' },
			E('iframe', {
				'id': 'nebula-dash-frame',
				'src': '/dash/index.html?embed=1',
				'frameborder': '0',
				'scrolling': 'auto',
				'style': 'width:100%;height:calc(100vh - 118px);border:0;background:#0a0e1a;display:block;'
			})
		);

		/* bind once per page: resize the dashboard iframe to its content height */
		if (!window.__nebulaHeightBound) {
			window.__nebulaHeightBound = true;
			window.addEventListener('message', function (ev) {
				var d = ev.data;
				if (!d || typeof d.nebulaHeight !== 'number') return;
				if (d.nebulaHeight < 200 || d.nebulaHeight > 20000) return;
				var f = document.getElementById('nebula-dash-frame');
				if (f) {
					f.style.height = d.nebulaHeight + 'px';
					f.setAttribute('scrolling', 'no');
				}
			});
			/* back to desktop width: restore the default fixed height */
			window.addEventListener('resize', function () {
				if (window.innerWidth >= 900) {
					var f = document.getElementById('nebula-dash-frame');
					if (f) {
						f.style.height = 'calc(100vh - 118px)';
						f.setAttribute('scrolling', 'auto');
					}
				}
			});
		}

		return node;
	}
});
