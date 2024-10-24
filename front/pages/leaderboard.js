import templateEngine from "../engine.js";

export const LeaderBoardElement = () => {
    const language = localStorage.getItem('language') || 'en';
    const transObj = translations[language];

    // let page = {
    //     tag: 'div',
    //     cls: ['d-flex',  'align-items-center', 'flex-column'],
    //     attrs: { style: 'margin-top: 50px; height: 100svh' },
    //     content: [
    //         {
    //             tag: 'h1',
    //             content: transObj.leaderboard,
    //             attrs: {
    //                 'data-translate': "leaderboard",
    //             }
    //         },
    //         {
    //             tag: 'p',
    //             content: transObj.no_information,
    //             attrs: {
    //                 'data-translate': "no_information",
    //             }
    //         },
    //     ]
    // };

    let page = {
        tag: 'div',
        cls: ['d-flex', 'align-items-center', 'flex-column'],
        attrs: {style: 'margin-top: 50px; height: calc(100svh - 56px); margin: 0 30px;'},
        content: [
            {
                tag: 'h1',
                content: transObj.leaderboard,
                attrs: {
                    'data-translate': "leaderboard",
                }
            },
            {
                tag: 'table',
                cls: ['table'],
                content: [
                    {
                        tag: 'thead',
                        content: [
                            {
                                tag: 'tr',
                                content: [
                                    {tag: 'th', attrs: {scope: 'col'}, content: 'Tournament Number'},
                                    {tag: 'th', attrs: {scope: 'col'}, content: 'Winner'},
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'tbody',
                        content: [
                            {
                                tag: 'tr',
                                content: [
                                    {tag: 'th', attrs: {scope: 'row'}, content: '1'},
                                    {tag: 'td', content: 'Mark'},
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {tag: 'th', attrs: {scope: 'row'}, content: '2'},
                                    {tag: 'td', content: 'Jacob'},
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {tag: 'th', attrs: {scope: 'row'}, content: '3'},
                                    {tag: 'td', content: 'Larry the Bird'},
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    page = templateEngine(page);
    const mainPageElement = document.getElementById('main-page');
    mainPageElement.appendChild(page);
}