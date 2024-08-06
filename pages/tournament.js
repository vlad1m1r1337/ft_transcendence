import templateEngine from '../engine.js'
import { parsePlayers } from '../utils.js';
import {GamePageElement} from "./game.js";
import {gamePlay} from "../game_play.js";

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

export function namePlayers() {
	const button = document.getElementById('submit-tournament');
	button.addEventListener('click', () => {
		const players = document.getElementById('floatingTextarea2');
        console.log('players')
		const playersArr = parsePlayers(players.value);
        if (playersArr.length < 2) {
            alert('Invalid'); return;
        }
        GLOBAL.pong_players = parsePlayers(players.value);
        players.value = '';

        const mainPage = document.getElementById('main-page');
        while (mainPage.firstChild) {
            mainPage.removeChild(mainPage.firstChild);
        }
        mainPage.appendChild(GamePageElement);
        const game =  document.getElementById('game');
        game.appendChild(gamePlay);
        GLOBAL.isAnimate = true;
        // const names = document.getElementById('players-name');
        // names.textContent = `${GLOBAL.pong_players[0]} vs ${GLOBAL.pong_players[1]}`;
	})
}

export const tournamentElement = templateEngine(template);

