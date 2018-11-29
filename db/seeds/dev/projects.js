
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'interior'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            {
              name: 'happy palette',
              color1: '#A31621',
              color2: '#BFDBF7',
              color3: '#053C5E',
              color4: '#1F7A8C',
              color5: '#DB222A',
              project_id: project[0]
            },
            {
              name: 'dark palette',
              color1: '#000000',
              color2: '#1098F7',
              color3: '#FFFFFF',
              color4: '#B89E97',
              color5: '#DECCCC',
              project_id: project[0]
            }            
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
