const express = require('express');
const app = express();
app.locals.projects = [];
// const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));
// app.use( bodyParser.json() );


//Project Endpoints
app.get('/projects', (request, response) => {
	const projects = app.locals.projects;
	return response.json({ projects })
});

app.get('/projects/:id', (request, response) => {
	const { id } = request.params;
	const project = app.locals.projects.find(project => project.id === id);
	if (project) {
		return response.status(200).json(project);
	} else {
		return response.sendStatus(404);
	}
});



//Palette Endpoints

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}`)
})

