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

  global.it_('serves HTML to the root endpoint', function* anon() {
    yield request(app)
    .get('/')
    .expect(200)
    .expect(response => {
      global.expect(response.res.headers['content-type']).to.equal('text/html; charset=UTF-8');
    });
  });

  // Testing the Owner server endpoints
  const newOwner = {
    name: 'Frank',
    phone: '555-459-2222',
    email: 'frank@email.com',
    description: 'I love Italian food',
    auth_key: true,
  };

  global.it_('can create an Owner', function* anon() {
    yield request(app)
    .post('/api/owner/create')
    .send(newOwner)
    .expect(201)
    .expect(response => {
      global.expect(response.body.properties).to.deep.equal(newOwner);
      global.expect(response.body.labels[0]).to.equal('Owner');
    });
  });

  global.it_('can fetch an Owner from the database', function* anon() {
    yield request(app)
    .get(`/api/owner/${newOwner.name}`)
    .expect(200)
    .expect(response => {
      global.expect(response.body.properties.name).to.equal(newOwner.name);
      global.expect(response.body.labels[0]).to.equal('Owner');
    });
  });

  global.it_('can delete an Owner', function* anon() {
    yield request(app)
    .delete(`/api/owner/${newOwner.name}`)
    .expect(202)
    .expect(response => {
      global.expect(response.body.length).to.equal(0);
    })
    .then(() => request(app)
      .get(`/api/owner/${newOwner.name}`)
      .expect(404)
      .expect(response => {
        global.expect(response.body).to.deep.equal({});
      })
    );
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

  // Testing the Owner database functions
  const newOwner = {
    name: 'Frank',
    phone: '555-459-2222',
    email: 'frank@email.com',
    description: 'I love Italian food',
    auth_key: true,
  };

  global.it_('can add an Owner to the database', function* anon() {
    yield db.createOwner(newOwner)
    .then(response => {
      global.expect(response.labels[0]).to.equal('Owner');
      global.expect(response.properties.name).to.equal('Frank');
    });
  });

  global.it_('finds an Owner from the database by name', function* anon() {
    yield db.findOwner('Alice')
    .then(response => {
      global.expect(response.labels[0]).to.equal('Owner');
      global.expect(response.properties.name).to.equal('Alice');
    });
  });

  global.it_('deletes an Owner from the database by name', function* anon() {
    yield db.deleteOwner(newOwner.name)
    .then(response => {
      global.expect(response).to.deep.equal([]);
      return db.findOwner(newOwner.name);
    })
    .then(response => {
      global.expect(response).to.equal('Owner does not exist');
    });
  });
});
