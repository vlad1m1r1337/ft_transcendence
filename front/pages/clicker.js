import templateEngine from "../engine.js";
import menu_template from "../constants.js";
import {findKeyByValue} from "../utils.js";

export const ClickerMain = () => {
    const language = localStorage.getItem('language');
    const transObj = translations[language];

    const elements = [
        { name: transObj.singleplayer, href: '/clicker/single' },
        { name: transObj.tournament, href: '/clicker/tournament' },
        { name: transObj.settings, href: '/clicker-settings' },
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
    const finPage = templateEngine(page);
    const mainPage = document.getElementById('main-page');
    mainPage.appendChild(finPage);
}
