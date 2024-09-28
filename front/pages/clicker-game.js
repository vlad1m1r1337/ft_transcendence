import templateEngine from "../engine.js";
import {refreshMain} from "../utils.js";
import {saveClick, winnerAndTurnButton} from "../helpers.js";

const updateNextGameClass = () => {
	const nextGameButton = document.getElementById('continue-tournament-clicker');
	if (nextGameButton) {
		if (GLOBAL.mode === 'tournament') {
			nextGameButton.classList.remove('disabled');
		}
		else {
			nextGameButton.classList.add('disabled');
		}
	}
};
window.addEventListener('load', () => {
	updateNextGameClass();
	// Assuming GLOBAL is updated through some mechanism, you can add a custom event listener
	document.addEventListener('GLOBAL_UPDATED', updateNextGameClass);
});

export default function resetClicker() {
	const clicks = document.getElementById('clicker-clicks');
	const time =  document.getElementById('clicker-time');
	clicks.textContent = 0;
	time.textContent = GLOBAL.maxTime;
}

function openModal() {
	const getClicks = document.getElementById('clicker-clicks');
	const clickerBody = document.getElementById('staticBackdropClickerBodyLabel');
	clickerBody.textContent =  getClicks.textContent;
	winnerAndTurnButton();
	let myModal = new bootstrap.Modal(document.getElementById('staticClickerBackdrop'), {
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
				saveClick();
				openModal();
			}
	}, 1000)
}

function decreaseClicks() {
	const clicks = document.getElementById('clicker-clicks');
	clicks.textContent = Number(clicks.textContent) + 1;
	if (clicks.textContent === '1') {countTime(GLOBAL.maxTime)}
}

window.addEventListener('click', (e) => {
	const nextGameButton = document.getElementById('continue-tournament-clicker');
	if (e.target === nextGameButton) {
		refreshMain();
		ClickerSingle();
		resetClicker();
	}
});

window.decreaseClicks = decreaseClicks;

export const ClickerSingle = () => {
	const language = localStorage.getItem('language');
	const transObj = translations[language];

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
					{ tag: 'span', attrs: {'data-translate': 'time'}, content: transObj.time },
					{
						tag: 'span',
						attrs: {
							id: 'clicker-time'
						},
						content: GLOBAL.maxTime
					}
				]
			},
			{
				tag: 'h1',
				attrs: {
					style: 'margin-bottom: 20px;'
				},
				content: [
					{ tag: 'span', attrs: {'data-translate': 'amount_cliks'}, content: transObj.amount_cliks },
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
									attrs: { id: 'staticBackdropClickerLabel', style: 'margin-left: auto; margin-right: auto;' },
									content: ':)'
								}
							},
							{
								tag: 'div',
								cls: 'modal-body',
								attrs: {id: 'staticBackdropClickerBodyLabel', style: 'margin-left: auto; margin-right: auto;'},
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
											onclick: 'route(event)',
											'data-translate': 'back',
										},
										content: transObj.back
									},
									{
										tag: 'button',
										cls: ['btn', 'btn-primary'],
										attrs: {
											id: 'continue-tournament-clicker',
											type: 'button',
											'data-bs-dismiss': 'modal',
											'data-translate': 'continue_tournament',
										},
										content: transObj.continue_tournament
									}
								]
							}
						]
					}
				}
			}
		]
	};
	const finPage =  templateEngine(page);
	const mainPage = document.getElementById('main-page');
	mainPage.appendChild(finPage);
}
