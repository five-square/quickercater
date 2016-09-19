const Promise = require('bluebird');

const neo4j = Promise.promisifyAll(require('neo4j'));

const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474' });

const db = module.exports;

/*
  **********************************************************************************************

  Initializes the Neo4j database with dummy data. Nodes are created first, then Relationships.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

db.init = () => Node.cypherAsync({
  query: `
    CREATE (alice:Owner {
      name: 'Alice',
      phone: '555-444-3333',
      email: 'alice@window.com',
      description: 'I love American food',
      auth_key: true
    })
    CREATE (bob:Owner {
      name: 'Bob',
      phone: '555-444-5555',
      email: 'bob@window.com',
      description: 'I love Mexican food',
      auth_key: true
    })
    CREATE (carly:Customer {
      name: 'Carly',
      phone: '555-333-5555',
      email: 'carly@window.com',
      auth_key: true
    })
    CREATE (dan:Customer {
      name: 'Dan',
      phone: '555-333-4444',
      email: 'dan@window.com',
      auth_key: false
    })

    CREATE (aliceDelivery:Package {
      name: 'Delivery',
      type: 'delivery',
      cost: 25,
      description: 'Fast and easy'
    })
    CREATE (aliceTruck:Package {
      name: 'Food Truck',
      type: 'truck',
      cost: 15,
      description: 'Fast and friendly'
    })
    CREATE (aliceOnSite:Package {
      name: 'On-site',
      type: 'onSite',
      cost: 75,
      description: 'The whole enchilada'
    })
    CREATE (bobDelivery:Package {
      name: 'Delivery',
      type: 'delivery',
      cost: 20,
      description: 'Slow and steady'
    })
    CREATE (bobTruck:Package {
      name: 'Food Truck',
      type: 'truck',
      cost: 10, 
      description: 'Slow and friendly'
    })
    CREATE (bobOnSite:Package {
      name: 'On-site',
      type: 'onSite',
      cost: 50,
      description: 'The whole tamale'
    })

    CREATE (aliceMenu1:Menu {
      name: 'Drinks',
      description: 'Tasty beverages'
    })
    CREATE (aliceMenu2:Menu {
      name: 'Appetizers',
      description: 'Side dishes'
    })
    CREATE (aliceMenu3:Menu {
      name: 'Main',
      description: 'Main entrees'
    })
    CREATE (aliceMenu4:Menu {
      name: 'Desserts',
      description: 'Tasty treats'
    })
    CREATE (bobMenu1:Menu {
      name: 'Drinks',
      description: 'Tasty beverages'
    })
    CREATE (bobMenu2:Menu {
      name: 'Sides',
      description: 'Side orders'
    })
    CREATE (bobMenu3:Menu {
      name: 'Main',
      description: 'Burgers for your hole'
    })
    CREATE (bobMenu4:Menu {
      name: 'Desserts',
      description: 'Tasty treats'
    })

    CREATE (bobDrink1:Item {
      name: 'Tea',
      description: 'Fresh brew',
      price: 1.5,
      picture: false
    })
    CREATE (bobDrink2:Item {
      name: 'Water',
      description: 'Free',
      price: 0,
      picture: false
    })
    CREATE (bobDrink3:Item {
      name: 'Lemonade',
      description: 'Fresh squeezed',
      price: 1.75,
      picture: false
    })
    CREATE (bobSide1:Item {
      name: 'Chips',
      description: 'Freshly bagged',
      price: .99,
      picture: false
    })
    CREATE (bobSide2:Item {
      name: 'Fries',
      description: 'Fresh fried',
      price: .99,
      picture: false
    })
    CREATE (bobSide3:Item {
      name: 'Onion Rings',
      description: 'Fresh fried',
      price: 1.99,
      picture: false
    })
    CREATE (bobMain1:Item {
      name: 'Hamburger',
      description: 'Classic burger',
      price: 2.99,
      picture: true
    })
    CREATE (bobMain2:Item {
      name: 'Cheeseburger',
      description: 'Classic plus cheese',
      price: 3.99,
      picture: false
    })
    CREATE (bobMain3:Item {
      name: 'Double Cheeseburger',
      description: 'Classic plue a whole lotta cheese',
      price: 6.99,
      picture: false
    })
    CREATE (bobDessert1:Item {
      name: 'Milkshake',
      description: 'Order me',
      price: 1.99,
      picture: false
    })
    CREATE (aliceDrink1:Item {
      name: 'Tea',
      description: 'Fresh brew',
      price: 1.5,
      picture: false
    })
    CREATE (aliceDrink2:Item {
      name: 'Water',
      description: 'Free',
      price: 0,
      picture: false
    })
    CREATE (aliceDrink3:Item {
      name: 'Lemonade',
      description: 'Fresh squeezed',
      price: 1.75,
      picture: false
    })
    CREATE (aliceSide1:Item {
      name: 'Chips',
      description: 'Freshly made',
      price: 1.99,
      picture: false
    })
    CREATE (aliceSide2:Item {
      name: 'Nachos',
      description: 'Fresh melted',
      price: 3.99,
      picture: false
    })
    CREATE (aliceSide3:Item {
      name: 'Quesadillas',
      description: 'Fresh grilled',
      price: 6.99,
      picture: false
    })
    CREATE (aliceMain1:Item {
      name: 'Enchilada',
      description: 'Nice and cheesy',
      price: 8.99,
      picture: true
    })
    CREATE (aliceMain2:Item {
      name: 'Carnitas',
      description: 'Nice and beefy',
      price: 10.99,
      picture: false
    })
    CREATE (aliceMain3:Item {
      name: 'Torta',
      description: 'On the go',
      price: 9.99,
      picture: false
    })
    CREATE (aliceDessert1:Item {
      name: 'Churro',
      description: 'Order me',
      price: 3.99,
      picture: false
    })

    CREATE (aliceStore:Store {
      name: "Casa de Alice",
      picture: false,
      address: '123 YourMom Rd.'
    })
    CREATE (bobStore:Store {
      name: "Bob's Burger Hole",
      picture: false,
      address: '123 YourMom Blvd.'
    })

    CREATE (carlyOrder1:CustomerOrder {
      name: 'Burger Delivery',
      created_on: 'yesterday',
      request_date: 'tomorrow',
      fulfilled: false,
      total_price: 0,
      address: '321 RightBehindYou Ln.'
    })
    CREATE (carlyOrder2:CustomerOrder {
      name: 'Mexican Delivery',
      created_on: 'yesterday',
      request_date: 'tomorrow after tomorrow',
      fulfilled: false,
      total_price: 0,
      address: '321 RightBehindYou Ln.'
    })

    CREATE (alice)-[:CAN_EDIT]->(aliceDelivery)
    CREATE (alice)-[:CAN_EDIT]->(aliceTruck)
    CREATE (alice)-[:CAN_EDIT]->(aliceOnSite)
    CREATE (bob)-[:CAN_EDIT]->(bobDelivery)
    CREATE (bob)-[:CAN_EDIT]->(bobTruck)
    CREATE (bob)-[:CAN_EDIT]->(bobOnSite)
    CREATE (alice)-[:CAN_EDIT]->(aliceMenu1)
    CREATE (alice)-[:CAN_EDIT]->(aliceMenu2)
    CREATE (alice)-[:CAN_EDIT]->(aliceMenu3)
    CREATE (alice)-[:CAN_EDIT]->(aliceMenu4)
    CREATE (bob)-[:CAN_EDIT]->(bobMenu1)
    CREATE (bob)-[:CAN_EDIT]->(bobMenu2)
    CREATE (bob)-[:CAN_EDIT]->(bobMenu3)
    CREATE (bob)-[:CAN_EDIT]->(bobMenu4)
    CREATE (aliceMenu1)-[:CAN_EDIT {order: 0}]->(aliceDrink1)
    CREATE (aliceMenu1)-[:CAN_EDIT {order: 1}]->(aliceDrink2)
    CREATE (aliceMenu1)-[:CAN_EDIT {order: 2}]->(aliceDrink3)
    CREATE (bobMenu1)-[:CAN_EDIT {order: 0}]->(bobDrink1)
    CREATE (bobMenu1)-[:CAN_EDIT {order: 1}]->(bobDrink2)
    CREATE (bobMenu1)-[:CAN_EDIT {order: 2}]->(bobDrink3)
    CREATE (aliceMenu2)-[:CAN_EDIT {order: 0}]->(aliceSide1)
    CREATE (aliceMenu2)-[:CAN_EDIT {order: 1}]->(aliceSide2)
    CREATE (aliceMenu2)-[:CAN_EDIT {order: 2}]->(aliceSide3)
    CREATE (bobMenu2)-[:CAN_EDIT {order: 0}]->(bobSide1)
    CREATE (bobMenu2)-[:CAN_EDIT {order: 1}]->(bobSide2)
    CREATE (bobMenu2)-[:CAN_EDIT {order: 2}]->(bobSide3)
    CREATE (aliceMenu3)-[:CAN_EDIT {order: 0}]->(aliceMain1)
    CREATE (aliceMenu3)-[:CAN_EDIT {order: 1}]->(aliceMain2)
    CREATE (aliceMenu3)-[:CAN_EDIT {order: 2}]->(aliceMain3)
    CREATE (bobMenu3)-[:CAN_EDIT {order: 0}]->(bobMain1)
    CREATE (bobMenu3)-[:CAN_EDIT {order: 1}]->(bobMain2)
    CREATE (bobMenu3)-[:CAN_EDIT {order: 2}]->(bobMain3)
    CREATE (aliceMenu4)-[:CAN_EDIT {order: 0}]->(aliceDessert1)
    CREATE (bobMenu4)-[:CAN_EDIT {order: 0}]->(bobDessert1)
    CREATE (alice)-[:CAN_EDIT]->(aliceStore)
    CREATE (bob)-[:CAN_EDIT]->(bobStore)
    CREATE (carly)-[:CREATED {created_on: 'yesterday', expires: 'today'}]->(carlyOrder1)
    CREATE (carlyOrder1)-[:VIEW]->(carly)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 25}]->(aliceDrink1)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 25}]->(aliceDrink3)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 50}]->(aliceSide1)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 50}]->(aliceMain1)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 50}]->(aliceDessert1)
    CREATE (carlyOrder1)-[:REQUEST]->(aliceDelivery)
    CREATE (carlyOrder1)-[:VIEW]->(alice)
    CREATE (alice)-[:CAN_EDIT]->(carlyOrder1)
    CREATE (carly)-[:CREATED {created_on: 'yesterday', expires: 'tomorrow'}]->(carlyOrder2)
    CREATE (carlyOrder2)-[:VIEW]->(carly)
    CREATE (carlyOrder2)-[:VIEW]->(bob)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 100}]->(bobDrink3)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 100}]->(bobSide1)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 100}]->(bobMain3)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 100}]->(bobDessert1)
    CREATE (carlyOrder2)-[:REQUEST]->(bobTruck)
    CREATE (bob)-[:CAN_EDIT]->(carlyOrder2)`,
});

db.clearRelationships = () => Node.cypherAsync({
  query: `
    MATCH ()-[r]-()
    DELETE r`,
});

db.clearNodes = () => Node.cypherAsync({
  query: `
    MATCH (n)
    DELETE n`,
});

db.reset = () => db.clearRelationships()
  .then(() => db.clearNodes())
  .then(() => db.init());

/*
  **********************************************************************************************

  These functions will handle relationships.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

// !!! STILL NEEDS TO IMPLEMENT VALIDATION TO AVOID DUPLICATING DATA !!!
db.createRelationship = (parentLabel, parentProps, relLabel, relProps, destLabel, destPropsArray) =>
  Node.cypherAsync({
    query: `
      WITH destPropsArray AS destProps
      UNWIND destProps AS destProp
      MATCH (parent:{parentLabel} {parentProps}), (dest:{destLabel} {destProp})
      CREATE (parent)-[rel:{relLabel} {relProps}]->(dest)
      RETURN parent, rel, dest`,
    params: {
      parentLabel,
      parentProps,
      relLabel,
      relProps,
      destLabel,
      destPropsArray,
    },
  });

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Owner.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

// !!! STILL NEEDS TO IMPLEMENT VALIDATION TO AVOID DUPLICATING DATA !!!
db.createOwner = (owner) => Node.cypherAsync({
  query: `
    MERGE (owner:Owner {
      name: {name},
      phone: {phone},
      email: {email},
      description: {description},
      auth_key: {auth_key}
    })
    RETURN owner`,
  params: {
    name: owner.name,
    phone: owner.phone,
    email: owner.email,
    description: owner.description,
    auth_key: owner.auth_key,
  },
})
.then(response => response[0].owner);

db.findOwner = (ownerName) => Node.cypherAsync({
  query: 'MATCH (owner:Owner { name: {name} }) RETURN owner',
  params: {
    name: ownerName,
  },
})
.then(response => {
  if (response.length === 0) {
    const errMessage = 'Owner does not exist';
    throw errMessage;
  }
  return response[0].owner;
})
.catch(err => err);

db.deleteOwner = (ownerName) => Node.cypherAsync({
  query: 'MATCH (owner:Owner { name: {name} }) DELETE owner',
  params: {
    name: ownerName,
  },
})
.then(response => response);

// !!! STILL NEEDS TO IMPLEMENT VALIDATION TO AVOID DUPLICATING DATA !!!
db.createOwnerToNodeRelationship = (owner, node, nodeLabel, rel, relLabel) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner {name: {name} })
    MATCH (node:{nodeLabel} {node})
    CREATE (owner)-[rel:{relLabel} {rel}]->(node)
    RETURN owner, rel, node`,
  params: {
    name: owner,
    nodeLabel,
    node,
    relLabel,
    rel,
  },
});

// !!! STILL NEEDS TO IMPLEMENT VALIDATION TO AVOID DUPLICATING DATA !!!
db.createNodeToOwnerRelationship = (owner, node, nodeLabel, rel, relLabel) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner {name: {name} })
    MATCH (node:{nodeLabel} {node})
    CREATE (node)-[rel:{relLabel} {rel}]->(owner)
    RETURN owner, rel, node`,
  params: {
    name: owner,
    nodeLabel,
    node,
    relLabel,
    rel,
  },
});

db.deleteOwnerRelationship = (owner, node, nodeLabel, rel, relLabel) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner {name: {name}})-[rel:{relLabel} {rel}]-(node:{nodeLabel} {node})
    DELETE rel`,
  params: {
    name: owner,
    nodeLabel,
    node,
    relLabel,
    rel,
  },
});

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Orders.


  **********************************************************************************************
*/
// After the submit button is clicked, order is created using the following method
db.createOrder = (order) => Node.cypherAsync({
  query: `
    MERGE (order:Order {
      order_id: 25,
      created_on: {created_on},
      request_date: {request_date},
      fulfilled: {fulfilled},
      total_price: {total_price}
    }) 
    SET order.order_id = ID(order)
    RETURN order`,
  params: {
    created_on: order.created_on,
    request_date: order.request_date,
    fulfilled: order.fulfilled,
    total_price: order.total_price,
  },
})
.then(response => response[0].order);


