import templateEngine from "../engine.js";

export const MainPageElement = () => {
    const language = localStorage.getItem('language');
    const transObj = translations[language];

    let page = {
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
                    { tag: "a", content: transObj?.pingpong, attrs: { 'data-translate': "pingpong", href: '/ping-pong', onclick: 'route(event)', style: 'text-decoration: none' } }
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
                    { tag: "a", content: transObj?.clicker, attrs: { 'data-translate': "clicker", href: '/clicker', onclick: 'route(event)', style: 'text-decoration: none' } }

                ]
            }
        ]
    };
    const mainPageElement = document.getElementById('main-page');
    page = templateEngine(page);
    mainPageElement.appendChild(page);
};