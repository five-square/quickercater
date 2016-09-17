require(global.TEST_HELPER); // <--- This must be at the top of every test file.

const request = require('supertest-as-promised');

const routes = require(`${global.__server}/server.js`);

const db = require(`${global.__server}/db.js`);

describe('The Server', () => {
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  global.it_('serves an example endpoint', function* () {
    //
    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
    yield request(app)
    .get('/api/tags-example')
    .expect(200)
    .expect((response) => {
      global.expect(response.body).to.include('node');
    });
  });
  global.it_('serves an db testing endpoint', function* () {
    //
    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
    const owner = {
      name: "Test food Truck"
    };
    yield request(app) // db should be empty
      .get('/dbtest')  // db should respond with null if node does not exist.
      .send(owner.name)
      .expect(200)
      .expect((response) => {
        console.log('response body db endpoint test: ', response.body);
        global.expect(response.body).to.equal(null);
      });
  });
});
