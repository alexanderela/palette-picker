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
	lockButton.toggleClass('locked');
	color.toggleClass('color-locked')
};

async function addIdToProjectInput(projectInput) {
	const fetchedProjects = await fetchProjects()
	return fetchedProjects.filter(project => project.name === projectInput)
}

async function fetchProjects() {
	const projects = await fetch('/api/v1/projects')
	const response = await projects.json()
	return response
}

async function saveProject() {
	const inputValue = $('.project-input').val();
	const projectAlreadyStored = await addIdToProjectInput(inputValue)

	if(projectAlreadyStored.length === 0) {
		storeProject(inputValue)
		addProjectToDropdown(inputValue)
	} 
}

async function addProjectToDropdown(projectInput) {
	const project = await addIdToProjectInput(projectInput)
		console.log(project)
	$('.project-select').append(`<option class='proj-dropdown-opt' data-id='${project[0].id}' value='${project[0].name}'>${project[0].name}</option>`)
}





// async function getProjects(inputProject) {
// 	const projects = await fetch('/api/v1/projects')
// 	const response = await projects.json()
// 	const data = await addProjectToDropdown(response, inputProject)
// 	return data
// }

// async function saveProject() {
// 	const inputValue = $('.project-input').val();

// 	storeProject(inputValue)
// 	await getProjects(inputValue)
// }

// function addProjectToDropdown(storedProjects, projectInput) {
// 	const projectId = storedProjects.filter(project => project.name === projectInput)
// 	console.log(projectId[0])
// 	$('.project-select').append(`<option class='proj-dropdown-opt' data-id='${projectId[0].id}' value='${projectId[0].name}'>${projectId[0].name}</option>`)
// }

async function storeProject(projectName) {
	return await fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name: projectName }),
    headers:{
      'Content-Type': 'application/json'
    }
	})
	return response.json()
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
		id: 12,
		name: 'calm palette',
		color1: '#04151F',
		color2: '#183A37',
		color3: '#EFD6AC',
		color4: '#C44900',
		color5: '#432534',
		project_id: 2
	}
]

// function generateSwatch() {
// 	for(let i = 1; i < 6; i++) {
// 			$(`.palette-thumb-${i}`).css('background-color', `.swatch-color-${i}.text()`);
// 	}
// }

function setMainPaletteFromSaved(event) {
	if($(event.target).hasClass('palette-swatch')) {
		console.log(event.target)
	} else {
		console.log(event.target.parentNode)
	}
}

function showSavedPalettes(retrievedPalettes, projectName) {
	const palettes = retrievedPalettes.map(pal => {
		let { id, name, color1, color2, color3, color4, color5, project_id } = pal

		return `<div class='palette-swatch' onclick='setMainPaletteFromSaved(event)'>
			<h3 class='palette-name'>${name}</h3>	
			<div class='palette-thumb palette-thumb-1' style='background-color:${color1}'>
				<h3 class='palette-swatch-hex swatch-color-1'>${color1}</h3>
			</div>
			<div class='palette-thumb palette-thumb-2' style='background-color:${color2}'>
				<h3 class='palette-swatch-hex swatch-color-2'>${color2}</h3>
			</div>
			<div class='palette-thumb palette-thumb-3' style='background-color:${color3}'>
				<h3 class='palette-swatch-hex swatch-color-3'>${color3}</h3>
			</div>
			<div class='palette-thumb palette-thumb-4' style='background-color:${color4}'>
				<h3 class='palette-swatch-hex swatch-color-4'>${color4}</h3>
			</div>
			<div class='palette-thumb palette-thumb-5' style='background-color:${color5}'>
				<h3 class='palette-swatch-hex swatch-color-5'>${color5}</h3>
			</div>
			<button class='delete-btn' onclick='deletePalette(event, ${id}, ${project_id})'>X</button>
		</div>`
	})
	// generateSwatch()

		return `<section class='saved-project-palettes'>

					<button class='saved-project-button'>Project: ${projectName}</button>
					${palettes.join('')}
				</section>`
}

async function deletePalette(e, paletteId, projectId) {
	const url = `http://localhost:3000/api/v1/projects/${projectId}/palettes/${paletteId}`
	return await fetch(url, {
		method: 'DELETE',
		body: JSON.stringify({
			message: 'palette successfuly deleted hohhhhhh godddddd'
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}




async function savePalette(event) {
	// const project = getProjects()

	const inputValue = $('.palette-input').val()
	let allColors = {}
	for(let i = 1; i < 6; i++) {
		allColors[`color${i}`] = $(`.color-${i}-text`).text()
	}
	const projectId = $('.proj-dropdown-opt').attr('data-id')
	const paletteNameId = {name: inputValue, project_id: projectId}
	const palette = Object.assign(allColors, paletteNameId)
	storePalette(palette)
	const retrievedPalettes = await getPalettes(projectId)
	$('.saved-palettes').append(showSavedPalettes(retrievedPalettes, paletteNameId.name, event))
}

function storePalette(palette) {
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

async function getPalettes(projectId) {
	const url = `http://localhost:3000/api/v1/projects/${projectId}/palettes`
	const response = await fetch(url)
	const palettes = await response.json();
	return palettes;
}