/* Should we use customer ID?? two customers can have same ID
   After the order is created and an ID is assigned to the order
   create the customer-> order and owner->order relationship
   */
db.createCustOrderOwnerRelationship =
  (orderId, customer, owner, createdOn, expires) => Node.cypherAsync({
    query: `
      MATCH (customer:Customer{name: {customerName}}) 
      MATCH (order:Order) WHERE order.order_id = {orderId} 
      MATCH (owner:Owner{name: {ownerName}})
      CREATE (customer)-[relA:CREATED {created_on: {createdOn}, expires: {expires}}]->(order)
      CREATE (order)-[relB:VIEW]->(customer)
      CREATE (owner)-[relC:CAN_EDIT]->(order)
      RETURN {rel:[relA, relB, relC], orderId: {orderId}}`,
    params: {
      customerName: customer.name,
      ownerName: owner.name,
      orderId,
      createdOn,
      expires,
    },
  });

/* Assumption here is that an array of item objects [{name: , quantity: }..]
is passed in to add to the order*/
db.addItemsToOrder = (orderId, items, owner) => Node.cypherAsync({
  query: `
    WITH {items} AS itemArray
    UNWIND itemArray AS menuitem
    MATCH (item:Item{name: menuitem.name})<-[:CAN_EDIT]-(owner:Owner{name: {ownerName}})
    MATCH (order:Order) WHERE order.order_id = {orderId}
    MERGE (order)-[rel:REQ {quantity: menuitem.quantity}]->(item)
    RETURN rel`,
  params: {
    orderId,
    items,
    ownerName: owner.name,
  },
})
.then(response => response);

