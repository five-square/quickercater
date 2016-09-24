// 'use strict';

require(global.TEST_HELPER); // <--- This must be at the top of every test file.

const request = require('supertest-as-promised');

const routes = require(`${global.__server}/server.js`);

const db = require(`${global.__server}/db.js`);


/*
  **********************************************************************************************

  Function Name Tests!

  **********************************************************************************************
*/

global.describe('The Function', () => {
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  global.it_('db.getMenuByOwnerId exists and is a function', function* anon() {
    console.log('yep');
    return db.getMenuByOwnerId.should.be.a('function');
  });
});

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

  const newOrder = {
    name: 'New Order',
    created_on: 'today',
    request_date: 'tomorrow',
    fulfilled: false,
    total_price: 0,
    address: '987 Right Here Rd',
  };

  const relPostObj = {
    parent_label: 'Owner',
    parent_id: null,
    rel_label: 'CAN_EDIT',
    node_label: 'CustomerOrder',
    node_id: null,
  };

  global.it_('can create an Owner', function* anon() {
    yield request(app)
    .post('/api/owner/create')
    .send(newOwner)
    .expect(201)
    .expect(response => {
      global.expect(response.body.properties).to.deep.equal(newOwner);
      global.expect(response.body.labels[0]).to.equal('Owner');
      newOwner._id = response.body._id;
      relPostObj.parent_id = response.body._id;
    });
  });

  global.it_('can fetch an Owner from the database', function* anon() {
    yield request(app)
    .get(`/api/owner/${newOwner._id}`)
    .expect(200)
    .expect(response => {
      global.expect(response.body.properties.name).to.equal(newOwner.name);
      global.expect(response.body.labels[0]).to.equal('Owner');
    });
  });

  global.it_('can create an Item from POST /api/item/create', function* anon() {
    const testObj = {
      name: 'DogMeat',
      description: 'meatball dog',
      price: 6,
      picture: 'you are L',
    };
    yield request(app).post('/api/item/create')
      .send({ itemObj: testObj })
      .expect(201)
      .expect(response => {
        // console.log('===========' + JSON.stringify(response.body));
        newOwner._id = response.body._id;
        global.expect(response.body.properties).to.deep.equal(testObj);
        // global.expect(response.body).to.deep.equal(testObj);
      });
  });

  global.it_('can fetch an Item from GET /api/item/:id', function* anon() {
    const testItem = {
      name: 'DogMeat',
      description: 'meatball dog',
      price: 6,
      picture: 'you are L',
    };
    // console.log(newOwner.__id + '================');
    yield request(app).get(`/api/item/${newOwner._id}`)
      .expect(200)
      .expect(resp1 => {
        global.expect(resp1.body.properties).to.deep.equal(testItem);
      });
  });

  global.xit_('can delete an item from the endpoint', function* anon() {
    yield request(app)
    .get('/')
    .expect(200);
  });

