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

export const saveClick = () => {
    if (GLOBAL.mode === 'single') { return; }
    const clicks = document.getElementById('clicker-clicks');
    GLOBAL.clicker_players.some((player) => {
        if (Number(player.score) === -1) {
            player.score = Number(clicks.textContent);
            return true;
        }
        return false;
    });
}

export const findMostClicks = () => {
    const header  = document.getElementById('staticBackdropClickerLabel');
    if (GLOBAL.mode === 'single') { return; }

    let max = -1;
    let winner = null;
    GLOBAL.clicker_players.forEach((player) => {
        if (player.score > max) {
            max = player.score;
            winner = player;
        }
    });
    document.getElementById('staticBackdropClickerBodyLabel').textContent = winner.score;
    header.textContent = `${winner.name} 🎉🎉🎉`;
}

export const winnerAndTurnButton = () => {
    const allClicks = GLOBAL.clicker_players.find((player) => player.score === -1);
    console.log(allClicks);
    if (!allClicks) {
        findMostClicks();
        const lol = document.getElementById('continue-tournament-clicker');
        lol.classList.add('disabled');
    }
    else {
        const lol = document.getElementById('continue-tournament-clicker');
        lol.classList.remove('disabled');
    }
}