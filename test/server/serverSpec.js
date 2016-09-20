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
      console.log('in test: ', response.body._id);
      global.expect(response.body.properties).to.deep.equal(newOwner);
      global.expect(response.body.labels[0]).to.equal('Owner');
      newOwner._id = response.body._id;
    });
  });

  global.it_('can fetch an Owner from the database', function* anon() {
    console.log('in test fetching: ', newOwner._id);
    yield request(app)
    .get(`/api/owner/${newOwner._id}`)
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
    .delete(`/api/owner/${newOwner._id}`)
    .expect(202)
    .expect(response => {
      global.expect(response.body.length).to.equal(0);
    })
    .then(() => request(app)
      .get(`/api/owner/${newOwner._id}`)
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
  const newOrder1 = {
    created_on: 'today',
    request_date: 'tomorrow',
    fulfilled: false,
    total_price: 0,
  };
    // name: 'New Order',
    // address: '987 Right Here Rd',

  global.it_('can add an Owner to the database', function* anon() {
    yield db.createOwner(newOwner)
    .then(response => {
      global.expect(response.labels[0]).to.equal('Owner');
      global.expect(response.properties).to.deep.equal(newOwner);
      newOwner._id = response._id;
    });
  });

  global.it_('can fetch an existing Owner', function* anon() {
    yield db.findNode('Owner', newOwner._id)
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
    yield db.createOrder(newOrder1)
    .then(response => {
      console.log('after order creation', response);
      global.expect(response.labels[0]).to.equal('CustomerOrder');
      global.expect(response.properties.created_on).to.equal(newOrder1.created_on);

      return db.createRelationship('Owner', newOwner, 'CAN_EDIT', {}, 'CustomerOrder', [newOrder1]);
    })
    .then(response => {
      console.log('after relationship creation', response);
      return db.findRelationship(
        'Owner', newOwner, 'CAN_EDIT', {}, 'CustomerOrder', [newOrder1]);
    })
    .then(response => {
      console.log('checking the new relationship', response);
      global.expect(response.labels[0].to.equal('CAN_EDIT'));
    });
  });

  global.xit_('can delete a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield db.deleteRelationship('Owner', newOwner, 'CAN_EDIT', {}, 'CustomerOrder', newOrder1)
    .then(response => {
      console.log('need to implement this', response);
      global.expect(response).to.deep.equal([]);
    });
    //   return db.deleteOrder(newOrder1);
    // })
    // .then(response => {
    //   console.log('need to implement this', response);
    // });
  });

  global.xit_('can add a VIEW relationship between an Owner and an Order', function* anon() {
    yield db.createOrder(newOrder1)
    .then(response => {
      global.expect(response.labels[0]).to.equal('CustomerOrder');
      console.log('need to implement this', response);

      return db.createNodeToOwnerRelationship(newOwner.name, newOrder1, 'CustomerOrder', {}, 'VIEW');
    })
    .then(response => {
      console.log('need to implement this', response);
    });
  });

  global.xit_('can delete a VIEW relationship between an Owner and an Order', function* anon() {
    yield db.deleteOwnerRelationship(newOwner.name, newOrder1, 'CustomerOrder', {}, 'VIEW')
    .then(response => {
      console.log('need to implement this', response);

      return db.deleteOrder(newOrder1);
    })
    .then(response => {
      console.log('need to implement this', response);
    });
  });
/*
  **********************************************************************************************
*/

  global.it_('can delete an Owner from the database', function* anon() {
    yield db.deleteNode('Owner', newOwner._id)
    .then(response => {
      global.expect(response).to.deep.equal([]);
      return db.findNode('Owner', newOwner._id);
    })
    .then(response => {
      global.expect(response).to.equal('Node does not exist');
    });
  });
});


global.describe('The Database', () => {
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  // Testing the Owner database functions
  const newOrder = {
    created_on: '18sep2016',
    request_date: '24sep2016',
    fulfilled: false,
    total_price: 20,
    address: '456 Righthere Ln.',
  };

  const items = [{
    name: 'Chips',
    description: 'Freshly made',
    price: 1.99,
    picture: false,
    quantity: 11,
    _id: 461,
  },
    {
      name: 'Nachos',
      description: 'Fresh melted',
      price: 3.99,
      picture: false,
      quantity: 11,
      _id: 462,
    },
    {
      name: 'Quesadillas',
      description: 'Fresh grilled',
      price: 6.99,
      picture: false,
      quantity: 11,
      _id: 463,
    }];

  const owner = { name: 'Alice', _id: 430 };
  global.it_('can add an Order to the database', function* anon() {
    yield db.createOrder(newOrder)
    .then(response => {
      newOrder._id = response._id;
      global.expect(response.labels[0]).to.equal('CustomerOrder');
      global.expect(response.properties.created_on).to.equal('18sep2016');
    });
  });

  global.it_('adds items to an order', function* anon() {
    yield db.addItemsToOrder(newOrder._id, items, owner._id)
    .then(response => {
      global.expect(response[0].rel.type).to.equal('REQ');
      global.expect(response[0].rel.properties.quantity).to.equal(11);
    });
  });

  global.it_('fetches items from an order', function* anon() {
    yield db.fetchOrder(newOrder._id, owner._id)
    .then(response => {
      global.expect(response[0].item.labels[0]).to.equal('Item');
      global.expect(response[0].order.properties.total_price).to.equal(20);
    });
  });
});