/*
  **********************************************************************************************
  These tests are pending until completion of Order creation endpoints
  **********************************************************************************************
*/
  global.it_('can create an Order', function* anon() {
    yield request(app)
    .post('/api/order/create')
    .send(newOrder)
    .expect(201)
    .expect(response => {
      // global.expect(false).to.equal(true);
      global.expect(response.body.properties).to.deep.equal(newOrder);
      global.expect(response.body.labels[0]).to.equal('CustomerOrder');
      newOrder._id = response.body._id;
      relPostObj.node_id = response.body._id;
    });
  });

  global.it_('can fetch an Order', function* anon() {
    yield request(app)
    .get(`/api/order/${newOrder._id}`)
    .expect(200)
    .expect(response => {
      global.expect(response.body._id).to.deep.equal(newOrder._id);
      global.expect(response.body.labels[0]).to.equal('CustomerOrder');
    });
  });

  global.xit_('can add a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield request(app)
    .post('/api/relationship/create')
    .send(relPostObj)
    .expect(201)
    .expect(response => {
      global.expect(response.body.parent._id).to.equal(newOwner._id);
      global.expect(response.body.dest._id).to.equal(newOrder._id);
      global.expect(response.body.rel.type).to.equal('CAN_EDIT');
      relPostObj._id = response.body.rel._id;
    });
  });

  global.xit_('can delete a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield request(app)
    .post('/api/relationship/delete')
    .send(relPostObj)
    .expect(202)
    .expect(response => {
      global.expect(response.body.length).to.equal(0);
    });
  });

  global.xit_('can add a VIEW relationship between an Owner and an Order', function* anon() {
    const tempLabel = relPostObj.parent_label;
    relPostObj.parent_label = relPostObj.node_label;
    relPostObj.node_label = tempLabel;
    relPostObj.parent_id = newOrder._id;
    relPostObj.node_id = newOwner._id;
    relPostObj.rel_label = 'VIEW';
    yield request(app)
    .post('/api/relationship/create')
    .send(relPostObj)
    .expect(201)
    .expect(response => {
      global.expect(response.body.parent._id).to.equal(newOrder._id);
      global.expect(response.body.dest._id).to.equal(newOwner._id);
      global.expect(response.body.rel.type).to.equal('VIEW');
      relPostObj._id = response.body.rel._id;
    });
    // Blah blah blah, implement me!
  });

  global.xit_('can delete a VIEW relationship between an Owner and an Order', function* anon() {
    yield request(app)
    .post('/api/relationship/delete')
    .send(relPostObj)
    .expect(202)
    .expect(response => {
      global.expect(response.body.length).to.equal(0);
    });
  });

  global.it_('can delete an Order', function* anon() {
    yield request(app)
    .post('/api/order/delete')
    .send({ order_id: newOrder._id })
    .expect(202)
    .expect(response => {
      global.expect(response.text).to.equal('Order deleted');
      global.expect(response.body).to.deep.equal({});
    });

    yield request(app)
    .get(`/api/order/${newOrder._id}`)
    .expect(404)
    .expect(response => {
      global.expect(response.text).to.equal('Order does not exist');
      global.expect(response.body).to.deep.equal({});
    });
  });

  global.it_('can fetch all pending orders from endpoint', function* anon() {
    yield request(app)
    .get('/api/order/getAllPending/646')
    .expect(200)
    .expect(response => {
      global.expect(response).to.be.a('object');
    });
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

global.describe('The Owner/Order Database', () => {
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
    name: 'New Order',
    created_on: 'today',
    request_date: 'tomorrow',
    fulfilled: false,
    total_price: 0,
    address: '987 Right Here Rd',
  };
  const newOrder2 = {
    name: 'New Order',
    created_on: 'today',
    request_date: 'tomorrow',
    fulfilled: false,
    total_price: 0,
    address: '987 Right There Rd',
  };

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

  global.it_('can add a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield db.createOrder(newOrder1)
    .then(response => {
      global.expect(response.labels[0]).to.equal('CustomerOrder');
      global.expect(response.properties).to.deep.equal(newOrder1);

      newOrder1._id = response._id;

      return db.createRelationship(
        'Owner', newOwner._id, 'CAN_EDIT', 'CustomerOrder', [newOrder1._id]);
    })
    .then(() => db.findRelationship(
        'Owner', newOwner._id, 'CAN_EDIT', 'CustomerOrder', newOrder1._id))
    .then(response => {
      global.expect(response[0].rel.type).to.equal('CAN_EDIT');
    });
  });

  global.it_('can delete a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield db.deleteRelationship(
      'Owner', newOwner._id, 'CAN_EDIT', 'CustomerOrder', newOrder1._id)
    .then(response => {
      global.expect(response).to.deep.equal([]);
    });
  });

  global.it_('can add a VIEW relationship between an Order and an Owner', function* anon() {
    yield db.createOrder(newOrder2)
    .then(response => {
      global.expect(response.labels[0]).to.equal('CustomerOrder');
      global.expect(response.properties).to.deep.equal(newOrder2);

      newOrder2._id = response._id;

      return db.createRelationship(
        'CustomerOrder', newOrder2._id, 'VIEW', 'Owner', newOwner._id);
    })
    .then(() => db.findRelationship(
        'CustomerOrder', newOrder2._id, 'VIEW', 'Owner', newOwner._id))
    .then(response => {
      global.expect(response[0].rel.type).to.equal('VIEW');
    });
  });

  global.it_('can delete a VIEW relationship between an Order and an Owner', function* anon() {
    yield db.deleteRelationship(
      'CustomerOrder', newOrder2._id, 'VIEW', 'Owner', newOwner._id)
    .then(response => {
      global.expect(response).to.deep.equal([]);
    });
  });

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

// Item Tests

