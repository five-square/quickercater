const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const browserify = require('browserify-middleware');
const babelify = require('babelify');
const cookieParser = require('cookie-parser');
const AuthPort = require('authport');
const db = require('./db');
const dbInit = require('./dbInit');
const nodemailer = require('./nodemailer');
//
const configAuth = process.env.googleClientId
  ? {
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
  }
  : require('./config/googleCredentials');

const serverUrl = process.env.PORT || 3000;

const routes = express.Router();

const assetFolder = path.join(__dirname, '../client/public');
routes.use(express.static(assetFolder));

routes.get('/bundle.js', browserify(path.join(__dirname, '../client/main.js'), {
  transform: [[babelify, { presets: ['es2015', 'react'] }]],
}));

routes.get('/api/tags-example', (req, res) => {
  res.send(['node', 'express', 'browserify', 'mithril']);
});

/* AuthPort Set up */
AuthPort.createServer({
  service: 'google',
  id: configAuth.clientID,
  secret: configAuth.clientSecret,
  scope: ['email', 'profile'],
  redirect_uri: 'http://quickercater.heroku.com',
});

AuthPort.on('auth', (req, res, profile) => {
  db.findOwnerByEmail(profile.data.email)
      .then(user => {
        if (user.length === 0) {
          const newOwner = {
            name: profile.data.name,
            phone: '',
            email: profile.data.email,
            description: '',
            auth_key: profile.token,
          };
          db.createOwner(newOwner)
            .then(ownerDb => {
              res.cookie('sessionId', ownerDb.properties.auth_key);
              res.redirect('/');
            });
        } else {
          db.updateOwnerAuthKey(user[0].owner._id, profile.token)
            .then(ownerInfo => {
              res.cookie('sessionId', ownerInfo[0].owner.properties.auth_key);
              res.redirect('/');
            });
        }
      });
});

/* This is the middleware that would ensure the authentication*/

// function getSignedInUser(req, res, next) {
//   const sessionId = req.cookies && req.cookies.sessionId;
//   if (!sessionId) {
//     // res.status(403).send('Not Authotized');
//     res.redirect('/'); // Right now redirects to root, but should do the above
//   } else {
//     db.findOwnerByAuthKey(sessionId)
//     .then(ownerInfo => {
//       if (ownerInfo.length === 0) {
//         console.log('Invalid Session - no owner found');
//         // res.status(403).send('Not Authotized');
//         res.redirect('/'); // Right now redirects to root, but should do the above
//       } else {
//         req.user = ownerInfo;
//         next();
//       }
//     });
//   }
// }

/*
  **********************************************************************************************

  ROUTING STARTS HERE

  **********************************************************************************************
*/

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

/*
  **********************************************************************************************

  Handles endpoints for Store data. Methods served are GET, POST, PUT, DELETE.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

/**
 * Shape of Store object in database: (example: Store)
 *   {
    "store": {
      "_id": 3116,
      "labels": [
        "Store"
      ],
      "properties": {
        "address": "1620 E. Riverside Dr.",
        "name": "Churro Co.",
        "description": "Sweet stuff",
        "type": "Dessert",
        "slogan": "Smile, it's Churro time!",
        "picture": "http://churrocoaustin.com/wp-content/uploads/2014/12/ChurrCoLogoSalmon144x144.png"
      }
    },
    "owner": {
      "_id": 3066,
      "labels": [
        "Owner"
      ],
      "properties": {
        "phone": "512-456-789",
        "name": "Walter",
        "description": "I love Mexican food",
        "auth_key": true,
        "email": "fivesquare43@gmail.com"
      }
    }
  },
 */

/**

 * Gets all store and owner objects in database
 * Store object:
 *    {
        address: {string},
        name: {string},
        description: {string},
        type: {string},
        slogan: {string},
        picture: {urlstring}
      }
 * Owner Object:
 *    {
        phone: {number},
        name: {string},
        description: {string},
        auth_key: {boolean},
        email: {string}
      }
 * @return {Array of store and owner objects}
 */
routes.get('/api/storesAndOwners', (req, res) => {
  db.getAllStoresAndOwners().then(ownerAndStores => {
    res.status(200).send(ownerAndStores);
  });
});

