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