global.describe('The Item Database', () => {
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  let __itemId;

  // Testing the Order database functions
  const newOrder = {
    name: 'New Order',
    created_on: '20sep2016',
    request_date: '24sep2016',
    fulfilled: false,
    total_price: 35,
    address: '456 Righthere Ln.',
  };

  const itemsInfo = [{ itemId: 461, quantity: 11 },
    { itemId: 462, quantity: 11 },
    { itemId: 463, quantity: 11 }];

  // const customer = {
  //   name: 'Carly',
  //   phone: '555-333-5555',
  //   email: 'carly@window.com',
  //   auth_key: true,
  //   _id: 432,
  // };

  const owner = {
    name: 'Alice',
    phone: '555-444-3333',
    email: 'alice@window.com',
    description: 'I love Mexican food',
    auth_key: true,
    _id: 430,
  };

  const orderInfo = { order: newOrder,
    items: itemsInfo,
    ownerId: 430,
    customerId: 432,
    package: { id: 437, expires: '10/10/2016' },
  };

  global.it_('can add an Order to the database', function* anon() {
    yield db.createOrder(newOrder)
    .then(response => {
      newOrder._id = response._id;
      global.expect(response.labels[0]).to.equal('CustomerOrder');
      global.expect(response.properties.created_on).to.equal('20sep2016');
    });
  });

  global.xit_('can create a new menu item and verify created node', function* anon() {
    yield db.createItem({
      name: 'Feijoada',
      description: 'Brazilian stew',
      price: 150,
      picture: 'picture URL',
    })
    .then(response => {
      __itemId = response._id;
      db.getItemById(response._id).then(resp => {
        global.expect(resp.properties).to.deep.equal({
          name: 'Feijoada',
          description: 'Brazilian stew',
          price: 150,
          picture: 'picture URL',
        });
      });
    });
  });

  global.xit_('can get item by picture url', function* anon() {
    const testObj = {
      name: 'Feijoada',
      description: 'Brazilian stew',
      price: 150,
      picture: 'picture URL',
    };
    yield db.getItemByPicture('picture URL').then(resp => {
      global.expect(resp.properties).to.deep.equal(testObj);
    });
  });

  global.xit_('can update an existing menu item', function* anon() {
    const itemObj = {
      name: 'Super Steak Fingers',
      description: 'super weird food',
      price: 0,
      picture: 'SF pic',
      _id: __itemId,
    };
    yield db.updateItem(itemObj).then(resp => {
      db.getItemById(resp._id).then(resp1 => {
        global.expect(resp1.properties).to.exist();
      });
    });
  });

  global.xit_('can delete an existing menu item', function* anon() {
    yield db.removeItemById(__itemId).then(() => {
      db.getItemById(__itemId).then(resp1 => {
        global.expect(resp1).to.equal('Item does not exist');
      });
    });
  });
/*
  **********************************************************************************************
  These tests are pending until completion of Item creation functions
  **********************************************************************************************
*/

  global.xit_('adds items to an order', function* anon() {
    yield db.addItemsToOrder(newOrder._id, orderInfo.items, owner._id)
    .then(response => {
      global.expect(response[0].rel.type).to.equal('REQUEST');
      global.expect(response[0].rel.properties.quantity).to.equal(11);
    });
  });

  global.xit_('fetches items from an order', function* anon() {
    yield db.fetchOrder(newOrder._id, owner._id)
    .then(response => {
      global.expect(response[0].item.labels[0]).to.equal('Item');
      global.expect(response[0].order.properties.total_price).to.equal(20);
    });
  });

  global.xit_('creates order and order relationships', function* anon() {
    yield db.createOrderAndRelationships(orderInfo)
    .then(response => {
      global.expect(response.order.labels[0]).to.equal('CustomerOrder');
      global.expect(response.relationships[0][0].rel.type).to.equal('REQUEST');
      global.expect(response.relationships[1][0].relA.type).to.equal('CREATED');
    });
  });

  global.xit_('fetches all pending orders', function* anon() {
    yield db.fetchAllPendingOrders(orderInfo.ownerId)
    .then(response => {
      global.expect(response[0].order.labels[0]).to.equal('CustomerOrder');
      global.expect(response[0].order.properties.fulfilled).to.equal(false);
    });
  });

  global.xit_('fetches all completed orders', function* anon() {
    yield db.fetchAllCompletedOrders(orderInfo.ownerId)
    .then(response => {
      global.expect(response[0].order.labels[0]).to.equal('CustomerOrder');
      global.expect(response[0].order.properties.fulfilled).to.equal(true);
    });
  });

  global.xit_('updates orders status', function* anon() {
    yield db.updateOrderStatus(newOrder._id, true)
    .then(response => {
      global.expect(response[0].order.labels[0]).to.equal('CustomerOrder');
      global.expect(response[0].order.properties.fulfilled).to.equal(true);
    });
  });

  global.xit_('updates item quantity on a order', function* anon() {
    yield db.updateItemQtyOnOrder(470, 457, 145)
    .then(response => {
      global.expect(response[0].rel.type).to.equal('REQUEST');
      global.expect(response[0].rel.properties.quantity).to.equal(145);
    });
  });

  global.xit_('can delete an existing menu item', function* anon() {
    yield db.removeItemById(__itemId).then(() => {
      db.getItemById(__itemId).then(resp1 => {
        global.expect(resp1).to.equal('Item does not exist');
      });
    });
  });
});

global.describe('The Package Database', () => {
  const app = global.TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  const newPackage = {
    name: 'Fast Delivery',
    type: 'delivery',
    cost: 25,
    description: 'Fast and easy',
  };

  global.xit_('can add a Package to the database', function* anon() {
    yield db.createPackage(newPackage)
      .then(response => {
        global.expect(response.labels[0]).to.equal('Package');
        global.expect(response.properties).to.deep.equal(newPackage);
      });
  });
});
