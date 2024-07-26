import templateEngine from "../engine.js";

const main_page = {
    tag: 'div',
    cls: ['d-flex', 'justify-content-center', 'align-items-center', 'flex-wrap'],
    attrs: {
        style: 'height: calc(100svh - 150px); gap: 30px;'
    },
    content: [
        {
            tag: 'a',
            cls: ['card_link', 'd-flex', 'justify-content-center', 'align-items-center', 'text-[2196f3]'],
            attrs: {
                href: '/ping-pong',
                onclick: 'route(event)'
            },
            content: [
                { tag: 'span', cls: ['button__line', 'button__line--top'] },
                { tag: 'span', cls: ['button__line', 'button__line--right'] },
                { tag: 'span', cls: ['button__line', 'button__line--bottom'] },
                { tag: 'span', cls: ['button__line', 'button__line--left'] },
                'Ping Pong'
            ]
        },
        {
            tag: 'a',
            cls: ['card_link', 'd-flex', 'justify-content-center', 'align-items-center', 'text-[2196f3]'],
            attrs: {
                href: '/clicker',
                onclick: 'route(event)'
            },
            content: [
                { tag: 'span', cls: ['button__line', 'button__line--top'] },
                { tag: 'span', cls: ['button__line', 'button__line--right'] },
                { tag: 'span', cls: ['button__line', 'button__line--bottom'] },
                { tag: 'span', cls: ['button__line', 'button__line--left'] },
                'Clicker'
            ]
        }
    ]
};

export const MainPageElement = templateEngine(main_page);