db.createOrderRelationships = (order, cust, owner, expires, items) => {
  db.createOrder(order)
    .then((ord) => {
      db.createCustOrderOwnerRelationship(ord.order_id, cust, owner, order.createdOn, expires);
    })
    .then((rel) => {
      db.addItemsToOrder(rel.orderId, items, owner);
    });
};


/*
 **********************************************************************************************
  This functions will create, update, get and delete packages.

 **********************************************************************************************
*/

db.createPackage = (pack) => Node.cypherAsync({
  query: `
    MERGE(pack:Package {
      name: {name},
      type: {type},
      cost: {cost},
      description: {description}
    })
    RETURN package`,
  params: {
    name: pack.name,
    type: pack.type,
    cost: pack.cost,
    description: pack.description,
  },
})
.then(response => response[0].pack);

db.findPackage = (packType) => Node.cypherAsync({
  query: 'MATCH (pack:Package {type: {type}}) RETURN pack',
  params: {
    type: packType,
  },
})
.then(response => {
  if (response.length === 0) {
    const errMessage = 'No package available';
    throw errMessage;
  }
  return response[0].pack;
})
.catch(err => err);

db.deletePackage = (packType) => Node.cypherAsync({
  query: 'MATCH (pack:Package { type: {type} }) DELETE pack',
  params: {
    type: packType,
  },
})
.then(response => response);
