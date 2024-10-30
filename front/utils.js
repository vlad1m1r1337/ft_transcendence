function cutPath(path) {
	return (path.length > 1 && path[length - 1] === "/") ? path.substring(0, path.length) : path;
}

function showNames() {
	const names = document.getElementById('players-name');
	if (!names) { return; }
	const language = localStorage.getItem('language') || 'en';
	GLOBAL.mode === 'single' ?
		names.textContent = (language === 'en' ? `${showUser()} vs Computer` : `${showUser()} против Компа`) :
		names.textContent = (language === 'en' ? `${showUser()} vs Player 2` : `${showUser()} против Игрока 2`);
}

function showUser() {
	return localStorage.getItem('intraUser') ? localStorage.getItem('intraUser') : 'Player';
}


function parsePlayers(players) {
	const names =  players.split(',').map((player) => player.trim()).filter((player) => player !== '');
	const obj = names.map((player) => {
		return { name: player, score: -1 };
	})
	return obj;
}

function findKeyByValue(obj, value) {
	for (const key in obj) {
		if (obj[key] === value) {
			return key;
		}
	}
	return null;
}

const refreshMain = () => {
	const mainPage = document.getElementById('main-page');
	while (mainPage.firstChild) {
		mainPage.removeChild(mainPage.firstChild);
	}
};

const win = () => {
	document.getElementById('game-win').style.display = 'block';
	document.getElementById('game-lose').style.display = 'none';
	document.getElementById('tournament-win').style.display = 'none';
}

const lose = () => {
	document.getElementById('game-win').style.display = 'none';
	document.getElementById('game-lose').style.display = 'block';
	document.getElementById('tournament-win').style.display = 'none';
}

const champ = () => {
	document.getElementById('game-win').style.display = 'none';
	document.getElementById('game-lose').style.display = 'none';
	document.getElementById('tournament-win').style.display = 'block';
}

export { cutPath, showNames, parsePlayers, findKeyByValue, refreshMain, win, lose, champ };

