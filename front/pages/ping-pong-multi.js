import templateEngine from "../engine.js";
import {menu_template} from "../constants.js";
import {findKeyByValue} from "../utils.js";

function createDomEl() {
    const language = localStorage.getItem('language') || 'en';
    const transObj = translations[language];

    const elements = [
        { name: transObj.tournament, href: '/ping-pong/multi/tournament' },
        { name: transObj.on_one_keyboard, href: '/ping-pong-multi-one-board' },
        // {name: transObj.leaderboard, href: '/ping-pong-leaderboard'},
    ];

    const links = elements.map((el) => {
        return {
            tag: 'a',
            cls: ['btn', 'btn-primary'],
            attrs: {
                style: 'font-size: xx-large; text-transform: uppercase;',
                href: el.href,
                onclick: 'route(event)',
                'data-translate': findKeyByValue(translations[language], el.name),

            },
            content: el.name,
        };
    });

    const page = menu_template;

    page.content.content = links;
    return page;
}
export const PingPongMulti = () => {
    let  page = createDomEl();
    page = templateEngine(page);
    const mainPage = document.getElementById('main-page');
    mainPage.appendChild(page);
};
