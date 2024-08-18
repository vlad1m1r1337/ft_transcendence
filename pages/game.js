import templateEngine from '../engine.js';
const updateNextGameClass = () => {
    const nextGameButton = document.querySelector('.btn-tournament');
    if (nextGameButton) {
        nextGameButton.classList.toggle('disabled', !(GLOBAL.mode === 'tournament' && GLOBAL?.pong_players?.length > 1));
    }
};

const game_page = {
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
                'Score ',
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
            attrs: {id: 'game', style: 'padding: 10px; background-color: red; border-radius: 10px' }
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
                            tag: 'h1',
                            cls: ['modal-title', 'fs-5'],
                            attrs: { id: 'staticBackdropLabel', style: 'margin: auto;' },
                            content: 'Modal title',
                        }
                    },
                    {
                        tag: 'div',
                        cls: 'modal-body',
                        content: '...'
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
                                    href: '/',
                                    onclick: 'route(event)'
                                },
                                content: 'Back'
                            },
                            {
                                tag: 'button',
                                cls: ['btn', 'btn-primary', 'btn-tournament'],
                                attrs: {
                                    id: 'continue-tournament-pong',
                                    type: 'button',
                                    'data-bs-dismiss': 'modal',
                                },
                                content: 'Continue Tournament'
                            }
                        ]
                    }
                ]
            }
        }
        }
    ]
};

export const GamePageElement = templateEngine(game_page);

// Add an event listener to update the nextGame class when GLOBAL changes
window.addEventListener('load', () => {
    updateNextGameClass();
    // Assuming GLOBAL is updated through some mechanism, you can add a custom event listener
    document.addEventListener('GLOBAL_UPDATED', updateNextGameClass);
});


window.addEventListener('click', (e) => {
    const nextGameButton = document.getElementById('continue-tournament-pong');
    if (e.target === nextGameButton) {
        GLOBAL.isAnimate = true;
    }
});