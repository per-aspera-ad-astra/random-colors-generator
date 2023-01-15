'use strict';

const cols = document.querySelectorAll('.col');

setRandomColors(true);

document.addEventListener('keydown', (e) => {
	e.preventDefault();
	if (e.code === 'Space') {
		setRandomColors();
	}
});

document.addEventListener('click', (e) => {
	const type = e.target.dataset.type;
	
	if (type === 'lock') {
		const node =
			e.target.tagName.toLowerCase() === 'i'
				? e.target
				: e.target.children[0];
		
		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
	} else if (type === 'copy') {
		copyToClipboard(e.target.textContent);
	} else if (type === 'refresh') {
		setRandomColors();
	}
});

function generateRandomColor() {
	const hexCodes = '0123456789ABCDEF';
	let color = '';

	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
	}

	return `#${color}`;
}

function copyToClipboard(text) {
	return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
	const colors = isInitial ? getColorsfromHash(): [];

	cols.forEach((col, index) => {
		const title = col.querySelector('.col-title');
		const button = col.querySelector('.btn');

		const isLocked = col.querySelector('i').classList.contains('fa-lock');

		if (isLocked) {
			colors.push(title.textContent);
			return;
		}

		const color = isInitial
    		? colors[index]
        		? colors[index]
        		: generateRandomColor()
      		: generateRandomColor();

		if (!isInitial) {
			colors.push(color);
		}

		col.style.background = color;
		title.textContent = color;

		seTextColor(title, color);
		seTextColor(button, color);
	});

	updateColorsHash(colors);
}

function seTextColor(text, color) {
	const luminance = chroma(color).luminance();
	text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
	document.location.hash = colors.toString();
}

function getColorsfromHash() {
	if (document.location.hash.length) {
		return document.location.hash.split(',');
	}

	return [];
}
