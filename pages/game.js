import templateEngine from '../engine.js'

const game_page = {
	tag: 'div',
	cls: ['d-flex', 'justify-content-center', 'align-items-center', 'flex-column'],
	attrs: { style: 'margin-top: 200px;' },
	content: [
		{
			tag: 'h1',
			content: 'GAME'
		},
		{
			tag: 'div',
			attrs: { style: 'width: 500px; height: 500px; background-color: brown;' }
		}
	]
};

export const GamePageElement = templateEngine(game_page);

