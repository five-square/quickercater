const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const browserify = require('browserify-middleware');
const babelify = require('babelify');
const cookieParser = require('cookie-parser');
const AuthPort = require('authport');
const db = require('./db');
const dbInit = require('./dbInit');
//
const configAuth = require('./config/googleCredentials');

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

function getSignedInUser(req, res, next) {
  const sessionId = req.cookies && req.cookies.sessionId;
  if (!sessionId) {
    // res.status(403).send('Not Authotized');
    res.redirect('/'); // Right now redirects to root, but should do the above
  } else {
    db.findOwnerByAuthKey(sessionId)
      .then(ownerInfo => {
        if (ownerInfo.length === 0) {
          console.log('Invalid Session - no owner found');
          // res.status(403).send('Not Authotized');
          res.redirect('/'); // Right now redirects to root, but should do the above
        } else {
          req.user = ownerInfo;
          next();
        }
      });
  }
}
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

routes.get('/api/storesAndOwners', (req,res)=>{
  db.getAllStoresAndOwners().then(ownerAndStores => {
    res.status(200).send(ownerAndStores);
  });
});

routes.get('/api/stores/all', (req, res) => {
  db.findAllStores()
  .then(stores => {
    res.status(200).send(stores);
  });
});

routes.get('/api/store/:id', (req, res) => {
  db.findStoreByOwnerId(req.params.id)
  .then(dbData => {
    res.status(200).send(dbData);
  });
});

