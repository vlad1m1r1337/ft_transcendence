import templateEngine from "../engine.js";
import menu_template from "../constants.js";

const elements = [
    { name: 'singleplayer', href: '/clicker/single' },
    { name: 'tournament', href: '/clicker/tournament' },
    { name: 'settings', href: '/clicker-settings' },
];

const links = elements.map((el) => {
    return {
        tag: 'a',
        cls: ['btn', 'btn-primary'],
        attrs: {
            style: 'font-size: xx-large; text-transform: uppercase;',
            href: el.href,
            onclick: 'route(event)'
        },
        content: el.name,
    };
});

const page = menu_template;

page.content.content = links;

export const ClickerMain = templateEngine(page);
