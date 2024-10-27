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
                                    {tag: 'th', attrs: {scope: 'col'}, content: '#'},
                                    {tag: 'th', attrs: {scope: 'col'}, content: 'Name'},
                                    {tag: 'th', attrs: {scope: 'col'}, content: 'Clicks'},
                                    {tag: 'th', attrs: {scope: 'col'}, content: 'Time'}
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
                                    {tag: 'th', attrs: {rowspan: 3}, content: '1'},
                                    {tag: 'td', content: 'Mark'},
                                    {tag: 'td', content: 'Otto'},
                                    {tag: 'td', attrs: {rowspan: 3}, content: '10'}
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {tag: 'td', content: 'Jacob'},
                                    {tag: 'td', content: 'Thornton'},
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {tag: 'td', content: 'Larry'},
                                    {tag: 'td', content: 'Bird'},
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