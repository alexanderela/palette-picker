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

function getProject() {
	fetch('/api/v1/projects')
		.then(function(response) {
			console.log(response)
	})
		.catch(function(error) {
			console.log(error)
	})
}

function savePalette() {
	const project = getProject()
	console.log(project)
	const inputValue = $('.palette-input').val()
	let allColors = {}
	for(let i = 1; i < 6; i++) {
		allColors[`color${i}`] = $(`.color-${i}-text`).text()
	}
	const paletteInfo = {name: inputValue, project_id: project}
	const paletteNameAndColors = Object.assign(allColors, paletteInfo)
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
>>>>>>> c5a4f20794530a787114029c1225b89c4ba2c6d7

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

function showSavedPalettes() {
	return mockPalettes.map(palette => {
		const { name, color1, color2, color3, color4, color5, project_id } = palette
		return `
		<section class='saved-project-palettes'>
		<button class='saved-project'>Project: ${project_id}</button>
		<div class='palette-swatch'>
			<div class='palette-thumb'>
				<h3 class='palette-swatch-hex'>${color1}</h3>
			</div>
			<div class='palette-thumb'>
				<h3 class='palette-swatch-hex'>${color2}</h3>
				</div>
			<div class='palette-thumb'>
				<h3 class='palette-swatch-hex'>${color3}</h3>
				</div>
			<div class='palette-thumb'>
				<h3 class='palette-swatch-hex'>${color4}</h3>
				</div>
			<div class='palette-thumb'>
				<h3 class='palette-swatch-hex'>${color5}</h3>
				</div>
			<button>X</button>
		</div>
		</section>`
	})

}








function savePalette() {
	const project = getProject()
	console.log(project)
	const inputValue = $('.palette-input').val()
	let allColors = {}
	for(let i = 1; i < 6; i++) {
		allColors[`color${i}`] = $(`.color-${i}-text`).text()
	}
	const paletteInfo = {name: inputValue, project_id: project}
	const paletteNameAndColors = Object.assign(allColors, paletteInfo)
	storePalette(inputValue)
	$('.saved-palettes').append(showSavedPalettes())
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