/*
  **********************************************************************************************

  Handles endpoints for Owner data. Methods served are GET, POST, PUT, DELETE.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

routes.get('/api/owner/all', (req, res) => {
  db.findAllOwners()
  .then(dbData => {
    res.status(200).send(dbData);
  });
});

routes.get('/api/owner/store/:id', (req, res) => {
  db.findOwnerByStoreId(req.params.id)
  .then(owner => {
    res.status(200).send(owner);
  });
});

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

routes.post('/api/owner/create', (req, res) => {
  db.createOwner(req.body)
  .then((dbData) => {
    res.status(201).send(dbData);
  });
});

routes.delete('/api/owner/:id', (req, res) => {
  db.deleteNode('Owner', req.params.id)
  .then((response) => {
    res.status(202).send(response);
  });
});

/*
  **********************************************************************************************

  Handles endpoints for Menu data. Methods served are GET, POST, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

routes.get('/api/menu/:ownerId', (req, res) => {
  db.getMenuByOwnerId(req.params.ownerId)
  .then(dbData => {
    res.status(200).send(dbData);
  });
});

routes.put('/api/menu/:ownerId/reorder', (req, res) => {
  console.log(req.body.menuId);
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

routes.put('/api/menu/:ownerId/update', (req, res) => {
  console.log(req.body.menuId);
  db.updateMenu(req.body)
  .then(dbData => {
    res.status(201).send(dbData);
  });
});

routes.get('/api/menu/items/:menuId', (req, res) => {
  db.getItemsByMenuId(req.params.menuId)
  .then(dbData => {
    res.status(200).send(dbData);
  });
});

routes.post('/api/menu/create', (req, res) => {
  console.log(req.body);
  db.createMenu(req.body)
  .then(newMenu => {
    console.log('after DB call: ', newMenu);
    res.status(201).send(newMenu);
  });
});

routes.post('/api/menu/item/add_new', (req, res) => {
  db.addNewItemToMenu(req.body)
  .then(item => {
    res.status(201).send(item);
  });
});

routes.post('/api/menu/item/add_existing', (req, res) => {
  db.addExistingItemToMenu(req.body)
  .then(items => {
    res.status(201).send(items);
  });
});

routes.post('/api/menu/delete', (req, res) => {
  console.log('in server, before db: ', req.body.id);
  db.prepareMenuForDelete(req.body.id)
  .then(() => {
    console.log('after db prepare call: ', req.body);
    db.deleteMenu(req.body.id)
    .then(() => {
      db.getMenuByOwnerId(req.body.ownerId)
      .then(menus => {
        console.log('after db.getMenu call: ', menus);
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

  Handles endpoints for Relationship data. Methods served are GET, POST, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

routes.post('/api/relationship/', (req, res) => {
  const parentLabel = req.body.parent_label;
  const parentId = req.body.parent_id;
  const relLabel = req.body.rel_label;
  const nodeLabel = req.body.node_label;
  const nodeId = [req.body.node_id];
  db.findRelationship(parentLabel, parentId, relLabel, nodeLabel, nodeId)
  .then(dbData => {
    console.log(dbData);
    res.status(200).send(dbData[0]);
  });
});

routes.post('/api/relationship/create', (req, res) => {
  const parentLabel = req.body.parent_label;
  const parentId = req.body.parent_id;
  const relLabel = req.body.rel_label;
  const nodeLabel = req.body.node_label;
  const nodeId = [req.body.node_id];
  db.createRelationship(parentLabel, parentId, relLabel, nodeLabel, nodeId)
  .then(dbData => {
    res.status(201).send(dbData[0]);
  });
});

routes.post('/api/relationship/delete', (req, res) => {
  const parentLabel = req.body.parent_label;
  const parentId = req.body.parent_id;
  const relLabel = req.body.rel_label;
  const nodeLabel = req.body.node_label;
  const nodeId = [req.body.node_id];
  db.deleteRelationship(parentLabel, parentId, relLabel, nodeLabel, nodeId)
  .then(dbData => {
    res.status(202).send(dbData);
  });
});

/*
  **********************************************************************************************

  Handles endpoints for Order data. Methods served are GET, POST, PUT, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
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

routes.get('/api/order/:orderId', (req, res) => {
  // get order info with all req relationships
  db.fetchOrderDetail(req.params.orderId).then(resp => {
    res.send(resp);
  });
});

routes.post('/api/order/accepted', (req, res) => {
  // get order info with all req relationships
  db.addAcceptedOrder(req.body).then(resp => {
    res.send(resp);
  });
});

routes.get('/api/order/getAllPending/:ownerId', (req, res) => {
  db.fetchAllPendingOrders(req.params.ownerId).then(pendingOrders => {
    res.send(pendingOrders);
  });
});

routes.get('/api/order/getAllAccepted/:ownerId', (req, res) => {
  db.fetchAllAcceptedOrders(req.params.ownerId).then(acceptedOrders => {
    res.send(acceptedOrders);
  });
});

routes.get('/api/order/getAllAccepted/:ownerId', (req, res) => {
  db.fetchAllAcceptedOrders(req.params.ownerId).then(acceptedOrders => {
    res.send(acceptedOrders);
  });
});

routes.post('/api/order/create', (req, res) => {
  db.createOrderAndRelationships(req.body)
  .then((dbData) => {
    res.status(201).send(dbData);
  })
  .catch(err => res.status(500).send(err));
});

routes.post('/api/order/delete', (req, res) => {
  db.deleteOrder(req.body.orderId)
  .then((dbData) => {
    res.status(202).send(dbData);
  });
});

routes.post('/api/order/update', (req, res) => {
  db.updateOrder(req.body.order, req.body.items, req.body.removedItems)
  .then((dbData) => {
    res.status(202).send(dbData);
  });
});

/* Create customer end point*/
routes.post('/api/customer/create', (req, res) => {
  db.createNewCustomer(req.body)
  .then((dbData) => {
    res.status(201).send(dbData);
  })
  .catch(err => res.status(500).send(err));
});


/*
  **********************************************************************************************

  Handles endpoints for Item data. Methods served are GET, POST, PUT, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
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

routes.post('/api/item/update', (req, res) => {
  db.updateItem(req.body)
  .then(item => {
    res.status(201).send(item);
  });
});

routes.post('/api/item/remove', (req, res) => {
  const id = parseInt(req.body.itemId, 10);
  db.prepareItemForRemove(id)
  .then(resp1 => {
    if (resp1) {
      db.removeItemFromMenu(id)
      .then(() => {
        db.getItemsByMenuId(req.body.menuId)
        .then(menus => {
          console.log(`Item ${id} Removed`);
          res.status(202).send(menus);
        });
      });
    } else {
      res.status(404).send(`Item ${id} not found.`);
    }
  });
});

routes.put('/api/item/:menuId/reorder', (req, res) => {
  console.log(req.body.itemId);
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

routes.get('/api/package/:ownerId', (req, res) => {
  db.getAllPackages(req.params.ownerId)
  .then((dbData) => {
    res.status(201).send(dbData);
  });
});

routes.post('/api/package/create', (req, res) => {
  db.createPackage(req.body)
 .then((dbData) => {
   res.status(201).send(dbData);
 });
});

routes.post('api/package/delete', (req, res) =>{
  db.deletePack(req.body.packId)
.then((response) => {
    res.status(202).send(response);
  });
});

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
  app.use(bodyParser.json());
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
