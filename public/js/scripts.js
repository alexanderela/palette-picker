$(window).on('load', generatePalette)
$('.lock-btn').on('click', toggleLock)
$('.new-palette-btn').on('click', generatePalette)
$('.save-project-btn').on('click', saveProject)
$('.save-palette-btn').on('click', savePalette)

function generatePalette(e) {
	e.preventDefault()
	for(let i = 1; i < 6; i++) {
		if(!$(`.color-${i}`).hasClass('color-locked')) {
			$(`.color-${i}`).css('background-color', getRandomColor(`${i}`));
		}
	}
}

function getRandomColor(num) {
	const characters = '0123456789abcdef';
	let color = '#';
	for(let i = 0; i < 6; i++) {
			color += characters[Math.floor(Math.random() * 16)];
	};
	$(`.color-${num}-text`).text(color);

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
	storeProject(inputValue)
	console.log(`project ${inputValue} saved`)
}

function addProjectToDropdown(projectName) {
	$('.project-select').append(`<option value='${projectName}'>${projectName}</option>`)
}

function storeProject(projectName) {
	fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ projectName }),
    headers:{
      'Content-Type': 'application/json'
    }
	})
		.then(function(response) {
			console.log(response)
		})
		.catch(function(error) {
			console.log(error)
		})
}

function savePalette() {
	const inputValue = $('.palette-input').val()
	const currentPalette = $('.all-colors')


	storePalette(inputValue)
}



function storePalette(paletteName) {
	fetch('http://localhost:3000/api/v1/palettes', {
		method: 'POST',
		body: JSON.stringify({ paletteName }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(function(response) {
		console.log(response)
	})
	.catch(function(error) {
		console.log(error)
	})
}

//Projects
const mockProjects = [
	{
		id: 1,
		name: 'interior'
	},
	{
		id: 2,
		name: 'exterior'
	}
]	

//Palettes
const mockPalettes = [
	{
		id: 10,
		name: 'happy palette',
		color1: '#A31621',
		color2: '#BFDBF7',
		color3: '#053C5E',
		color4: '#1F7A8C',
		color5: '#DB222A',
		project_id: 1
	},
	{
		id: 11,
		name: 'dark palette',
		color1: '#000000',
		color2: '#1098F7',
		color3: '#FFFFFF',
		color4: '#B89E97',
		color5: '#DECCCC',
		project_id: 1
	},
	{
		id: 12,
		name: 'calm palette',
		color1: '#04151F',
		color2: '#183A37',
		color3: '#EFD6AC',
		color4: '#C44900',
		color5: '#432534',
		project_id: 2
	},
]
