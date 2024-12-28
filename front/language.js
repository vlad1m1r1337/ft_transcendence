import {showNames} from "./utils.js";

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
        score: 'Score',
        back: 'Back',
        continue_tournament: 'Continue Tournament',
        enter_players: 'Enter the players names through comma',
        submit: 'Submit',
        to_home: 'To Home',
        not_found: '404 - Not Found',
        time: 'Time - ',
        amount_cliks: "Cliks - ",
        max_score: 'Max score',
        max_time: 'Max time',
        computer_won: 'Computer won',
        player_won: 'Player won!',
        player_one_won: 'Player 1 won!',
        player_two_won: 'Player 2 won!',
        won: 'won',
        leaderboard: 'Leaderboard',
        no_information: 'No information',
        tournament_number: 'Tournament Number',
        winner: 'Winner',
        history: 'History',
        name: 'Name',
        clicks: 'Clicks',
        signin_signout: 'Sign in / Sign out',
        draw: 'Draw',
        no_tournament: 'Tournaments not found',
        control: 'Control',
        controls_blue: 'Player on the left controls the paddle with W and S buttons.',
        controls_red: 'Player on the right controls the paddle with up and down arrows.',
        player1: 'Player 1',
        player: 'Player',
        clicks: 'Clicks',
        time2: 'Time',
    },
    ru: {
        transendence: "трансуха",
        welcome: "Добро пожаловать",
        hello: "Привет",
        pingpong: "Пинг Понг",
        clicker: "Кликер",
        singleplayer: "Один игрок",
        multiplayer: "Мультиплеер",
        tournament: "Турнир",
        online: "Онлайн",
        on_one_keyboard: "На одной клавиатуре",
        settings: 'Настройки',
        music: 'Музло',
        score: 'Счет',
        back: 'Назад',
        continue_tournament: 'Продолжить турнир',
        enter_players: 'Введите имена игроков через запятую.',
        submit: 'Отправить',
        to_home: 'Домой',
        not_found: '404 - Не найдено',
        time: 'Время - ',
        amount_cliks: "Кликов - ",
        max_score: 'Максимальный счет',
        max_time: 'Максимальное время',
        computer_won: 'Компьютер выиграл',
        player_won: 'Игрок выиграл!',
        player_one_won: 'Игрок 1 выиграл!',
        player_two_won: 'Игрок 2 выиграл!',
        won: 'выиграл',
        leaderboard: 'Таблица лидеров',
        no_information: 'Нет информации',
        tournament_number: 'Номер турнира',
        winner: 'Победитель',
        history: 'История',
        name: 'Имя',
        clicks: 'Клики',
        signin_signout: 'Войти / Выйти',
        draw: 'Ничья',
        no_tournament: 'Турниры не найдены',
        control: 'Управление',
        controls_blue: 'Игрок слева управляет доской кнопками W и S.',
        controls_red: 'Игрок справа управляет доской стрелками вверх и вниз.',
        player1: 'Игрок 1',
        player: 'Игрок',
        time2: 'Время',
    },
};

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

window.setLanguage = setLanguage;
window.translations = translations;


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
    changeLanguage('en');

    showNames();
});

document.getElementById('flexRadioDefault2').addEventListener('change', function() {
    if (this.checked) {
        setLanguage('ru');
    }
    changeLanguage('ru');

    showNames();
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