/**
 * Gets all stores in database
 *  Store object:
 *    {
        address: {string},
        name: {string},
        description: {string},
        type: {string},
        slogan: {string},
        picture: {urlstring}
      }
 * @return {array of store objects}
 */
routes.get('/api/stores/all', (req, res) => {
  db.findAllStores()
  .then(stores => {
    res.status(200).send(stores);
  });
});

/**
 * Gets store by owner ID
 * @param  {number} '/api/store/:id' owner ID
 * @return {array of store object}
 */
routes.get('/api/store/:id', (req, res) => {
  db.findStoreByOwnerId(req.params.id)
  .then(dbData => {
    res.status(200).send(dbData);
  });
});

/**
 * Creates store object in database and relationship to owner
 * @param  {object} store object
 * @param  {number} owner ID
 * @return {Array of store object}
 */
routes.post('/api/store/create', (req, res) => {
// name picture address description slogan
  db.createStore(req.body.store)
  .then(newStore => {
    db.linkOwnerToStore(req.body.ownerId, newStore._id)
    .then(() => {
      res.status(201).send(newStore);
    });
  });
});

/**
 * Updates store object with new property values
 * @param  {object} store object
 * @return {array of store object}
 */
routes.post('/api/store/update', (req, res) => {
  db.updateStore(req.body.newStore)
  .then(store => {
    res.status(201).send(store);
  });
});


routes.put('/api/store/update/colors', (req, res) => {
  db.updateStoreColors(req.body)
  .then(store => {
    res.status(201).send(store);
  });
  // res.status(201).send(req.body);
});

/*
  **********************************************************************************************

  Handles endpoints for Owner data. Methods served are GET, POST, PUT, DELETE.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

/**
* Shape of Owner object in database: (example: Owner)
  {
    "_id": 3066,
    "labels": [
      "Owner"
    ],
    "properties": {
      "phone": "512-456-789",
      "name": "Walter",
      "description": "I love Mexican food",
      "auth_key": true,
      "email": "fivesquare43@gmail.com"
    }
  },
 */

/**
 * Gets all owner objects in database
 * @return {Array of owner objects}
 */
routes.get('/api/owner/all', (req, res) => {
  db.findAllOwners()
  .then(dbData => {
    res.status(200).send(dbData);
  });
});

/**
 * Gets owner object by specified store id
 * @param  {number} store id
 * @return {Array of owner object}
 */
routes.get('/api/owner/store/:id', (req, res) => {
  db.findOwnerByStoreId(req.params.id)
  .then(owner => {
    res.status(200).send(owner);
  });
});

/**
 * Finds owner object by owner and owner ID
 * @param  {string} owner
 * @param  {number} owner ID
 * @return {Array of owner object}
 */
routes.get('/api/owner/:id', (req, res) => {
  db.findNode('Owner', req.params.id)
  .then(dbData => {
    if (dbData === 'Node does not exist') {
      res.status(404).send(dbData);
    } else {
      res.status(200).send(dbData);
    }
  });
});

/**
 * Creates owner object in database
 * owner object:
 * {
      phone: {number},
      name: {string},
      description: {string},
      auth_key: {boolean},
      email: {string}
    }
 * @param  {object}
 * @return {owner object}
 */
routes.post('/api/owner/create', (req, res) => {
  db.createOwner(req.body)
  .then((dbData) => {
    res.status(201).send(dbData);
  });
});

/**
 * Deletes owner object and relationship from database
 * @param  {string} owner
 * @param  {number} owner ID
 * @return {<none>}
 */
routes.delete('/api/owner/:id', (req, res) => {
  db.deleteNode('Owner', req.params.id)
  .then((response) => {
    res.status(202).send(response);
  });
});

/**
 * Gets store object and owner object by authkey
 * @param  {string} authKey
 * @return {Array of store and owner objects}
 */
routes.post('/api/owner/getStoreAndOwnerByAuthKey', (req, res) => {
  db.findStoreAndOwnerByAuthKey(req.body)
  .then(resp => {
    res.send(resp);
  });
});
/*
  **********************************************************************************************

  Handles endpoints for Menu data. Methods served are GET, POST, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

/**
 * Shape of database object: (example: Menu)
 * {
      "menu": {
        "_id": 2808,
        "labels": [
          "Menu"
        ],
        "properties": {
          "name": "Drinks",
          "description": "Tasty beverages"
        }
 * }
 */

