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
      auth_key: true
    })
    CREATE (bob:Owner {
      name: 'Bob',
      phone: '555-444-5555',
      email: 'bob@window.com',
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

    CREATE (carlyOrder1:Order {
      created_on: 'yesterday',
      request_date: 'tomorrow',
      fulfilled: false,
      total_price: 0,
      address: '321 RightBehindYou Ln.'
    })
    CREATE (carlyOrder2:Order {
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
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Drinks', order: 0}]->(aliceDrink1)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Drinks', order: 1}]->(aliceDrink2)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Drinks', order: 2}]->(aliceDrink3)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Drinks', order: 0}]->(bobDrink1)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Drinks', order: 1}]->(bobDrink2)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Drinks', order: 2}]->(bobDrink3)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Sides', order: 0}]->(aliceSide1)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Sides', order: 1}]->(aliceSide2)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Sides', order: 2}]->(aliceSide3)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Sides', order: 0}]->(bobSide1)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Sides', order: 1}]->(bobSide2)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Sides', order: 2}]->(bobSide3)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Main', order: 0}]->(aliceMain1)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Main', order: 1}]->(aliceMain2)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Main', order: 2}]->(aliceMain3)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Main', order: 0}]->(bobMain1)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Main', order: 1}]->(bobMain2)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Main', order: 2}]->(bobMain3)
    CREATE (alice)-[:CAN_EDIT {sub_menu: 'Dessert', order: 0}]->(aliceDessert1)
    CREATE (bob)-[:CAN_EDIT {sub_menu: 'Dessert', order: 0}]->(bobDessert1)
    CREATE (alice)-[:CAN_EDIT]->(aliceStore)
    CREATE (bob)-[:CAN_EDIT]->(bobStore)
    CREATE (carly)-[:CREATED {created_on: 'yesterday', expires: 'today'}]->(carlyOrder1)
    CREATE (carlyOrder1)-[:VIEW]->(carly)
    CREATE (alice)-[:CAN_EDIT]->(carlyOrder1)
    CREATE (carly)-[:CREATED {created_on: 'yesterday', expires: 'tomorrow'}]->(carlyOrder2)
    CREATE (carlyOrder2)-[:VIEW]->(carly)
    CREATE (bob)-[:CAN_EDIT]->(carlyOrder2)`,
});

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Owner.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

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
});

db.findOwner = (ownerName) => Node.cypherAsync({
  query: 'MATCH (owner:Owner { name: {name} }) RETURN owner',
  params: {
    name: ownerName,
  },
});

db.deleteOwner = (ownerName) => Node.cypherAsync({
  query: 'MATCH (owner:Owner { name: {name} }) DELETE owner',
  params: {
    name: ownerName,
  },
});

db.createOwnerRelationship = (owner, node, nodeLabel, rel, relLabel) => Node.cypherAsync({
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
