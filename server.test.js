describe('server.js', () => {
	let server;

	beforeEach(() => {
		server = require('./server.js');
	})

	afterEach(() => {
		server.close()
	})

	describe('GET /projects', () => {
		it('should respond to /', (done) => {
			const res = await request(app).get('/api/v1/projects')
			const result = res.body
			expect(result.length).toEqual(0)
		})
	})
})