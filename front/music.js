const musicSwitch = document.getElementById('flexSwitchCheckDefault');
const backgroundMusic = document.getElementById('background-music');

musicSwitch.addEventListener('change', function() {
  if (this.checked) {
	backgroundMusic.play();
  } else {
	backgroundMusic.pause();
  }
});