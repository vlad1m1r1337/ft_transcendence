import templateEngine from "../engine.js";

const updateNextGameClass = () => {
	const nextGameButton = document.getElementById('continue-tournament-clicker');
	if (nextGameButton) {
		nextGameButton.classList.toggle('disabled', GLOBAL.clicker_players.length > 1);//&& GLOBAL?.pong_players?.length > 1)
	}
};
window.addEventListener('load', () => {
	updateNextGameClass();
	// Assuming GLOBAL is updated through some mechanism, you can add a custom event listener
	document.addEventListener('GLOBAL_UPDATED', updateNextGameClass);
});

const page = {
	tag: 'div',
	attrs: {
	  style: 'margin-top: 200px;',
	  class: 'd-flex flex-column justify-content-center align-items-center'
	},
	content: [
		{
			tag: 'h1',
			attrs: {
				style: 'margin-bottom: 20px; margin-top: 20px;'
			},
			content: [
				'Time - ',
				{
				tag: 'span',
				attrs: {
					id: 'clicker-time'
				},
				content: '3'
				}
			]
		},
		{
			tag: 'h1',
			attrs: {
				style: 'margin-bottom: 20px;'
			},
			content: [
			'Clicks - ',
			{
				tag: 'span',
				attrs: {
				id: 'clicker-clicks'
				},
				content: '0'
			}
			]
		},
		{
			tag: 'div',
			attrs: {
			style: 'user-select: none;'
			},
			content: {
			tag: 'div',
			cls: ['click_icon'],
			attrs: {
				onclick: 'decreaseClicks()'
			}
			},
		},
		{
			tag: 'div',
			cls: ['modal', 'fade'],
			attrs: {
				id: 'staticClickerBackdrop',
				'data-bs-backdrop': 'static',
				'data-bs-keyboard': 'false',
				tabindex: '-1',
				'aria-labelledby': 'staticBackdropLabel',
				'aria-hidden': 'true'
			},
			content: {
				tag: 'div',
				cls: ['modal-dialog', 'modal-dialog-centered'],
				content: {
					tag: 'div',
					cls: 'modal-content',
					content: [
						{
							tag: 'div',
							cls: 'modal-header',
							content: {
								tag: 'h1',
								cls: ['modal-title', 'fs-5'],
								attrs: { id: 'staticBackdropClickerLabel' },
								content: 'Modal title'
							}
						},
						{
							tag: 'div',
							cls: 'modal-body',
							attrs: {id: 'staticBackdropClickerBodyLabel'},
							content: '...'
						},
						{
							tag: 'div',
							cls: 'modal-footer',
							content: [
								{
									tag: 'a',
									cls: ['btn', 'btn-secondary'],
									attrs: {
										type: 'button',
										'data-bs-dismiss': 'modal',
										href: '/',
										onclick: 'route(event)'
									},
									content: 'Back'
								},
								{
									tag: 'button',
									cls: ['btn', 'btn-primary'],
									attrs: {
										id: 'continue-tournament-clicker',
										type: 'button',
										'data-bs-dismiss': 'modal',
									},
									content: 'Continue Tournament'
								}
							]
						}
					]
				}
			}
			}
	]
};

export default function resetClicker() {
	const clicks = document.getElementById('clicker-clicks');
	const time =  document.getElementById('clicker-time');
	clicks.textContent = 0;
	time.textContent = 3;
}

function openModal() {
	const getClicks = document.getElementById('clicker-clicks');
	console.log(getClicks.textContent);
	const clickerBody = document.getElementById('staticBackdropClickerBodyLabel');
	clickerBody.textContent =  getClicks.textContent;
	var myModal = new bootstrap.Modal(document.getElementById('staticClickerBackdrop'), {
		keyboard: false
	});
	myModal.show();
}

function countTime(time) {
	const time_el = document.getElementById('clicker-time');
	let counter_time = time;
	const interval = setInterval(() => {
		time_el.textContent = Number(time_el.textContent) - 1;
		counter_time--;
			if (counter_time === 0) {
				clearInterval(interval);
				openModal();
			}
	}, 1000)
}

function decreaseClicks() {
	const clicks = document.getElementById('clicker-clicks');
	clicks.textContent = Number(clicks.textContent) + 1;
	if (clicks.textContent === '1') {countTime(3)};
}

window.addEventListener('click', (e) => {
	const nextGameButton = document.getElementById('continue-tournament-clicker');
	if (e.target === nextGameButton) {
		const mainPage = document.getElementById('main-page');
		mainPage.appendChild(ClickerSingle);
		resetClicker();
	}
});

window.decreaseClicks = decreaseClicks;

export const ClickerSingle = templateEngine(page);
