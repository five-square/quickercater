const Promise = require('bluebird');

const neo4j = Promise.promisifyAll(require('neo4j'));

const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474' });

const dbInit = module.exports;

/*
  **********************************************************************************************

  Initializes the Neo4j database with dummy data. Nodes are created first, then Relationships.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

dbInit.init = () => Node.cypherAsync({
  query: `
    CREATE (churroco:Owner {
      name: 'Walter',
      phone: '512-456-789',
      email: 'walter@churrocoaustin.com',
      description: 'I love Mexican food',
      auth_key: true
    })
    CREATE (alice:Owner {
      name: 'Alice',
      phone: '555-444-3333',
      email: 'alice@window.com',
      description: 'I love Mexican food',
      auth_key: true
    })
    CREATE (bob:Owner {
      name: 'Bob',
      phone: '555-444-5555',
      email: 'bob@window.com',
      description: 'I love American food',
      auth_key: 'ya29.Ci9qAxZIA7hXRvO68DYxb45faKUCweuu2YrGawMJzrH1LZ_U8ia_8GCw52jdmgS8CQ'
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

    CREATE (churrocoDelivery:Package {
      name: 'Delivery',
      type: 'Delivery',
      cost: 25,
      description: 'Where we deliver the churros in aluminum catering 
      casseroles with large squeezable dipping sauce containers so that 
      guests can serve themselves.  All disposable plates, utensils and 
      napkins are included.  Our order minimum for self-serve catering 
      is 40 orders.  This is a more cost effective option and is perfect 
      for an informal setting. Delivery service is available with this 
      option ($30 delivery fee) or pick-up at our 1620 E. Riverside 
      location.',
      picture: 'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c131.0.817.817/14350609_1070096696419135_1950347763_n.jpg'
    })
    CREATE (churrocoTruck:Package {
      name: 'Truck Service',
      type: 'truck',
      cost: 175,
      description: 'Where we bring the Churro Co. 
      truck on-site and serve your guests fresh and 
      made-to-order.  All disposable plates, utensils,
      and napkins are included.  Our food order minimum 
      for on-site catering is $400.',
      picture: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13721040_194815244266288_87997643_n.jpg'
    })
    CREATE (churrocoOnSite:Package {
      name: 'Pop-up',
      type: 'onSite',
      cost: 250,
      description: 'Where we setup tables indoor or tent & 
      tables when outdoors. All disposable plates, utensils 
      and napkins are included.  Our order minimum for catering 
      events is 75 orders and a $250 service charge.  This setup 
      is ideal for small events with limited parking space or in 
      indoor settings',
      picture: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13597549_899896270133307_1054019507_n.jpg'
    })
    CREATE (aliceDelivery:Package {
      name: 'Delivery',
      type: 'delivery',
      cost: 25,
      description: 'Fast and easy',
      picture: 'http://placehold.it/500x500'
    })
    CREATE (aliceTruck:Package {
      name: 'Food Truck',
      type: 'truck',
      cost: 15,
      description: 'Fast and friendly',
      picture: 'http://placehold.it/500x500'
    })
    CREATE (aliceOnSite:Package {
      name: 'On-site',
      type: 'onSite',
      cost: 75,
      description: 'The whole enchilada',
      picture: 'http://placehold.it/500x500'
    })
    CREATE (bobDelivery:Package {
      name: 'Delivery',
      type: 'delivery',
      cost: 20,
      description: 'Slow and steady',
      picture: 'http://placehold.it/500x500'
    })
    CREATE (bobTruck:Package {
      name: 'Food Truck',
      type: 'truck',
      cost: 10, 
      description: 'Slow and friendly',
      picture: 'http://placehold.it/500x500'
    })
    CREATE (bobOnSite:Package {
      name: 'On-site',
      type: 'onSite',
      cost: 50,
      description: 'The whole tamale',
      picture: 'http://placehold.it/500x500'
    })

    CREATE (churrocoMenu1:Menu {
      name: 'Dessert',
      description: 'Churros'
    })
    CREATE (churrocoMenu2:Menu {
      name: 'Drinks',
      description: 'Beverages'
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

     CREATE (churrocoDessert1:Item {
      name: 'Traditional',
      description: 'Two perfectly crisp Churros tossed in 
      cinnamon sugar with chocolate, cajeta (Mexican caramel), 
      or Nutella pudding dipping sauce.',
      price: 3.50,
      picture: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13715040_326040884452556_457676957_n.jpg'
    })
     CREATE (churrocoDessert2:Item {
      name: 'CampFire',
      description: 'Churros tossed in graham cracker sugar, 
      topped with Mexican chocolate sauce, whipped cream and 
      torched marshmallows.',
      price: 4.50,
      picture: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13525481_1234141436618615_1351678132_n.jpg'
    })
     CREATE (churrocoDessert3:Item {
      name: 'Rico Suave',
      description: 'Churros tossed in cacao sugar, 
      topped with Nutella pudding sauce, strawberry 
      jam and coconut shavings.',
      price: 4.50,
      picture: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/13269377_1544291182541276_95242449_n.jpg'
    })
    CREATE (churrocoDrink1:Item {
      name: 'Mexican Hot Coffee',
      description: 'Fresh brew',
      price: 2.50,
      picture: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/12224233_778543398941501_1584959805_n.jpg'
    })
    CREATE (churrocoDrink2:Item {
      name: 'Orange Float',
      description: 'Orange Float – Vanilla Ice Cream, 
      Whipped Cream, Orange Crystals.',
      price: 4.00,
      picture: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13385733_1720230928243599_1915712816_n.jpg'
    })
    CREATE (churrocoDrink3:Item {
      name: 'Coke Float',
      description: 'Coke Float – Vanilla Ice Ceam, Whipped Cream, 
      Cherry Dust.',
      price: 4.00,
      picture: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13277506_699763656831565_527664650_n.jpg'
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
      picture: false
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
      picture: false
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

    CREATE (churrocoStore:Store {
      name: 'Churro Co.',
      picture: 'http://churrocoaustin.com/wp-content/uploads/2014/12/ChurrCoLogoSalmon144x144.png',
      address: '1620 E. Riverside Dr.',
      slogan: "Smile, it's Churro time!",
      description: 'Sweet stuff'
    })
    CREATE (aliceStore:Store {
      name: 'Casa de Alice',
      picture: false,
      address: '123 YourMom Rd.',
      slogan: "I'll make all your wildest dreams come true",
      description: 'Not a house of prostitution, but we have nice chicharrones.'
    })
    CREATE (bobStore:Store {
      name: "Bob's Burger Hole",
      picture: false,
      address: '123 YourMom Blvd.',
      slogan: 'Fill up those buns and put a burger in your hole!',
      description: 'Also, not a house of prostitution, but our buns are soft'
    })

    CREATE (danOrder1:CustomerOrder {
      name: 'Churro Delivery',
      created_on: 'yesterday',
      request_date: 'tomorrow',
      fulfilled: false,
      total_price: 0,
      address: '321 RightBehindYou Ln.'
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

    CREATE (churroco)-[:CAN_EDIT]->(churrocoDelivery)
    CREATE (churroco)-[:CAN_EDIT]->(churrocoTruck)
    CREATE (churroco)-[:CAN_EDIT]->(churrocoOnSite)
    CREATE (alice)-[:CAN_EDIT]->(aliceDelivery)
    CREATE (alice)-[:CAN_EDIT]->(aliceTruck)
    CREATE (alice)-[:CAN_EDIT]->(aliceOnSite)
    CREATE (bob)-[:CAN_EDIT]->(bobDelivery)
    CREATE (bob)-[:CAN_EDIT]->(bobTruck)
    CREATE (bob)-[:CAN_EDIT]->(bobOnSite)

    CREATE (churroco)-[:CAN_EDIT {order: 0}]->(churrocoMenu1)
    CREATE (churroco)-[:CAN_EDIT {order: 1}]->(churrocoMenu2)
    CREATE (alice)-[:CAN_EDIT {order: 0}]->(aliceMenu1)
    CREATE (alice)-[:CAN_EDIT {order: 1}]->(aliceMenu2)
    CREATE (alice)-[:CAN_EDIT {order: 2}]->(aliceMenu3)
    CREATE (alice)-[:CAN_EDIT {order: 3}]->(aliceMenu4)
    CREATE (bob)-[:CAN_EDIT {order: 0}]->(bobMenu1)
    CREATE (bob)-[:CAN_EDIT {order: 1}]->(bobMenu2)
    CREATE (bob)-[:CAN_EDIT {order: 2}]->(bobMenu3)
    CREATE (bob)-[:CAN_EDIT {order: 3}]->(bobMenu4)

    CREATE (churrocoMenu1)-[:CAN_EDIT {order: 0}]->(churrocoDessert1)
    CREATE (churrocoMenu1)-[:CAN_EDIT {order: 1}]->(churrocoDessert2)
    CREATE (churrocoMenu1)-[:CAN_EDIT {order: 2}]->(churrocoDessert3)
    CREATE (churrocoMenu2)-[:CAN_EDIT {order: 0}]->(churrocoDrink1)
    CREATE (churrocoMenu2)-[:CAN_EDIT {order: 1}]->(churrocoDrink2)
    CREATE (churrocoMenu2)-[:CAN_EDIT {order: 2}]->(churrocoDrink3)
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

    CREATE (churroco)-[:CAN_EDIT]->(churrocoStore)
    CREATE (alice)-[:CAN_EDIT]->(aliceStore)
    CREATE (bob)-[:CAN_EDIT]->(bobStore)

    CREATE (dan)-[:CREATED {created_on: 'yesterday', expires: 'today'}]->(danOrder1)
    CREATE (danOrder1)-[:VIEW]->(dan)
    CREATE (danOrder1)-[:REQUEST {quantity: 25}]->(churrocoDrink1)
    CREATE (danOrder1)-[:REQUEST {quantity: 25}]->(churrocoDrink3)
    CREATE (danOrder1)-[:REQUEST {quantity: 50}]->(churrocoDessert1)
    CREATE (danOrder1)-[:REQUEST {quantity: 50}]->(churrocoDessert2)
    CREATE (danOrder1)-[:REQUEST {quantity: 50}]->(churrocoDessert3)
    CREATE (danOrder1)-[:REQUEST]->(churrocoTruck)
    CREATE (danOrder1)-[:VIEW]->(churroco)
    CREATE (churroco)-[:CAN_EDIT]->(danOrder1)
    CREATE (carly)-[:CREATED {created_on: 'yesterday', expires: 'today'}]->(carlyOrder2)
    CREATE (carlyOrder2)-[:VIEW]->(carly)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 25}]->(aliceDrink1)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 25}]->(aliceDrink3)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 50}]->(aliceSide1)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 50}]->(aliceMain1)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 50}]->(aliceDessert1)
    CREATE (carlyOrder2)-[:REQUEST]->(aliceDelivery)
    CREATE (carlyOrder2)-[:VIEW]->(alice)
    CREATE (carly)-[:CREATED {created_on: 'yesterday', expires: 'tomorrow'}]->(carlyOrder1)
    CREATE (carlyOrder1)-[:VIEW]->(carly)
    CREATE (carlyOrder1)-[:VIEW]->(bob)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 100}]->(bobDrink3)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 100}]->(bobSide1)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 100}]->(bobMain3)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 100}]->(bobDessert1)
    CREATE (carlyOrder1)-[:REQUEST]->(bobTruck)`,
});

dbInit.clearRelationships = () => Node.cypherAsync({
  query: `
    MATCH ()-[r]-()
    DELETE r`,
});

dbInit.clearNodes = () => Node.cypherAsync({
  query: `
    MATCH (n)
    DELETE n`,
});

dbInit.reset = () => dbInit.clearRelationships()
  .then(() => dbInit.clearNodes())
  .then(() => dbInit.init());
