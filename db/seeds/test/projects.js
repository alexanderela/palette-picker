const { mockProjects, mockPalettes } = require('../../../utils/seedMocks')

const createProjects = (knex, project) => {
	return knex('projects').insert({
		name: project.name
	}, 'id')
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
  	.then(() => knex('projects').del())
    .then(() => {
      // Inserts seed entries
      return Promise.all([
      	knex('projects').insert({
      		name: 'test seed project'
      	}, 'id')
      	.then(project => {
      		return knex('palettes').insert([
						{ 
							name: 'Test Palette 1',
							color1: '#938be9',
							color2: '#d045ae',
							color3: '#b508e8',
							color4: '#2f770f',
							color5: '#68e9cd',
							project_id: project[0],
						},
						{ 
							name: 'Test Palette 2',
							color1: '#ffffff',
							color2: '#000000',
							color3: '#800000',
							color4: '#ff0000',
							color5: '#ffa500',
							project_id: project[0],
						}
      		])
      	})
      	.then(() => console.log('Seeding complete!'))
      	.catch(error => console.log(`Error seeding data: ${error}`))
    	])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
