import templateEngine from '../engine.js'


const first_page = {
    tag: 'div',
    cls: 'page-container',
    content: [
        {
            tag: 'h1',
            attrs: {
                style: 'align-self: center'
            },
            content: 'Home'
        },
        {
            tag: 'p',
            content: 'This is a simple demo for a single-page application built in vanilla JS. Using a JS framework to build a small application is a little-bit overkill sometimes, but you may still want the benefits of having a single-page app. This is a good solution to that problem.'
        },
        {
            tag: 'p',
            content: 'Check out the source code to see how things work. If you want to try it out for yourself, fork this sandbox and play around with it!'
        }
    ]
};

export const FirstPageElement = templateEngine(first_page);