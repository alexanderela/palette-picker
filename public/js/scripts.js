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

function getProjects() {
	fetch('/api/v1/projects')
		.then(function(response) {
			console.log(response)
	})
		.catch(function(error) {
			console.log(error)
	})
}

function saveProject() {
	const projects = getProjects()
	console.log(projects)
	const inputValue = $('.project-input').val();
	addProjectToDropdown(inputValue);
	storeProject(inputValue)
}


function addProjectToDropdown(projectName, projectId) {
	$('.project-select').append(`<option data-id='${projectId}' value='${projectName}'>${projectName}</option>`)
}

function storeProject(projectName) {
	fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name: projectName }),
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
	}
]

function showSavedPalettes() {
	return mockPalettes.map(palette => {
		const { name, color1, color2, color3, color4, color5, project_id } = palette
		return `
		<section class='saved-project-palettes'>
			<button class='saved-project-button'>Project: ${project_id}</button>
			
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
				<button class='delete-btn'>X</button>
			</div>
		</section>`
	})

}








function savePalette() {
	const project = getProjects()
	console.log(project)
	const inputValue = $('.palette-input').val()
	let allColors = {}
	for(let i = 1; i < 6; i++) {
		allColors[`color${i}`] = $(`.color-${i}-text`).text()
	}
	const paletteNameId = {name: inputValue, project_id: project}
	const palette = Object.assign(allColors, paletteNameId)
		console.log(palette)
	storePalette(inputValue, palette)
	$('.saved-palettes').append(showSavedPalettes())
}

function storePalette(paletteName, palette) {
	const { name, color1, color2, color3, color4, color5, project_id } = palette
	fetch('http://localhost:3000/api/v1/palettes', {
		method: 'POST',
		body: JSON.stringify({ 
			name: name,
			project_id: project_id,
			color1: color1,
			color2: color2,
			color3: color3,
			color4: color4,
			color5: color5,
		}),
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