const express = require('express');
const app = express();
app.locals.projects = [];
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
app.locals.palettes = [];

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use( bodyParser.json() );

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));


//Project Endpoints

app.get('/api/v1/projects', (request, response) => {
	database('projects').select()
		.then((projects) => {
			response.status(200).json(projects);
		})
		.catch((error) => {
			response.status(500).json({ error });
		});
});

app.get('/api/v1/projects/:id', (request, response) => {
	database('projects').where('id', request.params.id).select()
		.then(projects => {
			if (projects.length) {
				response.status(200).json(projects);
			} else {
				response.status(404).json({
					error: `Could not find project with id ${request.params.id}`
				});
			}
		})
		.catch(error => {
			response.status(500).json({ error });
		});
});

app.post('/api/v1/projects', (request, response) => {
	const project = request.body;

	for (let requiredParameter of ['name']) {
		if (!project[requiredParameter]) {
			return response
				.status(422)
				.send({ error: `Expected format: { name: <String> }.  You're missing a '${requiredParameter}' property.` });
		}
	}

	database('projects').insert(project, 'id')
		.then(project => {
			response.status(201).json({ id: project[0] })
		})
		.catch(error => {
			response.status(500).json({ error });
		});
});

//Palette Endpoints
app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
	const projectId = request.params.project_id
	database('palettes').where('project_id', projectId).select()
		.then((palettes) => {
			response.status(200).json(palettes);
		})
		.catch((error) => {
			response.status(500).json({ error });
		});
});

app.post('/api/v1/palettes', (request, response) => {
	const palette = request.body;

	for (let requiredParameter of ['name', 'color1', 'color2', 'color3', 'color4', 'color5', 'project_id']) {
		if (!palette[requiredParameter]) {
			return response
				.status(422)
				.send({ error: `Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>, project_id: <Number> You're missing a '${requiredParameter}' property.}` })
		}
	}
	database('palettes').insert(palette, 'id')
		.then(palette => {
			response.status(201).json({ id: palette[0] })
		})
		.catch(error => {
			response.status(500).json({ error });
		});
})

app.delete('/api/v1/projects/:project_id/palettes/:id', (request, response) => {
	const { id } = request.params;

	database('palettes').where('id', id).del()
		.then(id => {
			response.status(200).json({ message: `Palette ${id} deleted.` })
		})
		.catch(error => {
			response.status(500).json({ error })
		})
})

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}`)
})
