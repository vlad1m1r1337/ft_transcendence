import templateEngine from '../engine.js'

const second_page = {
    tag: 'div',
    attrs: {
        id: 'main'
    },
    content: [
        {
            tag: 'h1',
            content: 'Main Text'
        },
        {
            tag: 'p',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quidem eos tempore, veniam dolorem cumque, ea nostrum dolor sunt inventore molestias suscipit vel itaque ullam consequatur, totam in non atque? Quia, dolorem at? Voluptates adipisci vero veritatis maxime nisi, eos, provident corrupti, aut nihil repellendus minima sit eligendi magni. Porro cupiditate accusantium debitis tenetur velit, eligendi quam quas saepe ipsum earum impedit deserunt iure iusto, voluptates quidem laudantium at sequi! Dignissimos repellat incidunt, corrupti, eum assumenda deserunt vel, illum quis commodi similique laborum! Cum in omnis et reprehenderit quisquam! Est quia libero nihil dolore iusto. Assumenda consequatur eos enim veritatis!'
        },
        {
            tag: 'p',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quidem eos tempore, veniam dolorem cumque, ea nostrum dolor sunt inventore molestias suscipit vel itaque ullam consequatur, totam in non atque? Quia, dolorem at? Voluptates adipisci vero veritatis maxime nisi, eos, provident corrupti, aut nihil repellendus minima sit eligendi magni. Porro cupiditate accusantium debitis tenetur velit, eligendi quam quas saepe ipsum earum impedit deserunt iure iusto, voluptates quidem laudantium at sequi! Dignissimos repellat incidunt, corrupti, eum assumenda deserunt vel, illum quis commodi similique laborum! Cum in omnis et reprehenderit quisquam! Est quia libero nihil dolore iusto. Assumenda consequatur eos enim veritatis!'
        },
        {
            tag: 'p',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quidem eos tempore, veniam dolorem cumque, ea nostrum dolor sunt inventore molestias suscipit vel itaque ullam consequatur, totam in non atque? Quia, dolorem at? Voluptates adipisci vero veritatis maxime nisi, eos, provident corrupti, aut nihil repellendus minima sit eligendi magni. Porro cupiditate accusantium debitis tenetur velit, eligendi quam quas saepe ipsum earum impedit deserunt iure iusto, voluptates quidem laudantium at sequi! Dignissimos repellat incidunt, corrupti, eum assumenda deserunt vel, illum quis commodi similique laborum! Cum in omnis et reprehenderit quisquam! Est quia libero nihil dolore iusto. Assumenda consequatur eos enim veritatis!'
        },
        {
            tag: 'p',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quidem eos tempore, veniam dolorem cumque, ea nostrum dolor sunt inventore molestias suscipit vel itaque ullam consequatur, totam in non atque? Quia, dolorem at? Voluptates adipisci vero veritatis maxime nisi, eos, provident corrupti, aut nihil repellendus minima sit eligendi magni. Porro cupiditate accusantium debitis tenetur velit, eligendi quam quas saepe ipsum earum impedit deserunt iure iusto, voluptates quidem laudantium at sequi! Dignissimos repellat incidunt, corrupti, eum assumenda deserunt vel, illum quis commodi similique laborum! Cum in omnis et reprehenderit quisquam! Est quia libero nihil dolore iusto. Assumenda consequatur eos enim veritatis!'
        }
    ]
};

export const SecondPageElement = templateEngine(second_page);
