import templateEngine from '../engine.js'
import { parsePlayers } from '../utils.js';
import {GamePageElement} from "./game.js";
import {gamePlay} from "../game_play.js";
import resetClicker, {ClickerSingle} from "./clicker-game.js";

const template = {
    tag: 'div',
    cls: ['d-flex', 'flex-column', 'justify-content-center'],
    attrs: {
        style: 'margin-top: 150px; width: 400px; margin-left: auto; margin-right: auto;'
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
                    content: 'Enter the players names through comma'
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

export function appendGame() {
    const mainPage = document.getElementById('main-page');
    while (mainPage.firstChild) {
        mainPage.removeChild(mainPage.firstChild);
    }
    mainPage.appendChild(GamePageElement);
    const game =  document.getElementById('game');
    game.appendChild(gamePlay);
    GLOBAL.isAnimate = true;
}

function handleClickPong() {
    const button = document.getElementById('submit-tournament');

    const players = document.getElementById('floatingTextarea2');
    const playersArr = parsePlayers(players.value);
    if (playersArr.length < 2) {
        alert('Invalid');
        return;
    }
    GLOBAL.pong_players = parsePlayers(players.value);
    players.value = '';
    appendGame();
    button.removeEventListener('click', handleClickPong);
}

export function namePlayers() {
    const button = document.getElementById('submit-tournament');
    button.addEventListener('click', handleClickPong);
}

export function nameClickerPlayers() {
    const button = document.getElementById('submit-tournament');
    button.addEventListener('click', handleClickClicker);
}

const handleClickClicker = () => {
    const button = document.getElementById('submit-tournament');
    const players = document.getElementById('floatingTextarea2');
    const playersArr = parsePlayers(players.value);
    if (playersArr.length < 2) {
        alert('Invalid');
        return;
    }
    GLOBAL.clicker_players = parsePlayers(players.value);
    players.value = '';
    const mainPage = document.getElementById('main-page');
    while (mainPage.firstChild) {
        mainPage.removeChild(mainPage.firstChild);
    }
    mainPage.appendChild(ClickerSingle);
    resetClicker();
    button.removeEventListener('click', handleClickClicker);
}

export const tournamentElement = templateEngine(template);
