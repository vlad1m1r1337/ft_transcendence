import templateEngine from "../engine.js";
import showToast from "../toast.js";

const fetchHistroy = async () => {
    try {
        const response = await fetch('../mock/history.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        showToast();
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

export const HistoryElement = async () => {
    const language = localStorage.getItem('language') || 'en';
    const transObj = translations[language];

    const history = await fetchHistroy();
    console.log(history)
    let page = {
        tag: 'div',
        cls: ['d-flex', 'align-items-center', 'flex-column'],
        attrs: {style: 'margin-top: 50px; height: calc(100svh - 56px); margin: 10px 30px;'},
        content: [
            {
                tag: 'h1',
                content: transObj.history,
                attrs: {
                    'data-translate': "history",
                }
            },
            history.length > 0 ? {
                    tag: 'table',
                    cls: ['table'],
                    content: [
                        {
                            tag: 'thead',
                            content: [
                                {
                                    tag: 'tr',
                                    content: [
                                        // {
                                        //     tag: 'th', attrs: {
                                        //         scope: 'col', 'data-translate': 'tournament_number'
                                        //     },
                                        //     content: transObj.tournament_number
                                        // },
                                        {
                                            tag: 'th', attrs: {
                                                scope: 'col', 'data-translate': 'name'
                                            },
                                            content: transObj.name
                                        },
                                        {
                                            tag: 'th', attrs: {
                                                scope: 'col', 'data-translate': 'clicks'
                                            },
                                            content: transObj.clicks
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            tag: 'tbody',
                            content: history[0].players_info.map((item, index) => {
                                return {
                                    tag: 'tr',
                                    content: [
                                        {tag: 'td', content: item.name},
                                        {tag: 'td', content: item.clicks},
                                    ]
                                }
                            })
                        }
                    ]
                } :
                {
                    tag: 'p',
                    content: transObj.no_information,
                    attrs: {
                        'data-translate': "no_information",
                    }
                }
        ]
    };

    page = templateEngine(page);
    const mainPageElement = document.getElementById('main-page');
    mainPageElement.appendChild(page);
}