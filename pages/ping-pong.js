import templateEngine from "../engine.js";
import menu_template from "../constants.js";

const elements = [
    { name: 'singleplayer', href: '/ping-pong-single' },
    { name: 'multiplayer', href: '/ping-pong-multi' },
    { name: 'settings', href: 'ping-pong-settings' },
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

export const PingPongMain = templateEngine(page);
