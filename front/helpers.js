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

function findMaxScorePlayer(players) {
    const maxScorePlayer = players.reduce((maxPlayer, player) => {
        return player.score > maxPlayer.score ? player : maxPlayer;
    }, players[0]);

    const maxScorePlayers = players.filter(player => player.score === maxScorePlayer.score);

    if (maxScorePlayers.length > 1) {
        const language = localStorage.getItem('language') || 'en';
        const transObj = translations[language];
        return { name:transObj.draw, score: maxScorePlayers[0].score };
    }

    return maxScorePlayer;
}

export const findMostClicks = () => {
    const header  = document.getElementById('staticBackdropClickerLabel');
    if (GLOBAL.mode === 'single') { return; }

    const winner = findMaxScorePlayer(GLOBAL.clicker_players);
    postClickerTournament();
    document.getElementById('staticBackdropClickerBodyLabel').textContent = winner.score;
    header.textContent = `${winner.name} 🎉🎉🎉`;
}

export const winnerAndTurnButton = () => {
    if (GLOBAL.mode === 'single') { return; }
    const allClicks = GLOBAL.clicker_players.find((player) => player.score === -1);
    if (!allClicks) {
        findMostClicks();
        const button = document.getElementById('continue-tournament-clicker');
        button.classList.add('disabled');
    }
    else {
        const button = document.getElementById('continue-tournament-clicker');
        button.classList.remove('disabled');
    }
}

export const nextBattlePlayers = () => {
    if (!GLOBAL.pong_players || GLOBAL.pong_players.length < 3 || GLOBAL.mode !== 'tournament') {
        return [];
    } else if (GLOBAL.pong_players.length === 3) {
        return [GLOBAL.pong_players[2].name, 'X'];
    } else {
        return [GLOBAL.pong_players.at(2).name, GLOBAL.pong_players.at(3).name];
    }
}

export const showNextBattle = () => {
    if (!document.getElementById('next-game')) return;
    if (GLOBAL.mode !== 'tournament' || GLOBAL.pong_players.length <= 2) {
        document.getElementById('next-game').textContent = '';
    } else {
        const [player1, player2] = nextBattlePlayers();
        document.getElementById('next-game').textContent = `${player1} x ${player2}`;
    }
}

function postClickerTournament() {
    const res = GLOBAL.clicker_players.map((player) => {
        return {name: player.name, clicks: player.score};
    });

    const re = {
        players_info: res,
        time: GLOBAL.maxTime,
    };
    fetch('https://localhost:8081/api/clicker-matches/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(re),
    });
}

export const toggleTimeScore = (state) => {
    document.getElementById('score1').disabled = state;
    document.getElementById('score3').disabled = state;
    document.getElementById('score5').disabled = state;

    document.getElementById('time3').disabled = state;
    document.getElementById('time5').disabled = state;
    document.getElementById('time10').disabled = state;
}

export const cutNick = (nick) => {
    if (nick.length > 10) {
        return nick.slice(0, 10) + '...';
    }
    return nick;
}