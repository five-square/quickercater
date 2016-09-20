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
  var __itemId;
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

  global.xit_('can create an Order', function* anon() {
    yield request(app)
    .post('/api/order/create')
    .send(newOrder)
    .expect(201)
    .expect(response => {
      console.log(response);
    });
  });
/*
  **********************************************************************************************
  These tests are pending until completion of Order creation endpoints
  **********************************************************************************************
*/
  global.xit_('can add a CAN_EDIT relationship between an Owner and an Order', function* anon() {
    yield request(app)
    .post('/api/relationships')
    .send(relPostObj)
    .expect(201)
    .expect(response => {
      console.log(response);
    });
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
  global.xit_('can delete an Order', function* anon() {
    yield request(app)
    .post('/api/order/delete')
    .send(newOrder)
    .expect(202)
    .expect(response => {
      console.log(response);
    });
  });

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
    yield db.deleteRelationship('Owner', newOwner._id, 'CAN_EDIT', 'CustomerOrder', newOrder1._id)
    .then(() => db.deleteNode('Owner', newOwner._id))
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

  // Testing the Order database functions
  const newOrder = {
    name: 'New Order',
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

    global.it_('can create a new menu item and verify created node', function* anon(){
     yield db.createItem({name: 'Feijoada', description: 'Brazilian stew', price: 150, picture: 'picture URL'}).then(response => {
       __itemId = response._id;
       //console.log("res ======",response._id);
       //db.getItemById(44).then(resp=>console.log("=_=",resp));
       db.getItemById(response._id).then(resp => {
           global.expect(resp.properties).to.deep.equal({ name: 'Feijoada', description: 'Brazilian stew', price: 150, picture: 'picture URL' });
       });
     });
  });

  global.it_('can get item by picture url', function* anon(){
    var testObj = {name: 'Feijoada', description: 'Brazilian stew', price: 150, picture: 'picture URL'};
    yield db.getItemByPicture('picture URL').then(resp=>{
      global.expect(resp.properties).to.deep.equal(testObj);
    });
  });

      global.it_('can update an existing menu item', function* anon(){
        var itemObj = {name: 'Super Steak Fingers', description: 'super weird food', price: 0, picture: 'SF pic', _id:__itemId};
          //itemObj._id = temp;
          //itemObj.name = "Faige Juada";
         yield db.updateItem(itemObj).then(resp => {
            //global.expect(resp.properties).to.deep.equal({name: 'Faige Juada', description: 'Brazilian stew', price: 150, picture: 'picture URL' });
          db.getItemById(resp._id).then(resp1 => {
              global.expect(resp1.properties).to.deep.equal(itemObj);
          });
        });  
      });

      global.it_('can delete an existing menu item', function* anon(){
        
        yield db.removeItemById(__itemId).then(resp=>{
          db.getItemById(__itemId).then(resp1=>{
            //console.log("================== ",__itemId);
            global.expect(resp1).to.equal(undefined);
          });
        });
      });



/*
  **********************************************************************************************
  These tests are pending until completion of Item creation functions
  **********************************************************************************************
*/

  global.xit_('adds items to an order', function* anon() {
    yield db.addItemsToOrder(newOrder._id, items, owner._id)
    .then(response => {
      console.log('adding items: ', response);
      global.expect(response[0].rel.type).to.equal('REQ');
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
});
