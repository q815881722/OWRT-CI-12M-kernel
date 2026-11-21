'use strict';
'require view';

/* Nebula dashboard embedded as the LuCI "仪表板" view.
   Loads the standalone dashboard page in an iframe so its own CSS/JS
   stays isolated from LuCI's theme, and hides the duplicated icon rail
   (LuCI already provides the left menu). */
return view.extend({
	handleSave: null,
	handleSaveApply: null,
	handleReset: null,
	render: function () {
		return E('div', { 'class': 'nebula-dash-wrap', 'style': 'margin:calc(-1 * var(--v-card-px,16px));' },
			E('iframe', {
				'id': 'nebula-dash-frame',
				'src': '/dash/index.html?embed=1',
				'frameborder': '0',
				'scrolling': 'auto',
				'style': 'width:100%;height:calc(100vh - 118px);border:0;background:#0a0e1a;display:block;'
			})
		);
	}
});
