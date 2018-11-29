const express = require('express');
const app = express();
app.locals.projects = [];
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
app.locals.palettes = [];
const environment = process.env.NODE_ENV || 'development';

app.use( bodyParser.json() );

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));


//Project Endpoints
app.get('/api/v1/projects', (request, response) => {
	const projects = app.locals.projects;
	return response.json({ projects })
});

app.get('/api/v1/projects/:id', (request, response) => {
	const { id } = request.params;
	const project = app.locals.projects.find(project => project.id === id);
	if (project) {
		return response.status(200).json(project);
	} else {
		return response.sendStatus(404);
	}
});

app.post('/api/v1/projects', (request, response) => {
	const id = uuidv4();
	const project = request.body;

	if (!project) {
		return response.status(422).send({
			error: 'No project name provided'
		});
	} else {
		app.locals.projects.push({ id, ...project });
		return response.status(201).json({ id, project });
	}
})

//Palette Endpoints
app.get('/api/v1/palettes', (request, response) => {
	const project_id = parseInt(request.params.project_id);
	const palettes = app.locals.palettes.filter(palette => palette.project_id === project_id);
	return response.json({ palettes });
});

app.post('/api/v1/palettes', (request, response) => {
	const project_id = parseInt(request.params.project_id);
	const id = uuidv4();
	const palette = request.body;
	app.locals.palettes.push({ id, ...palette, project_id })
	return response.status(201).json({ id, ...palette, project_id })
});

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}`)
})
