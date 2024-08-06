import templateEngine from '../engine.js'
import { parsePlayers } from '../utils.js';

const template = {
    tag: 'div',
    cls: ['d-flex', 'flex-column', 'justify-content-center'],
    attrs: {
        style: 'margin-top: 150px; width: 400px;'
    },
    content: [
        {
            tag: 'div',
            cls: 'form-floating',
            content: [
                {
                    tag: 'textarea',
                    cls: 'form-control',
                    attrs: {
                        placeholder: 'Leave a comment here',
                        id: 'floatingTextarea2',
                        style: 'height: 200px;'
                    }
                },
                {
                    tag: 'label',
                    attrs: {
                        for: 'floatingTextarea2'
                    },
                    content: 'Enter the players names throug space'
                }
            ]
        },
        {
            tag: 'button',
            cls: ['btn', 'btn-primary'],
			attrs: {id: 'submit-tournament'},
            content: 'Submit'
        }
    ]
};

export function choosePlayers() {
	const button = document.getElementById('submit-tournament');
	button.addEventListener('click', () => {
		const players = document.getElementById('floatingTextarea2');

		console.log(parsePlayers(players.value));
	})
}

export const tournamentElement = templateEngine(template);

