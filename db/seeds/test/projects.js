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
      let projectPromises = mockProjects.map(project => {
      	return createProjects(knex, project)
      })
      return Promise.all(projectPromises)
    })
    .then(() => console.log('Successfully seeded db!'))
    .catch(error => console.log(`Error seeding db: ${error.message}`))
};