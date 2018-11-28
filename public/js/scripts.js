const getRandomColor = () => {
	const characters = '0123456789abcdef'
	let color = '#';
	for(let i = 0; i < 6; i++) {
		color += characters[Math.floor(Math.random() * 16)]
	}
	return color;
}

const lockColor = (e) => {
	const selectedColor = e.target;
}