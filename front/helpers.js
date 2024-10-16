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
    if (GLOBAL.mode === 'single') { return; }
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