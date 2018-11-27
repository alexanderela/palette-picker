const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.locals.project = {};
app.locals.palettes = {};

function postProject(id, data) {
	app.locals.project[id] = {
		name: 'new Project',
		palettes: ARRAYOFIDS
	} 
}

app.get('/api/projects/:id', (request, response) => {
	//do your getting
})



app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}`)
})