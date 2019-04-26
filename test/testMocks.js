//Mock Projects

const testProjects = [
	{ name: 'Project 1' },
	{ name: 'Project 2' }
]

const testMockProjects = [
	{ name: 'Test Project 1' },
	{ name: 'Test Project 2' }
]

const testErrorProjects = [
	{},
	{ name: 'Project 2' }
]

const testMockEditProjects = [
	{ name: 'Test Project 1' },
	{}
]
//Test Palettes

const testPalettes = [
	{ 
		name: 'Test Palette 1',
		project_id: 1,
		color1: '#938be9',
		color2: '#d045ae',
		color3: '#b508e8',
		color4: '#2f770f',
		color5: '#68e9cd',
	},
	{ 
		id: 1,
		name: 'Test Palette 2',
		project_id: 1,
		color1: '#ffffff',
		color2: '#000000',
		color3: '#800000',
		color4: '#ff0000',
		color5: '#ffa500',
	},
]

const testMockPalettes = [
	{ 
		name: 'Test Palette 1',
		project_id: 1,
		color1: '#938be9',
		color2: '#d045ae',
		color3: '#b508e8',
		color4: '#2f770f',
		color5: '#68e9cd',
	},
	{ 
		name: 'Test Palette 2',
		project_id: 1,
		color1: '#ffffff',
		color2: '#000000',
		color3: '#800000',
		color4: '#ff0000',
		color5: '#ffa500',
	}
]

const testMockErrorPalettes = [
	{ 
		project_id: 1,
		color1: '#938be9',
		color2: '#d045ae',
		color3: '#b508e8',
		color4: '#2f770f',
		color5: '#68e9cd',
	},
	{ 
		name: 'Test Palette 2',
		project_id: 1,
		color1: '#ffffff',
		color2: '#000000',
		color3: '#800000',
		color4: '#ff0000',
		color5: '#ffa500',
	}
]

const testMockEditPalettes = [
	{ 
		name: 'Test Palette 1',
		project_id: 1,
		color1: '#938be9',
		color2: '#d045ae',
		color3: '#b508e8',
		color4: '#2f770f',
		color5: '#68e9cd',
	},
	{ 
		project_id: 1,
		color1: '#ffffff',
		color2: '#000000',
		color3: '#800000',
		color4: '#ff0000',
		color5: '#ffa500',
	}
]

module.exports = { 
	testProjects, 
	testMockProjects, 
	testErrorProjects, 
	testMockEditProjects, 
	testPalettes, 
	testMockPalettes, 
	testMockErrorPalettes, 
	testMockEditPalettes 
}