$(window).on('load', generatePalette)
$('.lock-btn').on('click', toggleLock)
$('.new-palette-btn').on('click', generatePalette)
$('.save-project-btn').on('click', saveProject)
$('.save-palette-btn').on('click', savePalette)

function generatePalette(e) {
	e.preventDefault()
	for(let i = 1; i < 6; i++) {
		if(!$(`.color-${i}`).hasClass('color-locked')) {
			$(`.color-${i}`).css('background-color', getRandomColor());
		}
	}
}

function getRandomColor() {
	const characters = '0123456789abcdef';
	let color = '#';
	for(let i = 0; i < 6; i++) {
			color += characters[Math.floor(Math.random() * 16)];
	};
	return color;
};

function toggleLock(e) {
	const lockButton = $(e.target);
	const color = $(e.target.parentNode);
	console.log(lockButton);
	lockButton.toggleClass('locked');
	color.toggleClass('color-locked')
};

function saveProject() {
	const inputValue = $('.project-input').val();
	addProjectToDropdown(inputValue);
	console.log(`project ${inputValue} saved`)
}

function addProjectToDropdown(projectName) {
	$('.project-select').append(`<option value='${projectName}'>${projectName}</option>`)
}

function savePalette() {
	const inputValue = $('.palette-input').val()
	console.log(`palette ${inputValue} saved`)
}
