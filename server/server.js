const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const browserify = require('browserify-middleware');
const babelify = require('babelify');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./db');
const dbInit = require('./dbInit');

const configAuth = require('./config/googleCredentials');

const serverUrl = process.env.PORT || 3000;

const routes = express.Router();

const assetFolder = path.join(__dirname, '../client/public');
routes.use(express.static(assetFolder));
routes.use(passport.initialize());
routes.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serializeUser: ', user);
  done(null, user._id);
});

passport.deserializeUser((key, done) => {
  console.log('deserializeUser id: ', key);
  db.findNode('Owner', key)
    .then(user => {
      console.log('deserializeUser: ', user);
      done(null, user);
    });
});

passport.use('google', new GoogleStrategy({
  clientID: configAuth.clientID,
  clientSecret: configAuth.clientSecret,
  callbackURL: configAuth.callbackURL,
},
  (accessToken, refreshToken, profile, done) => {
    console.log('profile: ', profile);
    db.findOwnerByEmail(profile.emails[0].value)
      .then(user => {
        console.log('findOwnerByEmail: ', user);
        if (user.length === 0) {
          const newOwner = {
            name: profile.displayName,
            phone: '',
            email: profile.emails[0].value,
            description: '',
            auth_key: profile.id,
          };
          db.createOwner(newOwner)
            .then(owner => done(null, owner));
        } else {
          done(null, user[0].owner);
        }
      });
  }
));

const isLoggedIn = (req, res, next) => {
  console.log('GET SOME');
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

// routes.use((req, res, next) => {
//   console.log('Route: ', req.url);
//   console.log('In middleware: passport: ', req.session.passport, ' req.user: ', req.user);
//   next();
// });

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

  Handles endpoints for Store data. Methods served are GET, POST, PUT, DELETE.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

routes.get('/api/stores/all', (req, res) => {
  db.findAllStores()
  .then(stores => {
    res.status(200).send(stores);
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

routes.post('/api/menu/item/add', (req, res) => {
  db.addItemToMenu(req.body)
  .then(item => {
    res.status(201).send(item);
  });
});

// routes.post('/api/menu/item/remove', (req, res) => {
//   db.removeitemFromMenu();
// });

routes.delete('/api/menu/:menuId', (req, res) => {
  db.deleteMenu(req.params.menuId)
  .then(() => {
    res.status(202).send('Menu deleted sucessfully');
  })
  .catch(() => {
    res.status(404).send('Menu not deleted');
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

routes.get('/api/order/getAllPending/:ownerId', (req,res) => {
  db.fetchAllPendingOrders(req.params.ownerId).then(pendingOrders => {
    res.send(pendingOrders);
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
  if (req.body && req.body.itemObj) {
    db.createItem(req.body.itemObj).then(item => {
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

routes.post('/api/item/update/:id', (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  if (reqBody && reqBody.itemObj) {
    if (!reqBody.itemObj._id) {
      reqBody.itemObj._id = parseInt(id, 10);
    }
    db.getItemById(id).then(x => {
      if (x) {
        db.updateItem(reqBody.itemObj).then(() => {
          res.end('Item likely updated.');
        });
      } else {
        res.status(404).end('Item ID not found.');
      }
    });
  } else {
    res.status(404).end('Malformed update request. Req.body.itemObj must exist.');
  }
});

routes.delete('/api/item/delete/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.getItemById(id).then(resp => {
    if (resp) {
      db.removeItemById(id).then(x => {
        if (x) {
          res.end(`Deleted itemId: ${id}`);
        } else {
          res.status(404).end(`Item (${id}) not deleted. Curious error.`);
        }
      });
    } else {
      res.end('Item not found.');
    }
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

routes.get('/api/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));


// routes.use('/api/auth/google/callback',
//  passport.authenticate('google', { failureRedirect: '/' }),

routes.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/google' }),
  (req, res) => {
    console.log('req.user: ', req.user);
    console.log('req.session.passport: ', req.session.passport);
    console.log('req.isAuthenticated(): ', req.isAuthenticated());
    res.redirect('/');
  });

routes.get('/api/auth/ownerData',
  (req, res) => {
    console.log('After req.user: ', req.user);
    console.log('req.session.passport: ', req.session.passport);
    console.log('After req.isAuthenticated(): ', req.isAuthenticated());
    if (req.user) res.send('req.user');
    res.send('undefined');
  });

routes.get('/api/auth/logout', (req, res) => {
  console.log('In LogOut: ', req.session.passport);
  // req.session.passport = undefined;
  req.session.destroy(() => {
    req.logout();
    res.clearCookie('connect.sid');
    res.redirect('/');
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

  app.use(session({
    secret: 'keyboard cat',
    cookie: { secure: false, maxAge: (4 * 60 * 60 * 1000) },
    resave: true,
    saveUninitialized: true })
  );    // Parse 'Cookie' request header

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  app.listen(serverUrl);
  console.log(`Listening on port ${serverUrl}`);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
