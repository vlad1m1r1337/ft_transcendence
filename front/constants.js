const menu_template = {
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

export default menu_template;