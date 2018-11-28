$('.lock-btn').on('click', toggleLock)

const getRandomColor = () => {
	const characters = '0123456789abcdef'
	let color = '#';
	for(let i = 0; i < 6; i++) {
		color += characters[Math.floor(Math.random() * 16)]
	}
	return color;
}


function toggleLock(e) {
	const lockButton = $(e.target);
	console.log(lockButton)
	lockButton.toggleClass('locked');
}