/**
 * gets all menus for a specified owner
 * @param  {parameter} '/api/menu/:ownerId' current owner ID
 * @return {array} [array of Menu database objects]
 */

routes.get('/api/menu/:ownerId', (req, res) => {
  db.getMenuByOwnerId(req.params.ownerId)
  .then(dbData => {
    res.status(200).send(dbData);
  });
});

/**
 * updates the order of menus for a specified owner
 * @param  {number} '/api/menu/:ownerId/reorder' current owner ID
 * @param  {object} (req -> [array of objects: {id: menu id, index: index of menu in new array}]
 * @return {array} [array of Menu database objects]
 */

routes.put('/api/menu/:ownerId/reorder', (req, res) => {
  if (req.body.direction === 'UP') {
    db.moveMenuUp(req.body.menuId)
    .then(dbData => {
      res.status(201).send(dbData);
    });
  } else {
    db.moveMenuDown(req.body.menuId)
    .then(dbData => {
      res.status(201).send(dbData);
    });
  }
});

/**
 *Reorders menu objects
 * @param  {object} '/api/menu/reorder' menu object
 * @return {array of menu objects}
 */
routes.put('/api/menu/reorder', (req, res) => {
  db.updateMenuOrder(req.body)
  .then(menus => {
    res.status(201).send(menus);
  });
});

/**
 *Update menu object with new property values
 * @param  {object} menu object
 * @return {array of menu object}
 */
routes.put('/api/menu/:ownerId/update', (req, res) => {
  db.updateMenu(req.body)
  .then(dbData => {
    res.status(201).send(dbData);
  });
});

/**
 * Get item object by specified menu Id
 * @param  {number} menu Id
 * @return {item object}
 */
routes.get('/api/menu/items/:menuId', (req, res) => {
  db.getItemsByMenuId(req.params.menuId)
  .then(dbData => {
    res.status(200).send(dbData);
  });
});

/**
 * Create menu object in database
 * menu object:
 *      {
          name: {string},
          description: {string}
        }
 * @param  {object} menu object
 * @return {array of menu object}
 */
routes.post('/api/menu/create', (req, res) => {
  db.createMenu(req.body)
  .then(newMenu => {
    res.status(201).send(newMenu);
  });
});

/**
 * Adds new item object to database
 * Request object:
 *     {
 *      price: {number},
        name: {string},
        description: {string},
        picture: {imgUrl}
       }
 * @param  {item object}
 * @return {item object}
 */
routes.post('/api/menu/item/add_new', (req, res) => {
  db.addNewItemToMenu(req.body)
  .then(item => {
    res.status(201).send(item);
  });
});

/*
{
  menuId,
  itemId,
  order
}
 */

/**
 * Adds existing item in database to speified menu
 * @param  {object} menu object
 * @return {object}
 */
routes.post('/api/menu/item/add_existing', (req, res) => {
  db.addExistingItemToMenu(req.body)
  .then(items => {
    res.status(201).send(items);
  });
});

/**
 * Delete menu object by specified menu id and owner id
 * @param  {number} menu object id
 * @param  {number} owner object id
 * @return {<none>}
 */
routes.post('/api/menu/delete', (req, res) => {
  db.prepareMenuForDelete(req.body.id)
  .then(() => {
    db.deleteMenu(req.body.id)
    .then(() => {
      db.getMenuByOwnerId(req.body.ownerId)
      .then(menus => {
        res.status(202).send(menus);
      })
      .catch(() => {
        res.status(404).send(JSON.stringify('Menu not deleted'));
      });
    });
  });
});

/**
 * Unassigns item from menu then deletes menu
 * @param  {number} menuId
 * @param  {number} ownerId
 * @return {<none>}
 */
routes.post('/api/menu/delete/empty', (req, res) => {
  db.prepareMenuForDelete(req.body.id)
  .then(() => {
    db.deleteEmptyMenu(req.body.id)
    .then(() => {
      db.getMenuByOwnerId(req.body.ownerId)
      .then(menus => {
        res.status(202).send(menus);
      })
      .catch(() => {
        res.status(404).send(JSON.stringify('Menu not deleted'));
      });
    });
  });
});

