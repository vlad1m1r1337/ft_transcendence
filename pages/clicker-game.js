import templateEngine from "../engine.js";

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
				content: '0'
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
			onclick: 'increaseClicks()'
		  }
		},
	  }
	]
};

function countTime(time) {
	const time_el = document.getElementById('clicker-time');
	let counter_time = 0;
	const interval = setInterval(() => {
		time_el.textContent = Number(time_el.textContent) + 1;
		counter_time++;
			if (counter_time === time) {clearInterval(interval);}
	}, 1000)
}

function increaseClicks() {
	// debugger;
	const clicks = document.getElementById('clicker-clicks');
	console.log('lol', clicks.textContent)
	clicks.textContent = Number(clicks.textContent) + 1;
	if (clicks.textContent === '1') {countTime(10)};
}

window.increaseClicks = increaseClicks;

export const ClickerSingle = templateEngine(page);
