const { mockProjects, mockPalettes } = require('../../../utils/seedMocks')

const createProjects = (knex, project) => {
	return knex('projects').insert({
		name: project.name
	}, 'id')
}

const createPalettes = (knex, palette) => {
  return knex('palettes').insert({
          name: palette.name,
          color1: palette.color1,
          color2: palette.color2,
          color3: palette.color3,
          color4: palette.color4,
          color5: palette.color5,
          project_id: 1     
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
      // console.log(projectPromises)
      return Promise.all(projectPromises)
    })
    .then(() => {
     let palettePromises = mockPalettes.map(palette => {
       return createPalettes(knex, palette)
     })
     // console.log(palettePromises)
      return Promise.all(palettePromises)
    })
    .then(() => console.log('Successfully seeded test db!'))
    .catch(error => console.log(`Error seeding test db: ${error.message}`))
};