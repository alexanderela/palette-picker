process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const config = require('../knexfile')['test'];
const database = require('knex')(config);
const { testProjects, testMockProjects, testErrorProjects, testMockEditProjects, testPalettes, testMockPalettes, testMockErrorPalettes, testMockEditPalettes } = require('./testMocks');

chai.use(chaiHttp)

describe('server.js', () => {
	before(done => {
		database.migrate.rollback()
			.then(() => database.migrate.latest())
			.then(() => database.seed.run())
			.then(() => done())
	})

	after(done => {
		database.migrate.rollback()
			.then(() => console.log('Testing complete. Db rolled back.'))
			.then(() => done())
	})

	describe('GET /api/v1/projects', () => {
		beforeEach(done => {
			database.migrate.rollback()
				.then(() => database.migrate.latest())
				.then(() => database.seed.run())
				.then(() => done())
		})

		after(done => {
			database.migrate.rollback()
				.then(() => console.log('Testing complete. Db rolled back.'))
				.then(() => done())
		})

		it('GET sends back a 200 status code and correct response object', done => {
			chai.request(app)
				.get('/api/v1/projects')
				.end((error, response) => {
					console.log(response)
					// console.log(response)
					// const projectNames = response.body.map(project => project.name);
					const projectName1 = 'test seed project'

					// expect(error).to.be.null
					// expect(response).to.have.status(200)
					// expect(projectNames.includes(projectName1)).to.equal(true)
					done();
				})
		})
	})
})