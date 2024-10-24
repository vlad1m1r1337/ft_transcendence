export const menu_template = {
	tag: 'div',
	cls: ['d-flex', 'justify-content-center'],
	attrs: { style: 'margin-top: 200px;' },
	content: {
		tag: 'div',
		cls: ['btn-group-vertical'],
		attrs: {
			style: 'min-width: 250px; height: 100%; gap:10px',
			role: 'group',
			'aria-label': 'Vertical button group'
		},
		content: [
			{
				tag: 'a',
				cls: ['btn', 'btn-primary'],
				attrs: {
					style: 'font-size: xx-large;',
					href: '/game',
					onclick: 'route(event)'
				},
			},
			{
				tag: 'a',
				cls: ['btn', 'btn-primary'],
				attrs: { type: 'button', style: 'font-size: xx-large;' },
			}
		]
	}
};

export const PlayerOneKey = {
	_pressed: {},
	W: 87,
	S: 83,
};

export const PlayerTwoKey = {
	_pressed: {},
	UP: 40,
	DOWN: 38,
};


