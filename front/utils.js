function cutPath(path) {
	return (path.length > 1 && path[length - 1] === "/") ? path.substring(0, path.length) : path;
}

function showNames() {
	const names = document.getElementById('players-name');
	if (!names) { return; }
	const language = localStorage.getItem('language') || 'en';
	GLOBAL.mode === 'single' ?
		names.textContent = (language === 'en' ? 'Player vs Computer' : 'Игрок против Компа') :
		names.textContent = (language === 'en' ? 'Player 1 vs Player 2' : 'Игрок 1 против Игрока 2');
}


function parsePlayers(players) {
	const names =  players.split(',').map((player) => player.trim()).filter((player) => player !== '');
	const obj = names.map((player) => {
		return { name: player, score: -1 };
	})
	console.log(obj);
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

export { cutPath, showNames, parsePlayers, findKeyByValue, refreshMain };

