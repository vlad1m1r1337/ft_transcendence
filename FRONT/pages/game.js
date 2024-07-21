import templateEngine from '../engine.js'

const game_page = {
	tag: 'div',
	cls: ['d-flex', 'justify-content-center', 'align-items-center', 'flex-column'],
	attrs: { style: 'margin-top: 50px;' },
	content: [
		{
			tag: 'h1',
			content: 'GAME'
		},
		{
			tag: 'div',
			attrs: {id: 'game', style: '' }
		}
	]
};

export const GamePageElement = templateEngine(game_page);

