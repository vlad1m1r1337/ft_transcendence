import * as THREE from 'three';
import {PlayerOneKey, PlayerTwoKey} from "../constants.js";
import {win, lose, champ} from "../utils.js";
import showToast from "../toast.js";

class Game {
	constructor() {
		this.renderer = new THREE.WebGLRenderer();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, 650 / 480, 0.1, 1000);
		this.pointLight = new THREE.PointLight(0xF8D898);
		this.spotLight = new THREE.SpotLight(0xF8D898);
		this.fieldWidth = 650;
		this.fieldHeight = 480;
		this.paddleSpeed = 15;
		this.ballSpeed = 4;
		this.score1 = 0;
		this.score2 = 0;
		this.paddle1 = new Paddle(-this.fieldWidth / 2 + 10, 60, 10, 1, 0x1B32C0, this);
		this.paddle2 = new Paddle(this.fieldWidth / 2 - 10, 60, 10, 1, 0xFF4045, this);
		this.ball = new Ball(5, 6, 6, 0xD43001);
		this.keyHandler = new KeyHandler();
		this.setup();
		this.score1;
		this.score2;
	}

	setup() {
		this.createScene();
		this.draw();
	}

	createScene() {
		this.camera.position.z = 320;
		this.renderer.setSize(this.fieldWidth, this.fieldHeight);
		this.scene.add(this.camera);
		this.pointLight.position.set(-1000, 0, 1000);
		this.pointLight.intensity = 2.9;
		this.pointLight.distance = 10000;
		this.scene.add(this.pointLight);
		this.spotLight.position.set(0, 0, 460);
		this.spotLight.intensity = 1.5;
		this.spotLight.castShadow = true;
		this.scene.add(this.spotLight);
		this.renderer.shadowMap.enabled = true;
		this.scene.add(this.paddle1.mesh);
		this.scene.add(this.paddle2.mesh);
		this.scene.add(this.ball.mesh);
	}

	draw() {
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.draw.bind(this));
		if (!GLOBAL.isAnimate) return;
		if (GLOBAL.newGame === true) {
			this.resetBall();
			this.paddle1.resetPosition();
			this.paddle2.resetPosition();
			GLOBAL.newGame = false;
			this.score1 = 0;
			this.score2 = 0;
		}
		GLOBAL.mode === 'single' ? this.opponentPaddleMovement() : this.player2PaddleMovement();
		if (GLOBAL.mode === 'tournament') {
			const names = document.getElementById('players-name');
			names.textContent = `${GLOBAL.pong_players[0].name} x ${GLOBAL.pong_players[1].name}`;
		}
		this.ballPhysics();
		this.paddlePhysics();
		this.cameraPhysics();
		this.playerPaddleMovement();
	}

	resetBall(loser) {
		this.ball.resetPosition();
		this.ball.setDirection(loser === 1 ? 1 : -1, Math.random() * 2 - 1);
	}

	ballPhysics() {
		// если шар двигается слева (со стороны игрока)
		if (this.ball.mesh.position.x <= -this.fieldWidth / 2) {
			// компьютер получает очко
			this.score2++;
			this.addScore(2);
			// обновляем таблицу с результатами
			// устанавливаем новый шар в центр стола
			this.resetBall(0);
			// проверяем, закончился ли матч (набрано требуемое количество очков)
			this.matchScoreCheck();
		}

		// если шар двигается справа (со стороны компьютера)
		if (this.ball.mesh.position.x >= this.fieldWidth / 2) {
			// игрок получает очко
			this.score1++;
			this.addScore(1);
			// обновляем таблицу с результатами
			// устанавливаем новый шар в центр стола
			this.resetBall(1);
			// проверяем, закончился ли матч (набрано требуемое количество очков)
			this.matchScoreCheck();
		}

		// Если шар двигается сверху
		if (this.ball.mesh.position.y <= -this.fieldHeight / 2) {
			this.ball.direction.y = -this.ball.direction.y;
		}
		// Если шар двигается снизу
		if (this.ball.mesh.position.y >= this.fieldHeight / 2) {
			this.ball.direction.y = -this.ball.direction.y;
		}

		// обновляем положение шара во время игры
		this.ball.mesh.position.x += this.ball.direction.x * this.ballSpeed;
		this.ball.mesh.position.y += this.ball.direction.y * this.ballSpeed;

		// ограничиваем скорость шарика чтобы он не летал как сумасшедший
		if (this.ball.direction.y > this.ballSpeed * 0.8) {
			this.ball.direction.y = this.ballSpeed * 0.8;
		} else if (this.ball.direction.y < -this.ballSpeed * 0.8) {
			this.ball.direction.y = -this.ballSpeed * 0.8;
		}
	}

	paddlePhysics() {
		// ЛОГИКА ДОЩЕЧКИ ИГРОКА

		// если шар имеет одинаковые координаты с дощечкой № 1
		// на плоскости Х запоминаем позицию ЦЕНТРА объекта
		// мы делаем проверку только между передней и средней
		// частями дощечки (столкновение одностороннее)
		if (this.ball.mesh.position.x <= this.paddle1.mesh.position.x + this.paddle1.width
			&& this.ball.mesh.position.x >= this.paddle1.mesh.position.x) {
			if (this.ball.mesh.position.y <= -this.fieldHeight / 2) {
				this.ball.mesh.position.y += 50;
			} else if (this.ball.mesh.position.y >= this.fieldHeight / 2) {
				this.ball.mesh.position.y -= 50;
			}
			// если у шара одинаковые координаты с дощечкой № 1 на плоскости Y
			if (this.ball.mesh.position.y <= this.paddle1.mesh.position.y + this.paddle1.height / 2
				&& this.ball.mesh.position.y >= this.paddle1.mesh.position.y - this.paddle1.height / 2) {
				// если шар движется к игроку (отрицательное направление)
				if (this.ball.direction.x < 0) {
					// меняем направление движения чтобы создать эффект отскакивания шара
					this.ball.direction.x = -this.ball.direction.x;
					// Меняем угол шара при ударе. Немного усложним игру, позволив скользить шарику
					this.ball.direction.y -= this.paddle1.directionY * 0.7;
					// this.ball.direction.y += (Math.random() * 10);
				}
			}
		}

		// ЛОГИКА ДОЩЕЧКИ СОПЕРНИКА

		// если шар имеет одинаковые координаты с дощечкой № 2
		// на плоскости Х запоминаем позицию ЦЕНТРА объекта
		// мы делаем проверку только между передней и средней
		// частями дощечки (столкновение одностороннее)
		if (this.ball.mesh.position.x <= this.paddle2.mesh.position.x + this.paddle2.width
			&& this.ball.mesh.position.x >= this.paddle2.mesh.position.x) {
			if (this.ball.mesh.position.y <= -this.fieldHeight / 2) {
				this.ball.direction.x *= -1;
				this.ball.mesh.position.y += 50;
			} else if (this.ball.mesh.position.y >= this.fieldHeight / 2) {
				this.ball.direction.x *= -1;
				this.ball.mesh.position.y -= 50;
			}
			// и если шар направляется к игроку (отрицательное направление)
			if (this.ball.mesh.position.y <= this.paddle2.mesh.position.y + this.paddle2.height / 2
				&& this.ball.mesh.position.y >= this.paddle2.mesh.position.y - this.paddle2.height / 2) {
				// и если шар направляется к сопернику (положительное направление)
				if (this.ball.direction.x > 0) {
					// меняем направление движения чтобы создать эффект отскакивания шара
					this.ball.direction.x = -this.ball.direction.x;
					// Меняем угол шара при ударе. Немного усложним игру, позволив скользить шарику
					this.ball.direction.y -= this.paddle2.directionY * 0.7;
				}
			}
		}
	}

	cameraPhysics() {
		this.spotLight.position.x = this.ball.mesh.position.x * 2;
		this.spotLight.position.y = this.ball.mesh.position.y * 2;
		this.camera.position.set(0, 0, 600);
		this.camera.rotation.set(0, 0, 0);
	}

	opponentPaddleMovement() {
		const predictedY = this.predictBallPosition();
		let paddle2DirY = predictedY - this.paddle2.mesh.position.y;

		if (paddle2DirY > this.paddleSpeed * 0.5) {
			this.paddle2.mesh.position.y += this.paddleSpeed * 0.5;
		} else if (paddle2DirY < -this.paddleSpeed * 0.5) {
			this.paddle2.mesh.position.y -= this.paddleSpeed * 0.5;
		}

		this.paddle2.PaddleMapLimit();
	}

	player2PaddleMovement() {
		// движение влево
		if (this.keyHandler.isDown(PlayerTwoKey.DOWN)) {
			// двигаем дощечку пока она не коснется стенки
			if (this.paddle2.mesh.position.y < this.fieldHeight * 0.45) {
				this.paddle2.directionY = this.paddleSpeed * 0.5;
			} else {
				this.paddle2.directionY = 0;
			}
		}
		// движение вправо
		else if (this.keyHandler.isDown(PlayerTwoKey.UP)) {
			// двигаем дощечку пока она не коснется стенки
			if (this.paddle2.mesh.position.y > -this.fieldHeight * 0.45) {
				this.paddle2.directionY = -this.paddleSpeed * 0.5;
			} else {
				this.paddle2.directionY = 0;
			}
		} else {
			// прекращаем движение
			this.paddle2.directionY = 0;
		}

		this.paddle2.mesh.scale.y += (1 - this.paddle2.mesh.scale.y) * 0.2;
		this.paddle2.mesh.scale.z += (1 - this.paddle2.mesh.scale.z) * 0.2;
		this.paddle2.mesh.position.y += this.paddle2.directionY;
	}

	playerPaddleMovement() {
		// движение влево
		if (this.keyHandler.isDown(PlayerOneKey.W)) {
			if (this.paddle1.mesh.position.y < this.fieldHeight * 0.45) {
				this.paddle1.directionY = this.paddleSpeed * 0.5;
			} else {
				this.paddle1.directionY = 0;
			}
		}
		// движение вправо
		else if (this.keyHandler.isDown(PlayerOneKey.S)) {
			// двигаем дощечку пока она не коснется стенки
			if (this.paddle1.mesh.position.y > -this.fieldHeight * 0.45) {
				this.paddle1.directionY = -this.paddleSpeed * 0.5;
			} else {
				this.paddle1.directionY = 0;
			}
		} else {
			// прекращаем движение
			this.paddle1.directionY = 0;
		}

		this.paddle1.mesh.position.y += this.paddle1.directionY;
	}

	addScore(id) {
		const score = document.getElementById('score-' + id);
		score.textContent = Number(score.textContent) + 1;
	}

	matchScoreCheck()
	{
		// GLOBAL.maxScore = 1000;
		if (this.score1 >= GLOBAL.maxScore) {
			GLOBAL.isAnimate = false;

			if (GLOBAL.mode === 'tournament') {
				const winner = GLOBAL.pong_players.shift();
				GLOBAL.pong_players.push(winner);
				GLOBAL.pong_players = GLOBAL.pong_players.slice(1);
			}
			this.openModal();
		}
		else if (this.score2 >= GLOBAL.maxScore)
		{
			GLOBAL.isAnimate = false;

			if (GLOBAL.mode === 'tournament') {
				GLOBAL.pong_players = GLOBAL.pong_players.slice(1);
				const winner = GLOBAL.pong_players.shift();
				GLOBAL.pong_players.push(winner);
			}
			this.openModal();
		}
	}

	openModal() {
		let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
			keyboard: false
		});
		myModal.show();
		this.showWinner();
	}

	showWinner() {
		const header = document.getElementById('staticBackdropLabel');
		const language = localStorage.getItem('language') || 'en';
		this.resultImage();
		this.resultScore();
		this.resetScore();
		this.postChampion();
		switch (GLOBAL.mode) {
			case 'single':
				if (this.score1 > this.score2) {
					header.textContent = translations[language].player_won;
				}
				else {
					header.textContent = translations[language].computer_won;
				}
				break;
			case 'tournament':
				header.textContent = `${GLOBAL.pong_players.at(-1).name} ${translations[language].won}`;
				break;
			case 'multi':
				if (this.score1 > this.score2) {
					header.textContent = translations[language].player_one_won;
				}
				else {
					header.textContent = translations[language].player_two_won;
				}
				break;
		}
	}

	resultImage() {
		switch(GLOBAL.mode){
			case 'single':
				if (this.score1 > this.score2) {
					win();
				}
				else {
					lose();
				}
				break;
			case 'multi':
				win();
				break;
			case 'tournament':
				if(GLOBAL.pong_players.length === 1) {
					champ();
				}
				else {
					win();
				}
				break;
		}
	}

	predictBallPosition() {
		const ball = this.ball.mesh.position;
		const ballDirection = this.ball.direction;
		const timeToReachPaddle = (this.fieldWidth / 2 - ball.x) / ballDirection.x;
		const predictedY = ball.y + ballDirection.y * timeToReachPaddle;
		return predictedY;
	}

	resultScore() {
		const score1 = document.getElementById('modal-score-1');
		const score2 = document.getElementById('modal-score-2');

		score1.textContent = this.score1;
		score2.textContent = this.score2;
	}

	resetScore() {
		this.score1 = 0;
		this.score2 = 0;
		document.getElementById('score-1').textContent = 0;
		document.getElementById('score-2').textContent = 0;
	}

	async postChampion() {
		if (GLOBAL.mode !== 'tournament' && GLOBAL.pong_players.length > 1) {
			return;
		}
		const champion = GLOBAL.pong_players[0];
		const data = {
			name: champion.name,
		};

		try {
			await fetch('/api/v1/pong/champion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			});
		} catch (err) {
			showToast();
			console.log(err);
		}
	}
}

