const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const browserify = require('browserify-middleware');
const babelify = require('babelify');

const serverUrl = 3000;

const app = express();


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/bundle.js', browserify(path.join(__dirname, '../client/main.js'), {
  transform: [[babelify, { presets: ['es2015', 'react'] }]],
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(serverUrl);
console.log(`Listening on port ${serverUrl}`);
