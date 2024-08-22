export const singlePlayerWon = (language, header) => {
    if (language === 'en') {
        header.textContent = 'You won!';
        return;
    }
    header.textContent ='Вы выиграли!';
}

export const singlePlayerLost = (language, header) => {
    if (language === 'en') {
        header.textContent = 'Computer won!';
        return;
    }
    header.textContent = 'Компьютер выиграл!';
}

export const player1Won = (language, header) => {
    if (language === 'en') {
        header.textContent = 'Player 1 won!';
        return;
    }
    header.textContent = 'Игрок 1 выиграл!';
}

export const player2Won = (language, header) => {
    if (language === 'en') {
        header.textContent = 'Player 2 won!';
        return;
    }
    header.textContent = 'Игрок 2 выиграл!';
}