/*
  **********************************************************************************************

  Handles endpoints for Order data. Methods served are GET, POST, PUT, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

/**
 * Shape of order object relationship: (example: order)
 * {
    "order": {
      "_id": 3177,
      "labels": [
        "CustomerOrder"
      ],
      "properties": {
        "start_time": "10:00 am",
        "address": "321 RightBehindYou Ln.",
        "total_price": 0,
        "created_on": "yesterday",
        "request_date": "tomorrow after tomorrow",
        "fulfilled": false,
        "end_time": "1:00 pm",
        "name": "Mexican Delivery"
      }
    },
    "item": {
      "_id": 3171,
      "labels": [
        "Item"
      ],
      "properties": {
        "price": 3.99,
        "name": "Churro",
        "description": "Order me",
        "picture": false
      }
    },
    "relA": {
      "_id": 4228,
      "type": "REQUEST",
      "properties": {
        "quantity": 50
      },
      "_fromId": 3177,
      "_toId": 3171
    },
    "customer": {
      "_id": 3125,
      "labels": [
        "Customer"
      ],
      "properties": {
        "phone": "555-333-5555",
        "name": "Carly",
        "auth_key": true,
        "email": "carly@window.com"
      }
    },
    "package": {
      "_id": 3130,
      "labels": [
        "Package"
      ],
      "properties": {
        "cost": 25,
        "name": "Delivery",
        "description": "Fast and easy",
        "type": "delivery",
        "picture": "http://placehold.it/500x500"
      }
    }
  }
 */

// routes.get('/api/order/:id', (req, res) => {
//   db.findNode('CustomerOrder', req.params.id)
//   .then(dbData => {
//     if (dbData === 'Node does not exist') {
//       const message = 'Order does not exist';
//       throw message;
//     }
//     res.status(200).send(dbData);
//   })
//   .catch(message => {
//     res.status(404).send(message);
//   });
// });

/**
 * Gets order object with relationships to customer, package & item
 * @param  {number} orderId
 * @return {Array of order object}
 */
routes.get('/api/order/:orderId', (req, res) => {
  // get order info with all req relationships
  db.fetchOrderDetail(req.params.orderId).then(resp => {
    res.send(resp);
  });
});

/**
 * Sets an order to accepted in database
 * Request object: { orderId: {number} }
 * @param  {object} orderid object
 * @return {<none>}
 */
routes.post('/api/order/accepted', (req, res) => {
  // get order info with all req relationships
  db.addAcceptedOrder(req.body).then(resp => {
    res.send(resp);
  });
});

/**
 * Sets an order to fullfilled in database
 * Request object: { orderId: {number} }
 * @param  {object} orderid object
 * @return {<none>}
 */
routes.post('/api/order/fulfilled', (req, res) => {
  // get order info with all req relationships
  db.changeOrderToFulfilled(req.body).then(resp => {
    res.send(resp);
  });
});

/**
 * Gets all pending orders object for a specified owner
 * @param  {number} ownerId
 * @return {Array of pending order objects}
 */
routes.get('/api/order/getAllPending/:ownerId', (req, res) => {
  db.fetchAllPendingOrders(req.params.ownerId).then(pendingOrders => {
    res.send(pendingOrders);
  });
});

/**
 * Gets all accepted order objects by owner Id
 * @param  {number} ownerId
 * @return {Array of accepted order objects}
 */
routes.get('/api/order/getAllAccepted/:ownerId', (req, res) => {
  db.fetchAllAcceptedOrders(req.params.ownerId).then(acceptedOrders => {
    res.send(acceptedOrders);
  });
});

/**
 * Gets all completed order objects by owner Id
 * @param  {number} ownerId
 * @return {Array of completed order objects}
 */
routes.get('/api/order/getAllCompletedOrders/:ownerId', (req, res) => {
  db.fetchAllCompletedOrders(req.params.ownerId).then(completedOrders => {
    res.send(completedOrders);
  });
});

/**
 * Creates order object relationship to owner, customer and items.
 * Reobject
 *    {
        start_time: {string},
        address: {string},
        total_price: {number},
        created_on: {string},
        request_date: {string},
        fulfilled: {boolean},
        end_time: {string},
        name: {string}
      }
 * @param  {object}
 * @return {Array of objects with relationships}
 */
routes.post('/api/order/create', (req, res) => {
  db.createOrderAndRelationships(req.body)
  .then((dbData) => {
    res.status(201).send(dbData);
  })
  .catch(err => res.status(500).send(err));
});

