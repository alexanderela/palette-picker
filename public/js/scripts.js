$(window).on('load', generatePalette)
$(window).on('load', populateProjectDropdown)
$('.lock-btn').on('click', toggleLock)
$('.new-palette-btn').on('click', generatePalette)
$('.save-project-btn').on('click', checkProjectInput)
$('.save-palette-btn').on('click', checkPaletteInput)
$('.project-select').on('change', populatePalettesFromDropdown)

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

async function populateProjectDropdown() {
	const fetchedProjects = await fetchProjects()
	fetchedProjects.forEach(project => addProjectToDropdown(project.name, project.id))
}

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
		let project = await storeProject(inputValue)
		addProjectToDropdown(inputValue, project.id)		
		$('.project-input').val('')
	} else {
		$('.project-error').text(`Project '${inputValue}' already added!`)
	}
}

async function addProjectToDropdown(projectInput, projectId) {
	$('.project-select').append(`<option class='proj-dropdown-opt ${projectInput}' data-id='${projectId}' value='${projectInput}'>${projectInput}</option>`)
}

async function storeProject(projectName) {
	const response = await fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name: projectName }),
    headers:{
      'Content-Type': 'application/json'
    }
	})
	const data = await response.json()
	return data
}



async function storePalette(palette) {
	const { name, color1, color2, color3, color4, color5, project_id } = palette
	const response = await fetch('/api/v1/palettes', {
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
	const url = `/api/v1/projects/${projectId}/palettes`
	const response = await fetch(url)
	const palettes = await response.json();
	return palettes;
}

function compilePalette(paletteInput) {
	let allColors = {}
	for(let i = 1; i < 6; i++) {
		allColors[`color${i}`] = $(`.color-${i}-text`).text()
	}
	const projectId = $('.project-select option:selected').attr('data-id');
	const paletteNameId = {name: paletteInput, project_id: projectId}
	const palette = Object.assign(allColors, paletteNameId)
	return palette
}

function checkPaletteInput() {
	const inputValue = $('.palette-input').val()
	const paletteError = $('.palette-error')
	
	if(inputValue !== '') {
		paletteError.text('')
		savePalette()
	} else {
		paletteError.text('Please enter a name for your palette')
	}
}

async function savePalette() {
	const inputValue = $('.palette-input').val()
	const projectName = $('.project-select option:selected').text();
	const palette = compilePalette(inputValue)
	const { name, project_id } = palette
	const names = document.querySelectorAll('.palette-name')

	for(let i = 0; i < names.length; i++) {
		if(names[i].innerText === name) {
			$('.palette-error').text(`Palette '${inputValue}' already added!`)
			return
		}
	}
	const id = await storePalette(palette)
	const paletteArea = $('.saved-project-palettes')
		await showSavedPalettes(project_id, projectName)
		$('.palette-input').val('')
}

async function getPalettesForProject(projectId) {
	let retrievedPalettes = await fetchPalettes(projectId)
	return retrievedPalettes
}

function populatePalettesFromDropdown(e) {
	e.preventDefault()
	const projectId = $('.project-select option:selected').attr('data-id');
	const projectName = $('.project-select option:selected').text();
	clearDisplayedPalettes()
	const projectPalettes = getPalettesForProject(projectId)
	showSavedPalettes(projectId, projectName)
}

function setMainPaletteFromSaved(event) {
	if($(event.target).hasClass('swatch')) {
		const paletteSwatch = $(event.target.parentNode)

		for(let i = 1; i < 6; i++) {
			$(`.color-${i}`).css('background-color', paletteSwatch.find(`.swatch-color-${i}`).text());
		}
	} 
}

function showPaletteContainer(projectName, projectPalettes) {
	return projectPalettes.map(palette => {
		let { id, name, color1, color2, color3, color4, color5, project_id } = palette
		return `<div class='palette-swatch palette-swatch-${id}' data-id='${id}' onclick='setMainPaletteFromSaved(event)'>
			<div class='bullet-hover'></div>
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

async function showSavedPalettes(projectId, projectName) {
	const projectDropdownName = $('.project-select option:selected').text()
	const projectPalettes = await getPalettesForProject(projectId)
	const paletteContainer = showPaletteContainer(projectName, projectPalettes)
	const projectWithPalettes = `<section class='saved-project-palettes'>
					<h2 class='saved-project-header'>Project: 
						<span class='project-header-name'>${projectName}</span></h2>
					${paletteContainer.join('')}
					</section>`
	clearDisplayedPalettes()
	$('.saved-palettes').append(projectWithPalettes)
}

function clearDisplayedPalettes() {
	$('.saved-project-palettes').remove()	
}


async function deletePalette(e, paletteId, projectId) {
	const url = `/api/v1/projects/${projectId}/palettes/${paletteId}`
	const response = await fetch(url, {
		method: 'DELETE',
		body: JSON.stringify({
			message: 'Palette successfuly deleted.'
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	const data = response.json()
	$(`.palette-swatch-${paletteId}`).remove()
	return data
}

module.exports = checkProjectInput