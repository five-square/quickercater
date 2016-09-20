const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const browserify = require('browserify-middleware');
const babelify = require('babelify');
const db = require('./db');

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

  Handles endpoints for Relationship data. Methods served are GET, POST, and DELETE(POST).

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

routes.post('/api/relationships/create', (req, res) => {
  const parentLabel = req.body.parent_label;
  const parentId = req.body.parent_id;
  const relLabel = req.body.rel_label;
  const nodeLabel = req.body.node_label;
  const nodeId = [req.body.node_id];
  db.createRelationship(parentLabel, parentId, relLabel, nodeLabel, nodeId)
  .then(dbData => {
    res.status(201).send(dbData);
  });
});

routes.post('/api/relationships/delete', (req, res) => {
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

routes.get('/api/order/:id', (req, res) => {
  db.findNode('CustomerOrder', req.params.id)
  .then(dbData => {
    if (dbData === 'Node does not exist') {
      const message = 'Order does not exist';
      throw message;
    }
    res.status(200).send(dbData);
  })
  .catch(message => {
    res.status(404).send(message);
  });
});

routes.post('/api/order/create', (req, res) => {
  db.createOrder(req.body)
  .then((dbData) => {
    res.status(201).send(dbData);
  })
  .catch(err => res.status(500).send(err));
});

routes.post('/api/order/delete', (req, res) => {
  db.deleteNode('CustomerOrder', req.body.order_id)
  .then(() => {
    res.status(202).send('Order deleted');
  });
});
/*
  **********************************************************************************************

  Serves an endpoint that initializes the database with dummy data for development.

  !!! DELETES ALL DATA THAT ALREADY EXISTS !!!

  **********************************************************************************************
*/

routes.get('/db_reset', (req, res) => {
  db.reset()
  .then(() => {
    res.status(201).send('Database Reset!');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
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

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  app.listen(serverUrl);
  console.log(`Listening on port ${serverUrl}`);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