/**
 * Deletes order by orderId
 * @param  {number} orderId
 * @return {<none>}
 */
routes.post('/api/order/delete', (req, res) => {
  db.deleteOrder(req.body.orderId)
  .then((dbData) => {
    res.status(202).send(dbData);
  });
});

/**
 * Updates order object based on items added or removed
 * @param  {object} order Object
 * @param  {object} item object
 * @param  {object} removed item object
 * @return {Array of order object}
 */
routes.post('/api/order/update', (req, res) => {
  db.updateOrder(req.body.order, req.body.items, req.body.removedItems)
  .then((dbData) => {
    res.status(202).send(dbData);
  });
});

/* Create customer end point*/

/**
 * Creates customer object in database
 * Request object:
 *    {
        phone: {string},
        name: {string},
        auth_key: {string},
        email: {string}
      }
 * @param  {object} customer object
 * @return {customer object}
 */
routes.post('/api/customer/create', (req, res) => {
  db.createNewCustomer(req.body)
  .then((dbData) => {
    res.status(201).send(dbData);
  })
  .catch(err => res.status(500).send(err));
});

/**
 * Creates email object in database
 * { from: {string},
     to: {string},
     subject: {string},
     generateTextFromHTML: {boolean},
     html: {html}
   }
 * @param  {object} email object
 * @return {email object}
 */
routes.post('/api/customer/email', (req, res) => {
  nodemailer.sendConfirmation(req.body)
    .then((resp) => {
      res.status(201).send(resp);
    })
    .catch(err => res.status(500).send(err));
});


/*
  **********************************************************************************************

  Handles endpoints for Item data. Methods served are GET, POST, PUT, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

/**
 *Shape of item object in database: (example: item)
   {
  "_id": 3108,
  "labels": [
    "Item"
  ],
  "properties": {
    "price": 1.75,
    "name": "Lemonade",
    "description": "Fresh squeezed",
    "picture": false
  }
}
 */

/**
 * Creates an item object in database
 * Request object:
 *     {
 *      price: {number},
        name: {string},
        description: {string},
        picture: {imgUrl}
       }
 * @param {item object}
 * @return {item object}
 */
routes.post('/api/item/create', (req, res) => {
  if (req.body.menuId !== null) {
    db.createItem(req.body).then(item => {
      res.status(201).send(item);
    });
  } else {
    res.status(404).end('Body malformed in POST Request: req.body.itemObj must be defined.');
  }
});

/**
 * gets items for a specified id
 * @param  {number} '/api/item/:id' item ID
 * @return {object} [database item object]
 */
routes.get('/api/item/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    db.getItemById(id).then(resp => {
      if (resp) {
        res.send(resp);
      } else {
        res.status(404).end(`Could not get itemId: ${id}`);
      }
    });
  }
});

/**
 * Deletes item from database based on item object id
 * @param  {number} '/api/item/:id' current item id
 * @return {<none>}
 */
routes.delete('/api/item/:id', (req, res) => {
  const id = +req.params.id;
  if (id) {
    db.deleteItemById(id)
    .then(resp => {
      if (resp) {
        res.status(202).send(resp);
      } else {
        res.status(404).end(`Could not get itemId: ${id}`);
      }
    });
  }
});

/**
 * updates the order of items for a specified owner
 * @param  {number} '/api/menu/:ownerId/reorder' current owner ID
 * @param  {object} (req -> [array of objects: {id: menu id, index: index of menu in new array}]
 * @return {array} [array of Menu database objects]
 */
routes.put('/api/item/reorder', (req, res) => {
  db.updateItemOrder(req.body)
  .then(items => {
    res.status(201).send(items);
  });
});


/**
 *Updates item object with new property values
 *Request object:
 *     {
 *      price: {number},
        name: {string},
        description: {string},
        picture: {imgUrl}
       }
 * @return {item object}
 */
routes.post('/api/item/update', (req, res) => {
  db.updateItem(req.body)
  .then(item => {
    res.status(201).send(item);
  });
});

/**
 * Removes item object from a menu by item ID
 *
 * @param  {number} '/api/item/remove' item ID
 * @param  {number} menu ID
 * @return {<none>}
 */
