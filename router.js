import {appendGameMulti, appendGameSingle, GamePageElement} from "./pages/game.js";
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
import {NotFound} from "./pages/404.js";

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
            MainPageElement();
            break;
        case "/ping-pong":
            PingPongMain();
            break;
        case "/ping-pong-single":
            GamePageElement();
            appendGameSingle();
            break;
        case "/ping-pong-multi":
            PingPongMulti();
            break;
        case "/ping-pong-multi-one-board":
            GamePageElement();
            appendGameMulti();
            break;
        case "/ping-pong/multi/tournament":
            tournamentElement();
            GLOBAL.mode = 'tournament';
            namePlayers();
            break;
        case "/clicker/tournament":
            tournamentElement();
            GLOBAL.mode = 'tournament';
            nameClickerPlayers();
            break;
        case "/clicker":
            ClickerMain();
            break;
        case "/clicker/single":
            ClickerSingle();
            GLOBAL.mode = 'single';
            resetClicker();
            break;
        default:
            NotFound();
            break;
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
