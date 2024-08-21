const translations = {
    en: {
        transendence: "ft_transendence",
        welcome: "Welcome",
        hello: "Hello",
        pingpong: "Ping Pong",
        clicker: "Clicker",
        singleplayer: "Singleplayer",
        multiplayer: "Multiplayer",
        tournament: "Tournament",
        online: "Online",
        on_one_keyboard: "On one keyboard",
        settings: 'Settings',
        music: 'Music',
    },
    ru: {
        transendence: "трансуха",
        welcome: "Добро пожаловать",
        hello: "Привет",
        pingpong: "Пинг Понг",
        clicker: "Кликер",
        singleplayer: "Один игрок",
        multiplayer: "Два игрока",
        tournament: "Турнир",
        online: "Онлайн",
        on_one_keyboard: "На одной клавиатуре",
        settings: 'Настройки',
        music: 'Музло',
    },
};

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updateText();
}

function updateText() {
    const lang = localStorage.getItem('language') || 'en';
    console.log(lang);
}

window.setLanguage = setLanguage;
window.translations = translations;

document.addEventListener('DOMContentLoaded', updateText);


function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });
}
document.getElementById('flexRadioDefault1').addEventListener('change', function() {
    if (this.checked) {
        setLanguage('en');
    }
    changeLanguage('en')
});

document.getElementById('flexRadioDefault2').addEventListener('change', function() {
    if (this.checked) {
        setLanguage('ru');
    }
    changeLanguage('ru')
});

document.addEventListener('DOMContentLoaded', function() {
    const lang = localStorage.getItem('language') || 'en';
    changeLanguage(lang);

    if (lang === 'en') {
        document.getElementById('flexRadioDefault1').checked = true;
    } else {
        document.getElementById('flexRadioDefault2').checked = true;
    }
});