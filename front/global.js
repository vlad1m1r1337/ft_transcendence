const GLOBAL = new Proxy({
	maxScore: 1,
	maxTime: 3, // Initial property for the maximum time
	newGame: true, // Initial property indicating a new game
	mode: '', // Initial property for the game mode
	isAnimate: false, // Initial property indicating animation state
}, {
	set(target, property, value) {
		target[property] = value; // Set the property on the target object
		document.dispatchEvent(new Event('GLOBAL_UPDATED')); // Dispatch a custom event when a property is set
		return true; // Indicate that the property was set successfully
	}
});

window.GLOBAL = GLOBAL;