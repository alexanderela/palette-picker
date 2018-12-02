$(window).on('load', generatePalette)
$('.lock-btn').on('click', toggleLock)
$('.new-palette-btn').on('click', generatePalette)
$('.save-project-btn').on('click', checkProjectInput)
$('.save-palette-btn').on('click', savePalette)

function generatePalette(e) {
	e.preventDefault();
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
	color.toggleClass('color-locked');
};

async function storeProjectInput(projectInput) {
	const fetchedProjects = await fetchProjects()
	const filteredProjects = fetchedProjects.filter(project => project.name === projectInput)
	return filteredProjects
}

async function fetchProjects() {
	const projects = await fetch('/api/v1/projects')
	const response = await projects.json()
	return response
}

function checkProjectInput() {
	const inputValue = $('.project-input').val()
	const projectError = $('.project-error')
	
	if(inputValue !== '') {
		projectError.text('')
		saveProject()
	} else {
		projectError.text('Please enter a name for your project')
	}
}

async function saveProject() {
	const inputValue = $('.project-input').val()
	const projectAlreadyStored = await storeProjectInput(inputValue)
	const dropdown = $('.proj-select')

	if(projectAlreadyStored.length === 0) {
		let projectId = await storeProject(inputValue)
		addProjectToDropdown(inputValue, projectId)		
		$('.project-input').val('')
	} else {
		console.log(`Project ${inputValue} already added!`)
	}
}

async function addProjectToDropdown(projectInput, projectId) {
	$('.project-select').append(`<option class='proj-dropdown-opt' data-id='${projectId.id}' value='${projectInput}'>${projectInput}</option>`)
}

async function storeProject(projectName) {
	const response = await fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name: projectName }),
    headers:{
      'Content-Type': 'application/json'
    }
	})
	const data = await response.json()
	console.log(data)
	return data
}



async function storePalette(palette) {
	const { name, color1, color2, color3, color4, color5, project_id } = palette
	const response = await fetch('http://localhost:3000/api/v1/palettes', {
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
	const data = await response.json()
	return data
}


async function fetchPalettes(projectId) {
	const url = `http://localhost:3000/api/v1/projects/${projectId}/palettes`
	const response = await fetch(url)
	const palettes = await response.json();
	return palettes;
}

async function storePaletteInput(paletteInput, projectId) {
	const fetchedPalettes = await fetchPalettes(projectId)
	return fetchedPalettes.filter(palette => palette.name === paletteInput)
}

function compilePalette(paletteInput) {
	let allColors = {}
	for(let i = 1; i < 6; i++) {
		allColors[`color${i}`] = $(`.color-${i}-text`).text()
	}
	const projectId = $('.proj-dropdown-opt').attr('data-id')
	const paletteNameId = {name: paletteInput, project_id: projectId}
	const palette = Object.assign(allColors, paletteNameId)
	return palette
}

async function savePalette() {
	const inputValue = $('.palette-input').val()
	const projectName = $('.proj-dropdown-opt').text()
	const palette = compilePalette(inputValue)
	const { name, project_id } = palette
	const projectAlreadyStored = await storePaletteInput(inputValue, project_id)

	if(projectAlreadyStored.length === 0) {
		storePalette(palette)
		await showSavedPalettes(palette, projectName)
		$('.palette-input').val('')
	} else {
		console.log(`Palette ${inputValue} already added!`)
	}
}

async function getPalettesForProject(projectId) {
	let retrievedPalettes = await fetchPalettes(projectId)
	console.log(retrievedPalettes)
	let filteredPalettes = await retrievedPalettes.filter(async palette => palette.project_id === projectId)
	console.log(filteredPalettes)
	return filteredPalettes
}

function setMainPaletteFromSaved(event) {
	if($(event.target).hasClass('swatch')) {
		console.log($(event.target.parentNode).find('.palette-thumb').text())
		for(let i = 1; i < 6; i++) {
			$(`.color-${i}`).css('background-color', getSwatchColors(`${i}`));
		}
	} 
}

function getSwatchColors(num) {
	const swatchHexCodes = $(`.swatch-color-${num}`).text().slice(0, 7);
	console.log(swatchHexCodes)
	return swatchHexCodes
}

function showPaletteContainer(palette, projectName, allPalettes) {
	return allPalettes.map(palette => {
		let { id, name, color1, color2, color3, color4, color5, project_id } = palette
		return `<div class='palette-swatch palette-swatch-${id}' data-id='${id}' onclick='setMainPaletteFromSaved(event)'>
			<h3 class='palette-name swatch'>${name}</h3>	
			<div class='palette-thumb swatch' style='background-color:${color1}'>
				<h3 class='palette-swatch-hex swatch-color-1'>${color1}</h3>
			</div>
			<div class='palette-thumb swatch' style='background-color:${color2}'>
				<h3 class='palette-swatch-hex swatch-color-2'>${color2}</h3>
			</div>
			<div class='palette-thumb swatch' style='background-color:${color3}'>
				<h3 class='palette-swatch-hex swatch-color-3'>${color3}</h3>
			</div>
			<div class='palette-thumb swatch' style='background-color:${color4}'>
				<h3 class='palette-swatch-hex swatch-color-4'>${color4}</h3>
			</div>
			<div class='palette-thumb swatch' style='background-color:${color5}'>
				<h3 class='palette-swatch-hex swatch-color-5'>${color5}</h3>
			</div>
			<button class='delete-btn' onclick='deletePalette(event, ${id}, ${project_id})'>X</button>
		</div>`
	})
}

async function showSavedPalettes(palette, projectName) {
	const projectDropdownName = $('.proj-dropdown-opt').text()
	const allPalettes = await getPalettesForProject(palette.project_id)
	const paletteContainer = showPaletteContainer(palette, projectName, allPalettes)
	const projectWithPalettes = `<section class='saved-project-palettes'>
					<button class='saved-project-button'>Project: ${projectName}</button>
					${paletteContainer.join('')}
					</section>`
	if(projectName === projectDropdownName) {
		$('.saved-palettes').append(projectWithPalettes)
	} else {
		$('.saved-project-palettes').append(paletteContainer)
	}
}

async function deletePalette(e, paletteId, projectId) {
	console.log('deletePalette hooked up')
	const url = `http://localhost:3000/api/v1/projects/${projectId}/palettes/${paletteId}`
	const response = await fetch(url, {
		method: 'DELETE',
		body: JSON.stringify({
			message: 'palette successfuly deleted hohhhhhh godddddd'
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	const data = response.json()
	$(`.palette-swatch-${paletteId}`).remove()
	return data
}