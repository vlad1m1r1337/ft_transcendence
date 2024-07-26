import { GamePageElement } from "./pages/game.js";
import { MainPageElement } from "./pages/main.js";
import { PingPongMain } from "./pages/ping-pong.js";
import { PingPongMulti } from "./pages/ping-pong-multi.js";
import cutPath from "./utils.js";
import { gamePlay } from "./game_play.js";

const route = (event) => {
    console.log(event.target.href)
    event.preventDefault();
	event = event || window.event;
    if (window.location.href !== event.target.href) {
        window.history.pushState({}, "", event.target.href);
    }
    handleLocation();
};

const handleLocation = () => {
    const path = window.location.pathname;
    console.log('path:', path);
    const mainPage = document.getElementById('main-page');
    GLOBAL.isAnimate = false;
    while (mainPage.firstChild) {
        mainPage.removeChild(mainPage.firstChild);
    }
    let game;
    switch (cutPath(path)) {
        case "/":
            mainPage.appendChild(MainPageElement);
            break;
        
        case "/ping-pong":
            mainPage.appendChild(PingPongMain);
            break;
        case "/ping-pong/single":
            mainPage.appendChild(GamePageElement);
            game =  document.getElementById('game');
            game.appendChild(gamePlay);
            GLOBAL.isAnimate = true;
            break;
        case "/ping-pong/multi":
            mainPage.appendChild(PingPongMulti);
            break;
        case "/ping-pong/multi/one-board":
            mainPage.appendChild(GamePageElement);
            game =  document.getElementById('game');
            game.appendChild(gamePlay);
            GLOBAL.isAnimate = true;
            break;
        default:
            mainPage.textContent = '404 Page Not Found';
            break;
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();