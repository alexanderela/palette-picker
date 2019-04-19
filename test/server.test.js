process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const config = require('../knexfile')['test'];
const database = require('knex')(config);

chai.use(chaiHttp)

describe('server.js', () => {
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

	describe('GET /projects', () => {
		it('should respond to /', async (done) => {
			const res = await request(app).get('/api/v1/projects')
			const result = res.body
			expect(result.length).toEqual(0)
			done();
		})
	})
})