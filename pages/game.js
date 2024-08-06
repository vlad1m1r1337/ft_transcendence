import templateEngine from '../engine.js';

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
                            attrs: { id: 'staticBackdropLabel' },
                            content: 'Modal title'
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
                                cls: ['btn', 'btn-primary'],
                                attrs: { type: 'button' },
                                content: 'Understood'
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

