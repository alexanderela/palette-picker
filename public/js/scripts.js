$(window).on('load', generatePalette)
$('.lock-btn').on('click', toggleLock)
$('.new-palette-btn').on('click', generatePalette)

function generatePalette() {
	$('.color-1').css('background-color', getRandomColor());
	$('.color-2').css('background-color', getRandomColor());
	$('.color-3').css('background-color', getRandomColor());
	$('.color-4').css('background-color', getRandomColor());
	$('.color-5').css('background-color', getRandomColor());
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
	console.log(lockButton);
	lockButton.toggleClass('locked');
};