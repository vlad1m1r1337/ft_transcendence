import { SecondPageElement } from "./pages/second.js";
import { FirstPageElement } from "./pages/first.js";

const route = (event) => {
	console.log(event.target.href);
    event.preventDefault();
	event = event || window.event;
    window.history.pushState({}, "", event.target.href);
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
            mainPage.textContent = 'Main';
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