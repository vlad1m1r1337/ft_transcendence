import { SecondPageElement } from "./pages/second.js";
import { FirstPageElement } from "./pages/first.js";
import { GamePageElement } from "./pages/game.js";
import { MainPageElement } from "./pages/main.js";
import { gamePlay } from "./game_play.js";
import setup from "./game_play.js";

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
    const mainPage = document.getElementById('main-page');
    while (mainPage.firstChild) {
        mainPage.removeChild(mainPage.firstChild);
    }
    switch (path) {
        case "/":
            mainPage.appendChild(MainPageElement);
            GLOBAL.isAnimate = false;
            break;
        case "/game":
            mainPage.appendChild(GamePageElement);
            const game =  document.getElementById('game');
            game.appendChild(gamePlay);
            GLOBAL.isAnimate = true;
            break;
        case "/first":
            mainPage.appendChild(FirstPageElement);
            break;
        case "/second":
            mainPage.appendChild(SecondPageElement);
            break;
        default:
            mainPage.textContent = '404 Page Not Found';
            break;
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();