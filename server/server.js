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

routes.get('/api/owner/:owner', (req, res) => {
  db.findOwner(req.params.owner)
  .then(dbData => {
    if (dbData === 'Owner does not exist') {
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

routes.delete('/api/owner/:owner', (req, res) => {
  db.deleteOwner(req.params.owner)
  .then((response) => {
    res.status(202).send(response);
  });
});

routes.put('/api/owner/:owner/relationship', (req, res) => {
  const owner = req.params.owner;
  const node = req.body.node;
  const nodeLabel = req.body.nodeLabel;
  const rel = req.body.rel;
  const relLabel = req.body.relLabel;
  db.createOwnerRelationship(owner, node, nodeLabel, rel, relLabel)
  .then(dbData => {
    res.status(201).send(dbData);
  });
});

routes.post('/api/order/create', (req, res) => {
  const order = req.body.order;
  const customer = req.body.customer;
  const owner = req.body.owner;
  const expires = req.body.expires;
  const items = req.body.items;
  db.createOrderRelationships(order, customer, owner, expires, items)
  .then((dbData) => {
    res.status(201).send(dbData);
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
