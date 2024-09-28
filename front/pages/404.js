import templateEngine from "../engine.js";

export const NotFound = () => {
    const language = localStorage.getItem('language');
    const transObj = translations[language];

    const page = {
        tag: 'div',
        attrs: {
            class: 'd-flex flex-column justify-content-center align-items-center',
        },
        content: [
            {
                tag: 'h1',
                attrs: {
                    style: 'margin-top: 200px;',
                    'data-translate': 'not_found',
                },
                content: transObj.not_found,
            },
        ],
    };

    const finPage = templateEngine(page);
    const mainPage = document.getElementById('main-page');
    mainPage.appendChild(finPage);
}