routes.post('/api/item/remove', (req, res) => {
  const id = parseInt(req.body.itemId, 10);
  db.prepareItemForRemove(id)
  .then(resp1 => {
    if (resp1) {
      db.removeItemFromMenu(id)
      .then(() => {
        db.getItemsByMenuId(req.body.menuId)
        .then(menus => {
          res.status(202).send(menus);
        });
      });
    } else {
      res.status(404).send(`Item ${id} not found.`);
    }
  });
});

/**
 *Reorders item object in database based on direction(UP or DOWN)
 *and item ID
 * @param  {number} '/api/item/:menuId/reorder' current item ID
 * @return {array of item Objects}
 */
routes.put('/api/item/:menuId/reorder', (req, res) => {
  if (req.body.direction === 'UP') {
    db.moveItemUp(req.body.itemId)
    .then(dbData => {
      res.status(201).send(dbData);
    });
  } else {
    db.moveItemDown(req.body.itemId)
    .then(dbData => {
      res.status(201).send(dbData);
    });
  }
});

/**
 * Gets items objects by owner ID that are unassigned to a menu
 * @param  {number} '/api/item/unassigned/:ownerId' current owner ID
 * @return {array of item objects}
 */
routes.get('/api/item/unassigned/:ownerId', (req, res) => {
  db.getUnassignedItems(req.params.ownerId)
  .then(items => {
    res.status(200).send(items);
  });
});
/*
  **********************************************************************************************

  Serves an endpoint that initializes the database with dummy data for development.

  !!! DELETES ALL DATA THAT ALREADY EXISTS !!!

  **********************************************************************************************
*/

/**
 * Resets database to original values
 */
routes.get('/db_reset', (req, res) => {
  dbInit.reset()
  .then(() => {
    res.status(201).send('Database Reset!');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

/*
  **********************************************************************************************

  Handles endpoints for Package data. Methods served are GET, POST, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/
/**
 *Shape of package object in database: (example: package)
  {
    "pack": {
      "_id": 3076,
      "labels": [
        "Package"
      ],
      "properties": {
        "cost": 75,
        "name": "On-site",
        "description": "The whole enchilada",
        "type": "onSite",
        "picture": "http://placehold.it/500x500"
      }
    }
  }
 */

/**
 * Gets all packages for a specific owner
 * @param  {number} '/api/package/:ownerId' current owner id
 * @return {array} [array of package database objects]
 */
routes.get('/api/package/:ownerId', (req, res) => {
  db.getAllPackages(req.params.ownerId)
  .then((dbData) => {
    res.status(201).send(dbData);
  });
});

/**
 * Creates a package object in database for a specific owner
 * Request object:
 *     {
 *      cost: {number},
        name: {string},
        description: {string},
        type: {string},
        picture: {imgUrl}
       }
   @param {object}
 * @return {package object}
 */

routes.post('/api/package/create', (req, res) => {
  db.createPackage(req.body)
 .then((dbData) => {
   res.status(201).send(dbData);
 });
});


/**
 * Deletes package from database based on package object id
 * @param  {number} '/api/package/delete/:packId' current package id
 * @return {empty array}
 */
routes.delete('/api/package/delete/:packId', (req, res) => {
  db.deletePack(req.params.packId)
  .then((response) => {
    res.status(202).send(response);
  });
});

/**
 * Updates database package object information with new properties
 * Request Object (from client):
 *    {
 *      cost: {number},
        name: {string},
        description: {string},
        type: {string},
        picture: {imgUrl}
       }
 * @param  {object} '/api/package/update' new properties object
 * @return {updated package object}
 */
routes.post('/api/package/update', (req, res) => {
  db.updatePackage(req.body)
  .then(data => {
    res.status(201).send(data);
  });
});

/* Google SignIn and logout */
routes.get('/auth/:service', AuthPort.app);

routes.get('/api/auth/logout', (req, res) => {
  // req.session.passport = undefined;
  res.clearCookie('sessionId');
  res.redirect('/');
});

/*
  **********************************************************************************************

  Starts the routing decisions for testing and deployment.

  **********************************************************************************************
*/

if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', (req, res) => {
    res.sendFile(`${assetFolder}/index.html`);
  });

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  const app = express();

  // Parse incoming request bodies as JSON
  //
  app.use(bodyParser.json({ limit: '16mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  app.listen(serverUrl);
  console.log(`Listening on port ${serverUrl}`);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
