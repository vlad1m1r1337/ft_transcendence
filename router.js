import { GamePageElement } from "./pages/game.js";
import { MainPageElement } from "./pages/main.js";
import { PingPongMain } from "./pages/ping-pong.js";
import { PingPongMulti } from "./pages/ping-pong-multi.js";
import { ClickerMain } from "./pages/clicker.js"
import { ClickerSingle } from "./pages/clicker-game.js";
import { tournamentElement } from "./pages/tournament.js";
import { namePlayers } from "./pages/tournament.js";
import { gamePlay } from "./game_play.js";
import resetClicker from "./pages/clicker-game.js"
import {showNames} from "./utils.js"
import {nameClickerPlayers} from "./pages/tournament.js";

const route = (event) => {
    event.preventDefault();
	event = event || window.event;
    if (window.location.href !== event.target.href) {
        window.history.pushState({}, "", event.target.href);
    }
    handleLocation();
};

const handleLocation = () => {
    const path = window.location.pathname;
    console.log('path', path);
    const mainPage = document.getElementById('main-page');
    GLOBAL.isAnimate = false;
    GLOBAL.newGame = true;
    while (mainPage.firstChild) {
        mainPage.removeChild(mainPage.firstChild);
    }
    let game;
    switch (path) {
        case "/":
            // mainPage.appendChild(MainPageElement);
            MainPageElement();
            break;
        case "/ping-pong":
            PingPongMain();
            break;
        case "/ping-pong-single":
            mainPage.appendChild(GamePageElement);
            game =  document.getElementById('game');
            game.appendChild(gamePlay);
            GLOBAL.isAnimate = true;
            GLOBAL.mode = 'single';
            showNames();
            break;
        case "/ping-pong-multi":
            // mainPage.appendChild(PingPongMulti);
            PingPongMulti();
            break;
        case "/ping-pong-multi-one-board":
            mainPage.appendChild(GamePageElement);
            game =  document.getElementById('game');
            game.appendChild(gamePlay);
            GLOBAL.isAnimate = true;
            GLOBAL.mode = 'multi';
            showNames();
            break;
        case "/clicker":
            mainPage.appendChild(ClickerMain);
            break;
        case "/clicker/single":
            mainPage.appendChild(ClickerSingle);
            GLOBAL.mode = 'single';
            resetClicker();
            break;
        case "/ping-pong/multi/tournament":
            mainPage.appendChild(tournamentElement);
            GLOBAL.mode = 'tournament';
            namePlayers();
            break;
        case "/clicker/tournament":
            mainPage.appendChild(tournamentElement);
            GLOBAL.mode = 'tournament';
            nameClickerPlayers();
            break;
        default:
            mainPage.textContent = '404 Page Not Found';
            break;
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
