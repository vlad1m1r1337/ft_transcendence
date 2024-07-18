import templateEngine from "../engine.js";

const main_page = {
	tag: 'div',
	cls: ['d-flex', 'justify-content-center'],
	attrs: { style: 'margin-top: 200px;' },
	content: {
		tag: 'div',
		cls: ['btn-group-vertical'],
		attrs: {
			style: 'min-width: 250px; height: 100px; gap:10px',
			role: 'group',
			'aria-label': 'Vertical button group'
		},
		content: [
			{
				tag: 'a',
				cls: ['btn', 'btn-primary'],
				attrs: {
					type: 'button',
					style: 'font-size: xx-large;',
					href: '/game',
					id: 'game',
					onclick: 'route(event)'
				},
				content: 'GAME',
				events: {
					click: function(event) {
						route(event);
					}
				}
			},
			{
				tag: 'button',
				cls: ['btn', 'btn-primary'],
				attrs: { type: 'button', style: 'font-size: xx-large;' },
				content: 'SETTINGS'
			}
		]
	}
};

export const MainPageElement = templateEngine(main_page);