class Paddle {
	constructor(x, height, depth, quality, color, gameInstance) {
		this.width = 10;
		this.height = height;
		this.depth = depth;
		this.quality = quality;
		this.material = new THREE.MeshLambertMaterial({ color: color });
		this.mesh = new THREE.Mesh(
			new THREE.BoxGeometry(this.width, this.height, this.depth, this.quality, this.quality, this.quality),
			this.material
		);
		this.mesh.position.x = x;
		this.mesh.position.z = this.depth;
		this.mesh.receiveShadow = true;
		this.mesh.castShadow = true;
		this.directionY = 0;
		this.game = gameInstance;
	}

	resetPosition() {
		this.mesh.position.y = 0;
	}

	PaddleMapLimit() {
		if (this.mesh.position.y > this.game.fieldHeight * 0.45) {
			this.mesh.position.y = this.game.fieldHeight * 0.45;
		}
		if (this.mesh.position.y < -this.game.fieldHeight * 0.45) {
			this.mesh.position.y = -this.game.fieldHeight * 0.45;
		}
	}
}

class Ball {
	constructor(radius, segments, rings, color) {
		this.radius = radius;
		this.segments = segments;
		this.rings = rings;
		this.material = new THREE.MeshLambertMaterial({ color: color });
		this.mesh = new THREE.Mesh(
			new THREE.SphereGeometry(this.radius, this.segments, this.rings),
			this.material
		);
		this.mesh.position.set(0, 0, this.radius);
		this.mesh.receiveShadow = true;
		this.mesh.castShadow = true;
		this.direction = { x: 1, y: 1 };
	}

	resetPosition() {
		this.mesh.position.set(0, 0, this.radius);
	}

	setDirection(x, y) {
		this.direction.x = x;
		this.direction.y = y;
	}
}

class KeyHandler {
	constructor() {
		this._pressed = {};
		window.addEventListener('keyup', this.onKeyup.bind(this));
		window.addEventListener('keydown', this.onKeydown.bind(this));
	}

	isDown(keyCode) {
		return this._pressed[keyCode];
	}

	onKeydown(event) {
		this._pressed[event.keyCode] = true;
	}

	onKeyup(event) {
		delete this._pressed[event.keyCode];
	}
}

const gamePlay = new Game();
export { gamePlay };