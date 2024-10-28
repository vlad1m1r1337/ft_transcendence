import templateEngine from "../engine.js";
import showToast from "../toast.js";

const fetchLeaderBoard = async () => {
    try {
        const response = await fetch('../mock/leaderboard.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        showToast('Error fetching leaderboard');
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

export const LeaderBoardElement = async () => {
    const language = localStorage.getItem('language') || 'en';
    const transObj = translations[language];

    const leaders = await fetchLeaderBoard();
    let page = {
        tag: 'div',
        cls: ['d-flex', 'align-items-center', 'flex-column'],
        attrs: {style: 'margin-top: 50px; height: calc(100svh - 56px); margin: 10px 30px;'},
        content: [
            {
                tag: 'h1',
                content: transObj.leaderboard,
                attrs: {
                    'data-translate': "leaderboard",
                }
            },
            leaders.length > 0 ? {
                tag: 'table',
                cls: ['table'],
                content: [
                    {
                        tag: 'thead',
                        content: [
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'th', attrs: {
                                            scope: 'col', 'data-translate': 'tournament_number'
                                        },
                                        content: transObj.tournament_number
                                    },
                                    {
                                        tag: 'th', attrs: {
                                            scope: 'col', 'data-translate': 'winner'
                                        },
                                        content: transObj.winner
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'tbody',
                        content: leaders.map((item, index) => {
                            return {
                                tag: 'tr',
                                content: [
                                    {tag: 'td', content: index + 1},
                                    {tag: 'td', content: item}
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