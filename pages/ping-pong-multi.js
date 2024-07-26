import templateEngine from "../engine.js";
import menu_template from "../constants.js";

const elements = [
    { name: 'tournament', href: '/ping-pong/multi/tournament' },
    { name: 'online', href: '/ping-pong/multi/online' },
    { name: 'on one keyboard', href: '/ping-pong/multi/one-board' },
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

export const PingPongMulti = templateEngine(page);
