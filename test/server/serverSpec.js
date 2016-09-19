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
/*
  **********************************************************************************************
  These tests are pending until completion of Order creation endpoints
  **********************************************************************************************
*/
  global.xit_('can add a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield request(app);
    // Blah blah blah, implement me!
  });

  global.xit_('can delete a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield request(app);
    // Blah blah blah, implement me!
  });

  global.xit_('can add a VIEW relationship between an Owner and an Order', function* anon() {
    yield request(app);
    // Blah blah blah, implement me!
  });

  global.xit_('can delete a VIEW relationship between an Owner and an Order', function* anon() {
    yield request(app);
    // Blah blah blah, implement me!
  });
/*
  **********************************************************************************************
*/

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

  const newOrder = {
    name: 'New Order',
    created_on: 'today',
    request_date: 'tomorrow',
    fulfilled: false,
    total_price: 0,
    address: '987 Right Here Rd',
  };

  global.it_('can add an Owner to the database', function* anon() {
    yield db.createOwner(newOwner)
    .then(response => {
      global.expect(response.labels[0]).to.equal('Owner');
      global.expect(response.properties.name).to.equal(newOwner.name);
    });
  });

  global.it_('can fetch an existing Owner', function* anon() {
    yield db.findOwner(newOwner.name)
    .then(response => {
      global.expect(response.labels[0]).to.equal('Owner');
      global.expect(response.properties.name).to.equal(newOwner.name);
    });
  });
/*
  **********************************************************************************************
  These tests are pending until completion of Order creation functions
  **********************************************************************************************
*/
  global.xit_('can add a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield db.createOrder(newOrder)
    .then(response => {
      global.expect(response.labels[0]).to.equal('Order');
      console.log('need to implement this', response);

      return db.createOwnerToNodeRelationship(newOwner.name, newOrder, 'Order', {}, 'CAN_EDIT');
    })
    .then(response => {
      console.log('need to implement this', response);
    });
  });

  global.xit_('can delete a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield db.deleteOwnerRelationship(newOwner.name, newOrder, 'Order', {}, 'CAN_EDIT')
    .then(response => {
      console.log('need to implement this', response);

      return db.deleteOrder(newOrder);
    })
    .then(response => {
      console.log('need to implement this', response);
    });
  });

  global.xit_('can add a VIEW relationship between an Owner and an Order', function* anon() {
    yield db.createOrder(newOrder)
    .then(response => {
      global.expect(response.labels[0]).to.equal('Order');
      console.log('need to implement this', response);

      return db.createNodeToOwnerRelationship(newOwner.name, newOrder, 'Order', {}, 'VIEW');
    })
    .then(response => {
      console.log('need to implement this', response);
    });
  });

  global.xit_('can delete a VIEW relationship between an Owner and an Order', function* anon() {
    yield db.deleteOwnerRelationship(newOwner.name, newOrder, 'Order', {}, 'VIEW')
    .then(response => {
      console.log('need to implement this', response);

      return db.deleteOrder(newOrder);
    })
    .then(response => {
      console.log('need to implement this', response);
    });
  });
/*
  **********************************************************************************************
*/

  global.it_('can delete an Owner from the database', function* anon() {
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


global.describe('The Database', () => {
  var orderId = '';
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  // Testing the Owner database functions
  const newOrder = {
    order_id: null,
    created_on: '18sep2016',
    request_date: '24sep2016',
    fulfilled: false,
    total_price: 20,
    address: '456 Righthere Ln.',
  };

  const items = [{
    name: 'Chips',
    quantity: 10,
  }, {
    name: 'Nachos',
    quantity: 4,
  }, {
    name: 'Quesadillas',
    quantity: 4,
  }];

  const owner = { name: 'Alice' };
  global.it_('can add an Order to the database', function* anon() {
    yield db.createOrder(newOrder)
    .then(response => {
      orderId = response.properties.order_id;
      global.expect(response.labels[0]).to.equal('Order');
      global.expect(response.properties.created_on).to.equal('18sep2016');
    });
  });

  global.it_('adds items to an order', function* anon() {
    yield db.addItemsToOrder(orderId, items, owner)
    .then(response => {
      console.log('response: ', response[0])
      global.expect(response[0].rel.type).to.equal('REQ');
      global.expect(response[0].rel.properties.quantity).to.equal(10);
    });
  });
});