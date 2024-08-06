function cutPath(path) {
	return (path.length > 1 && path[length - 1] === "/") ? path.substring(0, path.length) : path;
}

function showNames() {
	const names = document.getElementById('players-name');

	GLOBAL.mode === 'single' ? names.textContent = 'Player vs Computer' : names.textContent = 'Player vs Player'; 
}


function parsePlayers(players) {
	return players.split(' ');
}

export { cutPath, showNames, parsePlayers };