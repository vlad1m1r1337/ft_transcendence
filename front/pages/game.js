import templateEngine from '../engine.js';
import {gamePlay} from "../game/game_play.js";
import {showNames} from "../utils.js";

const updateNextGameClass = () => {
    const nextGameButton = document.querySelector('.btn-tournament');
    if (nextGameButton) {
        nextGameButton.classList.toggle('disabled', !(GLOBAL.mode === 'tournament' && GLOBAL?.pong_players?.length > 1));
    }
};

window.addEventListener('load', () => {
    updateNextGameClass();
    document.addEventListener('GLOBAL_UPDATED', updateNextGameClass);
});


window.addEventListener('click', (e) => {
    const nextGameButton = document.getElementById('continue-tournament-pong');
    if (e.target === nextGameButton) {
        GLOBAL.isAnimate = true;
    }
});

export const GamePageElement = () => {
    const language = localStorage.getItem('language') || 'en';
    const transObj = translations[language];

    let page = {
        tag: 'div',
        cls: ['d-flex', 'justify-content-center', 'align-items-center', 'flex-column'],
        attrs: { style: 'margin-top: 50px;' },
        content: [
            {
                tag: 'h1',
                content: 'Content',
                attrs: {
                    id: 'players-name',
                }
            },
            {
                tag: 'h2',
                content: [
                    {
                        tag: 'span',
                        cls: ['text-primary'],
                        content: '0',
                        attrs: {
                            id: 'score-1'
                        }
                    },
                    ' : ',
                    {
                        tag: 'span',
                        cls: ['text-danger'],
                        content: '0',
                        attrs: {
                            id: 'score-2'
                        }
                    }
                ]
            },
            {
                tag: 'div',
                attrs: {id: 'game', style: 'margin: 30px; border: 10px solid red; border-radius: 10px;' }
            },
            {
                tag: 'div',
                cls: ['modal', 'fade'],
                attrs: {
                    id: 'staticBackdrop',
                    'data-bs-backdrop': 'static',
                    'data-bs-keyboard': 'false',
                    tabindex: '-1',
                    'aria-labelledby': 'staticBackdropLabel',
                    'aria-hidden': 'true'
                },
                content: {
                    tag: 'div',
                    cls: ['modal-dialog', 'modal-dialog-centered'],
                    content: {
                        tag: 'div',
                        cls: 'modal-content',
                        content: [
                            {
                                tag: 'div',
                                cls: 'modal-header',
                                content: {
                                    tag: 'div',
                                    cls: 'd-flex',
                                    attrs: {style: 'margin: auto;'},
                                    content: [
                                        {
                                            tag: 'h1',
                                            cls: ['modal-title', 'fs-5'],
                                            attrs: {id: 'staticBackdropLabel'},
                                            content: '',
                                        },
                                        {
                                            tag: 'p',
                                            cls: ['modal-title', 'fs-5'],
                                            attrs: {style: 'font-weight: bold; margin-left: 10px;'},
                                            content: [
                                                {
                                                    tag: 'span',
                                                    content: '',
                                                    cls: 'text-primary',
                                                    attrs: {id: 'modal-score-1'}
                                                },
                                                ' : ',
                                                {
                                                    tag: 'span',
                                                    content: '',
                                                    cls: 'text-danger',
                                                    attrs: {id: 'modal-score-2'}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                tag: 'div',
                                cls: ['modal-body', 'd-flex', 'justify-content-center'],
                                content:[
                                    {
                                        tag: 'img',
                                        attrs: {
                                            src: '/assets/happy_billy.webp',
                                            id: 'game-win',
                                            alt: 'billy',
                                            style: 'object-fit: cover; width: 250px; height: 250px; display: none;'
                                        },

                                    },
                                    {
                                        tag: 'img',
                                        attrs: {
                                            src: '/assets/sad_billy.webp',
                                            id: 'game-lose',
                                            alt: 'billy',
                                            style: 'object-fit: cover; width: 250px; height: 250px; display: none;'
                                        },

                                    },
                                    {
                                        tag: 'img',
                                        attrs: {
                                            src: '/assets/legend_billy.webp',
                                            id: 'tournament-win',
                                            alt: 'billy',
                                            style: 'object-fit: cover; width: 250px; height: 250px; display: none;'
                                        },

                                    },
                                ]
                            },
                            {
                                tag: 'div',
                                cls: 'modal-footer',
                                content: [
                                    {
                                        tag: 'a',
                                        cls: ['btn', 'btn-secondary'],
                                        attrs: {
                                            type: 'button',
                                            'data-bs-dismiss': 'modal',
                                            href: '/ping-pong',
                                            onclick: 'route(event)',
                                            'data-translate': 'back',
                                        },
                                        content: transObj.back
                                    },
                                    {
                                        tag: 'button',
                                        cls: ['btn', 'btn-primary', 'btn-tournament'],
                                        attrs: {
                                            id: 'continue-tournament-pong',
                                            type: 'button',
                                            'data-bs-dismiss': 'modal',
                                            'data-translate': 'continue_tournament',
                                        },
                                        content: transObj.continue_tournament
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ]
    };

    page = templateEngine(page);
    const mainPageElement = document.getElementById('main-page');
    mainPageElement.appendChild(page);
}

export const appendGameSingle = () => {
    const game =  document.getElementById('game');
    game.appendChild(gamePlay.renderer.domElement);
    GLOBAL.isAnimate = true;
    GLOBAL.mode = 'single';
    showNames();
}

export const appendGameMulti = () => {
    const game =  document.getElementById('game');
    game.appendChild(gamePlay.renderer.domElement);
    GLOBAL.isAnimate = true;
    GLOBAL.mode = 'multi';
    showNames();
}