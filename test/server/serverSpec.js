require(global.TEST_HELPER); // <--- This must be at the top of every test file.

const request = require('supertest-as-promised');

const routes = require(`${global.__server}/server.js`);

const db = require(`${global.__server}/db.js`);

/*
  **********************************************************************************************

  Server Tests!

  **********************************************************************************************
*/

global.describe('The Server', () => {
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  global.it_('serves HTML to the root endpoint', function* () {
    yield request(app)
    .get('/')
    .expect(200)
    .expect(response => {
      global.expect(response.res.headers['content-type']).to.equal('text/html; charset=UTF-8');
    });
  });

  global.it_('can fetch an Owner from the database', function* () {
    yield request(app)
    .get('/api/owner/Alice')
    .expect(200)
    .expect(response => {
      global.expect(response.body[0].owner.properties.name).to.equal('Alice');
    });
  });
});

/*
  **********************************************************************************************

  Database Tests!

  **********************************************************************************************
*/

global.describe('The Database', () => {
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  global.it_('finds an Owner from the database by name', function* () {
    yield db.findOwner('Alice')
    .then(response => {
      global.expect(response[0].owner.properties.name).to.equal('Alice');
    });
  });
});
