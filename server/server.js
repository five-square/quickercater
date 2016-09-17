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

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

routes.get('/:owner', (req, res) => {
  res.send(req.params.owner);
});

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

  // Neo4J routes
  app.post('/dbtest', (req, res) => {
    db.createOwner(req.body).then((dbData) => {
      console.log('Data response from DB for post', dbData);
      res.status(201).send(dbData);
    });
  });

  app.get('/dbtest', (req, res) => {
    db.getAllNodes().then((dbData) => {
      console.log('Data response from DB for Get', dbData);
      res.status(200).send(dbData);
    });
  });

  app.delete('/dbtest', (req, res) => {
    db.deleteOwner(req.body).then((dbData) => {
      console.log('Data response from DB for Delete', dbData);
      res.status(202).send(dbData);
    });
  });

  // Start the server!
  app.listen(serverUrl);
  console.log(`Listening on port ${serverUrl}`);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
