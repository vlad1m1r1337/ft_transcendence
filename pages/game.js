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
            tag: 'h2',
            content: [
                'Score ',
                {
                    tag: 'span',
                    cls: ['text-primary'],
                    content: '0',
					attrs: {
						id: 'score-1'
					}
                },
                ' : ',
                {
                    tag: 'span',
                    cls: ['text-danger'],
                    content: '0',
					attrs: {
						id: 'score-2'
					}
                }
            ]
        },
        {
            tag: 'div',
            attrs: {id: 'game', style: 'padding: 10px; background-color: red; border-radius: 10px' }
        }
    ]
};

export const GamePageElement = templateEngine(game_page);

