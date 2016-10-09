const Promise = require('bluebird');

const neo4j = Promise.promisifyAll(require('neo4j'));

const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474' });
//
const db = module.exports;

/*
  **********************************************************************************************

  These functions will handle generic nodes and relationships.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

/**
 * Finds node in db by label and id
 * node object :
 *       {
 *        label: {string},
 *         _id: {number},
 *         properties: {object}
 *       }
 * @param  {string} nodelabel
 * @param  {number} nodeId
 * @return {node object}
 */

db.deleteRelationship = (parentLabel, parentId, relLabel, destLabel, destId) =>
  Node.cypherAsync({
    query: `
      MATCH (parent:${parentLabel}) WHERE ID(parent) = {parentId}
      MATCH (dest:${destLabel}) WHERE ID(dest) = {destId}
      MATCH (parent)-[rel:${relLabel}]-(dest)
      DELETE rel`,
    params: {
      parentId,
      destId,
    },
  });

db.findNode = (nodeLabel, nodeId) => Node.cypherAsync({
  query: `
    MATCH (node:${nodeLabel}) WHERE ID(node) = ${nodeId}
    RETURN node`,
  params: {
    id: nodeId,
  },
})
.then(response => {
  if (response.length === 0) {
    const errMessage = 'Node does not exist';
    throw errMessage;
  }
  return response[0].node;
})
.catch(err => err);

/**
 * Deletes node by label and id
 * @param  {string} node label
 * @param  {number} node id
 * @return {<none>}
 */
db.deleteNode = (nodeLabel, nodeId) => Node.cypherAsync({
  query: `
    MATCH (node:${nodeLabel}) WHERE ID(node) = ${nodeId}
    OPTIONAL MATCH (node)-[rel]-()
    DELETE node, rel`,
  params: {
    nodeId,
  },
})
.then(response => response);

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Owner.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/
/**
 * Shape of owner node object:
 * {
  "_id": 3124,
  "labels": [
    "Owner"
  ],
  "properties": {
    "phone": "555-444-5555",
    "name": "Bob",
    "description": "I love American food",
    "auth_key": "ya29.Ci9qAxZIA7hXRvO68DYxb45faKUCweuu2YrGawMJzrH1LZ_U8ia_8GCw52jdmgS8CQ",
    "email": "fivesquare43@gmail.com"
  }
}
 */

// !!! STILL NEEDS TO IMPLEMENT VALIDATION TO AVOID DUPLICATING DATA !!!
/**
 * Creates owner node in db
 * @param  {object} owner object
 * @return {owner node}
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
})
.then(response => response[0].owner);

/**
 * Finds all Owner nodes in database
 * @return {owner node objects}
 */
db.findAllOwners = () => Node.cypherAsync({
  query: 'MATCH (owner:Owner) RETURN owner',
})
.then(response => response.map(e => e.owner));

/**
 * Finds owner node ny store Id
 * @param  {number} storeid
 * @return {owner node object}
 */
db.findOwnerByStoreId = (storeId) => Node.cypherAsync({
  query: `
    MATCH (store:Store) WHERE ID(store) = ${storeId}
    MATCH (owner:Owner)-[:CAN_EDIT]->(store)
    RETURN owner`,
  params: {
    storeId,
  },
})
.then(store => store[0]);

/**
 * Finds owner by Authkey
 * @param  {string} authKey
 * @return {owner node object}
 */
db.findOwnerByAuthKey = (authKey) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE owner.auth_key = ${authKey}
    RETURN owner`,
  params: {
    authKey,
  },
});

/**
 * Updates authKey by a specified ownerid
 * @param  {number} ownerId
 * @param  {string} new authKey
 * @return {owner node object}
 */
db.updateOwnerAuthKey = (ownerId, authKey) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    SET owner.auth_key = "${authKey}"
    RETURN owner`,
  params: {
    ownerId,
    authKey,
  },
});
/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Orders.

  **********************************************************************************************
*/

/**
 * Shape of order node object:
 * "order": {
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
 */

/**
 * Creates order object node in db
 * @param  {object}
 * @return {order node object}
 */
db.createOrder = (order) => Node.cypherAsync({
  query: `
    MERGE (order:CustomerOrder {
      name: {name},
      created_on: {created_on},
      request_date: {request_date},
      start_time: {start_time},
      end_time: {end_time},
      fulfilled: {fulfilled},
      taxes: {taxes},
      total_price: {total_price},
      address: {address}
    }) 
    RETURN order`,
  params: {
    name: order.name,
    created_on: order.created_on,
    request_date: order.request_date,
    start_time: order.start_time,
    end_time: order.end_time,
    fulfilled: order.fulfilled,
    taxes: order.taxes,
    total_price: order.total_price,
    address: order.address,
  },
})
.then(response => response[0].order);



/**
 * Creates new customer node in db
 * @param  {object} customerInfo
 * @return {customer object node}
 */
db.createNewCustomer = (customerInfo) => Node.cypherAsync({
  query: `
    MERGE (customer:Customer {
      name: {name},
      phone: {phone},
      email: {email},
      auth_key: {auth_key}
    }) 
    RETURN customer`,
  params: {
    name: customerInfo.name,
    phone: customerInfo.phone,
    email: customerInfo.email,
    auth_key: customerInfo.auth_key,
  },
})
.then(response => response[0].customer);

/* Assumption here is that an array of item objects [{itemId: , quantity: },..]
is passed in to add to the order*/

/**
 * Adds items to order relationship by orderId, ownerId & items
 * @param  {number} orderId
 * @param  {number} ownerId
 * @param  {array} items
 * @return {node object relationship between order, owner & items}
 */
db.addItemsToOrder = (orderId, items, ownerId) => Node.cypherAsync({
  query: `
    WITH {items} AS itemArray
    UNWIND itemArray AS menuitem
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (item:Item)<-[:CAN_EDIT]-(menu:Menu)<-[:CAN_EDIT]-(owner) WHERE ID(item) = menuitem.id
    MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
    MERGE (order)-[rel:REQUEST {quantity: menuitem.quantity}]->(item)
    RETURN rel`,
  params: {
    orderId,
    items,
    ownerId,
  },
})
.then(response => response);

// Remember to add this {expires: {orderExpiry}}
db.createOrderCustomerRelationship = (orderId, customerId, orderExpiry) => Node.cypherAsync({
  query: `
     MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
     MATCH (customer:Customer) WHERE ID(customer) = ${customerId}
     MERGE (order)<-[relA:CREATED {expires: {orderExpiry}}]-(customer)
     MERGE (order)-[relB:VIEW]->(customer)
     RETURN relA, relB`,
  params: {
    orderId,
    orderExpiry,
    customerId,
  },
})
 .then(response => response);

db.createOrderPackageRelationship = (orderId, packageId) => Node.cypherAsync({
  query: `
     MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
     MATCH (pkg:Package) WHERE ID(pkg) = ${packageId}
     MERGE (order)-[rel:REQUEST]->(pkg)
     RETURN rel`,
  params: {
    orderId,
    packageId,
  },
})
 .then(response => response);

db.createOrderOwnerRelationship = (ownerId, orderId) => Node.cypherAsync({
  query: `
     MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
     MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
     MERGE (owner)<-[relB:VIEW]-(order)
     RETURN relB`,
  params: {
    orderId,
    ownerId,
  },
})
 .then(response => response);
/**
 * Creates order relationship with customer, package & owner
 * @param  {object} orderInfo
 * @return {node object relationship between order, customer & package}
 */
db.createOrderAndRelationships = (orderInfo) => {
  let saveOrder = {};
  return db.createOrder(orderInfo.order)
    .then((orderCreated) => {
      saveOrder = Object.assign({}, orderCreated);
      return Promise.all([db.addItemsToOrder(orderCreated._id, orderInfo.items, orderInfo.ownerId),
        db.createOrderCustomerRelationship(
          orderCreated._id, orderInfo.customer.id, orderInfo.package.expires),
        db.createOrderPackageRelationship(
          orderCreated._id, orderInfo.package.id),
        db.createOrderOwnerRelationship(
          orderInfo.ownerId, orderCreated._id),
        ]);
    })
    .then(response => ({ order: saveOrder, relationships: response }));
};

/**
 * Finds order node in db
 * @param  {number} orderId
 * @return {order node object}
 */
db.fetchOrder = (orderId) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = {orderId}
    MATCH (item:Item)<-[relA:REQ]-(order)
    MATCH (pkg:Package)<-[relB:REQ]-(order)
    MATCH (customer:Customer)<-[relC:VIEW]-(order)
    RETURN order, item, relA, pkg, customer`,
  params: {
    orderId,
  },
})
.then(response => {
  if (response.length === 0) {
    const errMessage = 'Order does not exist';
    throw errMessage;
  }
  return response;
})
.catch(err => err);

/**
 * Gets all pending order nodes by ownerId
 * @param  {number} ownerId
 * @return {order node object}
 */
db.fetchAllPendingOrders = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (order:CustomerOrder)-[rel:VIEW]->(owner)
    OPTIONAL MATCH (order)-[rel1:CAN_EDIT]-(owner)
    WHERE rel1 is null
    RETURN order`,
  params: {
    ownerId,
  },
})
.then(response => response);

/**
 * Finds accepted orders node by ownerId in db
 * @param  {number} ownerId
 * @return {order node object}
 */
db.fetchAllAcceptedOrders = (ownerId) =>
  Node.cypherAsync({
    query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (order:CustomerOrder)-[rel:CAN_EDIT]-(owner)
    RETURN order`,
    params: {
      ownerId,
    },
  }).then(response => response);

/**
 * Assign
 * @param  {[type]}
 * @return {[type]}
 */
db.fetchAllCompletedOrders = (ownerId) =>
  Node.cypherAsync({
    query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (order:CustomerOrder)-[rel:COMPLETE]-(owner)
    RETURN order`,
    params: {
      ownerId,
    },
  }).then(response => response);

/**
 * 
 * @param  {[type]}
 * @return {[type]}
 */
db.changeOrderToFulfilled = (orderInfo) =>
  Node.cypherAsync({
    query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = ${orderInfo.orderId}
    MATCH (order)<-[relA:CAN_EDIT]-(owner:Owner)
    MERGE (owner)<-[relB:COMPLETE]-(order)
    DELETE relA
    RETURN order`,
    params: {
      orderId: orderInfo.orderId,
    },
  }).then(response => response);

db.fetchOrderDetail = (orderId) =>
  Node.cypherAsync({
    query: `MATCH (order:CustomerOrder)-[relA:REQUEST]-(item:Item) WHERE ID(order) = ${orderId}
            MATCH  (order)<-[CREATED]-(customer:Customer)
            OPTIONAL MATCH (order)-[relB:REQUEST]->(package:Package)
            Return order, item,relA,customer,package`,
    params: {
      orderId,
    },
  })
.then(resp => resp);

db.addAcceptedOrder = (orderInfo) =>
  Node.cypherAsync({
    query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = ${orderInfo.orderId}
    MATCH (order)-[relA:VIEW]->(owner:Owner)
    MERGE (owner)-[relB:CAN_EDIT]->(order)
    DELETE relA
    RETURN order`,
    params: {
      orderId: orderInfo.orderId,
    },
  }).then(response => response);

db.deleteOrder = (orderId) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
    OPTIONAL MATCH (order)-[rel]-()
    WITH rel, order, order._id AS order_id
    DELETE order, rel
    RETURN order_id`,
  params: {
    orderId,
  },
})
.then(response => response);

db.updateOrderStatus = (orderId, status) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = {orderId}
    SET order.fulfilled = {status}
    RETURN order`,
  params: {
    orderId,
    status,
  },
})
.then(response => response);

db.updateItemQtyOnOrder = (orderId, itemId, quantity) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = {orderId}
    MATCH (item:Item) WHERE ID(item) = {itemId}
    MATCH (order)-[rel:REQUEST]->(item)
    SET rel.quantity = {quantity}
    RETURN order, rel`,
  params: {
    orderId,
    itemId,
    quantity,
  },
})
.then(response => response);

db.updateOrderTotalPrice = (order) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = {orderId}
    SET order.total_price = {total_price}
    SET order.taxes = {taxes}
    RETURN order`,
  params: {
    orderId: order.id,
    total_price: order.total_price,
    taxes: order.taxes,
  },
})
.then(response => response);

db.updateOrder = (order, items, removedItems) =>
  Promise.all([db.updateOrderTotalPrice(order)]
    .concat(items.map(item => db.updateItemQtyOnOrder(order.id, item.id, item.quantity)))
  )
  .then(response => {
    if (removedItems.length > 0) {
      Promise.all(removedItems
        .map(itemId => db.deleteRelationship('CustomerOrder', order.id, 'REQUEST', 'Item', itemId)
      ));
    }
    return response;
  });

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Menus.

  **********************************************************************************************
*/
/**
 * Shape of menu node object: (example:menu node object)
 * {
    "menu": {
      "_id": 3142,
      "labels": [
        "Menu"
      ],
      "properties": {
        "name": "Drinks",
        "description": "Tasty beverages"
      }
    }
  },
 */

/**
 * Gets menu node by ownerId
 * @param  {number} ownerId
 * @return {menu node object}
 */
db.getMenuByOwnerId = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (owner)-[rel:CAN_EDIT]->(menu:Menu)
    RETURN menu ORDER BY rel.order`,
  params: {
    ownerId,
  },
});

/**
 * Gets item nodes by menuId
 * @param  {number} menuId
 * @return {item node object}
 */
db.getItemsByMenuId = (menuId) => Node.cypherAsync({
  query: `
    MATCH (menu:Menu) WHERE ID(menu) = ${menuId}
    MATCH (menu)-[rel:CAN_EDIT]->(item:Item)
    RETURN item ORDER BY rel.order`,
  params: {
    menuId,
  },
});

/**
 * Adds new item to menu based on menuId
 * @param  {object} obj
 * @return {item array}
 */
db.addNewItemToMenu = (obj) => Node.cypherAsync({
  query: `
    MATCH (menu:Menu) WHERE ID(menu) = ${obj.menuId}
    MATCH (item:Item) WHERE ID(item) = ${obj.itemId}
    CREATE (menu)-[:CAN_EDIT {order: {order}}]->(item)
    RETURN item`,
  params: {
    order: obj.order,
  },
})
.then(item => item[0]);

/**
 * Adds relationship of existing item node to menu
 * @param  {object} object
 * @return {items}
 */
db.addExistingItemToMenu = (obj) => Node.cypherAsync({
  query: `
    MATCH (menu:Menu) WHERE ID(menu) = ${obj.menuId}
    MATCH (owner:Owner)-[rel1:CAN_EDIT]->(item:Item) WHERE ID(item) = ${obj.itemId}
    CREATE (menu)-[:CAN_EDIT {order: {order}}]->(item)
    DELETE rel1
    WITH menu
    MATCH (menu)-[rel2:CAN_EDIT]->(items:Item)
    RETURN items ORDER BY rel2.order`,
  params: {
    order: obj.order,
  },
})
.then(items => items);

db.createMenu = (menuObj) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${menuObj.ownerId}
    CREATE (owner)
    -[:CAN_EDIT {order: {order}}]->
    (menu:Menu {
      name: {name},
      description: {description}
    })
    RETURN menu`,
  params: {
    order: menuObj.order,
    name: menuObj.name,
    description: menuObj.description,
  },
})
.then(menu => menu[0]);

db.deleteMenu = (menuId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner)-[r1:CAN_EDIT]->(menu:Menu)-[r2:CAN_EDIT]->(item:Item)
    WHERE ID(menu) = ${menuId}
    CREATE (owner)-[:CAN_EDIT]->(item)
    DELETE r1, r2, menu`,
  params: {
    menuId,
  },
})
.then(data => data);

db.deleteEmptyMenu = (menuId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner)-[r1:CAN_EDIT]->(menu:Menu)
    WHERE ID(menu) = ${menuId}
    DELETE r1, menu`,
  params: {
    menuId,
  },
})
.then(data => data);

db.prepareMenuForDelete = (menuId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner)-[r1:CAN_EDIT]->(menu:Menu) WHERE ID(menu) = ${menuId}
    MATCH (owner)-[rels:CAN_EDIT]->(menu2:Menu) WHERE rels.order > r1.order
    SET rels.order = rels.order - 1
    RETURN r1, menu`,
  params: {
    menuId,
  },
})
.then(data => data);

db.updateMenu = (menuObj) => Node.cypherAsync({
  query: `
    MATCH (menu:Menu) WHERE ID(menu) = ${menuObj.id}
    SET menu += {name: {name}, description: {description}}
    RETURN menu`,
  params: {
    name: menuObj.name,
    description: menuObj.description,
  },
})
.then(data => data);

db.updateMenuOrder = (menuArray) => Node.cypherAsync({
  query: `
    WITH {menuArray} AS menuArray
    UNWIND menuArray AS menuItem
      MATCH (owner:Owner)-[r:CAN_EDIT]->(menu:Menu) WHERE ID(menu) = menuItem.id
      SET r.order = menuItem.index
    RETURN properties(r), menu ORDER BY r.order`,
  params: {
    menuArray,
  },
})
.then(data => data);

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Stores.

  **********************************************************************************************
*/
/**
 * Shape of store node object : (example:store node object)
 *   {
    "_id": 3172,
    "labels": [
      "Store"
    ],
    "properties": {
      "primary3Color": "#BBDEFB",
      "accent1Color": "#009688",
      "borderColor": "#BDBDBD",
      "address": "1620 E. Riverside Dr.",
      "banner": "http://i.imgur.com/LWHERKH.jpg",
      "accent2Color": "#00796B",
      "description": "Sweet stuff",
      "type": "Dessert",
      "textColor": "#212121",
      "picture": "http://churrocoaustin.com/wp-content/uploads/2014/12/ChurrCoLogoSalmon144x144.png",
      "primary2Color": "#1976D2",
      "name": "Churro Co.",
      "pickerHeaderColor": "#2196F3",
      "accent3Color": "#000000",
      "primary1Color": "#2196F3",
      "alternateTextColor": "#F5F5F5",
      "slogan": "Smile, it's Churro time!",
      "shadowColor": "#000000",
      "canvasColor": "#EEEEEE"
    }
  },
 */
/**
 * Creates a store node object in db
 * @param  {object}
 * store node object:
   {
    _id: {number},
    labels: [
       Store
    ],
    properties: {
      primary3Color: {string},
      accent1Color: {string},
      borderColor: {string},
      address: {string},
      banner: {urlstring},
      accent2Color: {string},
      description: {string},
      type: {string},
      textColor: {string},
      picture: {string},
      primary2Color: {string},
      name: {string},
      pickerHeaderColor: {string},
      accent3Color: {string},
      primary1Color: {string},
      alternateTextColor: {string},
      slogan: {string},
      shadowColor: {string},
      canvasColor: {string}
    }
  },
 * @return {store object node}
 */
db.createStore = (store) => Node.cypherAsync({
  query: `
    MERGE (store:Store {
      name: {name},
      picture: {picture},
      address: {address},
      banner: {banner},
      slogan: {slogan},
      description: {description}
    })
    SET store += {colors}
    RETURN store`,
  params: {
    name: store.name,
    picture: store.picture,
    address: store.address,
    slogan: store.slogan,
    description: store.description,
    banner: store.banner,
    colors: store.colors,
  },
})
.then(response => response[0].store);

/**
 * Updates store node object information by store id
 * @param  {object} store
 * @return {updated store node object}
 */
db.updateStore = (store) => Node.cypherAsync({
  query: `
    MATCH (store:Store) WHERE ID(store) = ${store.id}
    SET store += {
      name: {name}, 
      description: {description}, 
      slogan: {slogan}, 
      picture: {picture}, 
      address: {address},
      banner: {banner}}
    RETURN store`,
  params: {
    name: store.name,
    picture: store.picture,
    address: store.address,
    slogan: store.slogan,
    description: store.description,
    banner: store.banner,
  },
})
.then(stores => stores[0]);

/**
 * Updates colors properties in store node by storeId 
 * @param  {object} store
 * @return {store node object}
 */
db.updateStoreColors = (store) => Node.cypherAsync({
  query: `
    MATCH (store:Store) WHERE ID(store) = ${store.storeId}
    SET store += {colors}
    RETURN store`,
  params: {
    colors: store.colors,
  },
})
.then(stores => stores[0]);

/**
 * Links owner node to store node by ownerId & storeId
 * @param  {number} ownerId
 * @param  {number} storeId
 * @return {array of store and owner node objects}
 */
db.linkOwnerToStore = (ownerId, storeId) => Node.cypherAsync({
  query: `MATCH (o:Owner) WHERE ID(o) = {ownerId}
          MATCH (s:Store) WHERE ID(s) = {storeId}
          MERGE (o)-[:CAN_EDIT]->(s)
          RETURN s,o`,
  params: {
    storeId,
    ownerId,
  },
})
.then(resp => resp);

/**
 * Return all store nodes
 * @return {store node objects}
 */
db.findAllStores = () => Node.cypherAsync({
  query: 'MATCH (stores:Store) RETURN stores',
})
.then(response => response.map(e => e.stores));

/**
 * Gets all store and owner node objects
 * @return {Array of store and owner objects}
 */
db.getAllStoresAndOwners = () => Node.cypherAsync({
  query: `
    MATCH (owner:Owner)-[rel:CAN_EDIT]->(store:Store)
    RETURN store,owner`,
}).then(resp => resp);

/**
 * Finds store node by owner Id
 * @param  {number} ownerId
 * @return {store node object}
 */
db.findStoreByOwnerId = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (owner)-[rel:CAN_EDIT]->(store:Store)
    RETURN store`,
  params: {
    ownerId,
  },
});

/**
 * Finds store and owner nodes by authKey
 * @param  {string} authKey
 * @return {Array of store and owner objects}
 */
db.findStoreAndOwnerByAuthKey = (authKey) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE owner.auth_key = {authKey}
    OPTIONAL MATCH (owner)--(store:Store)
    RETURN store, owner`,
  params: {
    authKey: authKey.authKey,
  },
});
/*****************************************************************
These functions will service the GET, POST, UPDATE, and DELETE
endpoints for items
******************************************************************/
/**
 * Shape of item node object: (example: item node object)
 * {

  "_id": 3167,
  "labels": [
    "Item"
  ],
  "properties": {
    "price": 6.99,
    "name": "Quesadillas",
    "description": "Fresh grilled",
    "picture": false
  }
}
 */
/**
 * Creates an item node object in db
 * @param  {object} itemObj
 * @return {item node object}
 */
db.createItem = (itemObj) => Node.cypherAsync({
  query: `
    MERGE (item:Item {
      name: {name},
      description: {description},
      price: {price},
      picture: {picture}
    }) 
    RETURN item`,
  params: {
    name: itemObj.name,
    description: itemObj.description,
    price: itemObj.price,
    picture: itemObj.picture,
  },
})
.then(response => response[0].item);

/**
 * Gets item node by itemId
 * @param  {number} itemId
 * @return {item node object}
 */
db.getItemById = (itemId) => {
  if (itemId === undefined) {
    throw new Error('Id is undefined');
  } else {
    return Node.cypherAsync({
      query: `
        MATCH (item:Item) 
        WHERE ID(item) = ${itemId}
        RETURN item`,
    })
    .then(response => {
      if (response[0]) {
        return response[0].item;
      }
      return 'Item does not exist';
    });
  }
};

/**
 * Updates item node information by itemId
 * @param  {object} itemObj
 * @return {item node array}
 */
db.updateItem = (itemObj) => Node.cypherAsync({
  query: `
    MATCH (item:Item) WHERE ID(item) = ${itemObj.id}
    SET item += {name: {name}, description: {description}, price: {price}, picture: {picture}}
    RETURN item`,
  params: {
    name: itemObj.name,
    description: itemObj.description,
    price: itemObj.price,
    picture: itemObj.picture,
  },
})
.then(item => item[0]);

/**
 * Deletes item node relationship by itemId then deletes node
 * @param  {number} itemId
 * @return {<none>}
 */
db.deleteItemById = (itemId) => Node.cypherAsync({
  query: `
    MATCH (item:Item)<-[r:CAN_EDIT]-(owner:Owner) WHERE ID(item) = ${itemId}
    DELETE r
    WITH item
    MATCH (item) WHERE size((item)--()) = 0
    DELETE item`,
  params: {
    itemId,
  },
}).then(response => response);

/**
 * Assigns unassigned item nodes to owner by ownerId
 * @param  {number} ownerId
 * @return {item node object}
 */
db.getUnassignedItems = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner)-[rel:CAN_EDIT]->(item:Item) WHERE ID(owner) = ${ownerId}
    RETURN item`,
  params: {
    ownerId,
  },
})
.then(items => items);

/**
 * removes item relationship from menu by itemId
 * @param  {number} itemId
 * @return {<none>}
 */
db.removeItemFromMenu = (itemId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner)-[r1:CAN_EDIT]->(menu:Menu)-[r2:CAN_EDIT]->(item:Item)
    WHERE ID(item) = ${itemId}
    CREATE (owner)-[:CAN_EDIT]->(item)
    DELETE r2`,
  params: {
    itemId,
  },
})
.then(data => data);

//?????????????
/**
 * Prepares an item for removal by itemId
 * @param  {number} itemId
 * @return {[type]}
 */
db.prepareItemForRemove = (itemId) => Node.cypherAsync({
  query: `
    MATCH (menu:Menu)-[r1:CAN_EDIT]->(item:Item) WHERE ID(item) = ${itemId}
    MATCH (menu)-[rels:CAN_EDIT]->(item2:Item) WHERE rels.order > r1.order
    SET rels.order = rels.order - 1
    RETURN r1, item`,
  params: {
    itemId,
  },
})
.then(data => data);

//??????
/**
 * Updates item order
 * @param  {array} itemArray
 * @return {[type]}
 */
db.updateItemOrder = (itemArray) => Node.cypherAsync({
  query: `
    WITH {itemArray} AS itemArray
    UNWIND itemArray AS itemElement
      MATCH (menu:Menu)-[r:CAN_EDIT]->(item:Item) WHERE ID(item) = itemElement.id
      SET r.order = itemElement.index
    RETURN properties(r), item ORDER BY r.order`,
  params: {
    itemArray,
  },
})
.then(data => data);

/*
 **********************************************************************************************
  This functions will create, update, get and delete packages.

 **********************************************************************************************
*/
/**
 *Shape of package node object in database: (example: package node)
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
  * Gets all package nodes by specified owner Id in db
  * @param  {number} ownerId
  * @return {package node object}
  */
db.getAllPackages = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (owner) -[:CAN_EDIT]->(pack:Package)
    RETURN pack
  `,
  params: {
    ownerId,
  },
})
.then(response => response);

/**
 * Creates new package node object for an owner
 * @param  {object} pkg
 * @return {new package node object}
 */
db.createPackage = (pkg) => Node.cypherAsync({
  query: `
    MERGE(pack:Package {
      name: {name},
      type: {type},
      cost: {cost},
      description: {description},
      picture: {picture}
    })
    WITH pack
    MATCH(owner:Owner) WHERE ID(owner) = ${pkg.ownerId}
    MERGE(owner)-[:CAN_EDIT]->(pack)
    RETURN pack`,
  params: {
    name: pkg.name,
    type: pkg.type,
    cost: pkg.cost,
    description: pkg.description,
    picture: pkg.picture,
  },
})
.then(response => response.pack);

/**
 * Deletes package-owner relationship from db
 * @param  {number} packId
 * @return {<none>}
 */
db.deletePack = (packId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner)-[rel:CAN_EDIT]->(pack:Package)
    WHERE ID(pack) = ${packId}
    DELETE rel`,
  params: {
    packId,
  },
})
.then(data => data);

/**
 * Updates package node object properties by package id
 * @param  {object} packObj
 * @return {updated package node object}
 */
db.updatePackage = (packObj) => Node.cypherAsync({
  query: `
    MATCH (pack:Package) WHERE ID(pack) = ${packObj.id}
    SET pack += {
      name: {name},
      description: {description},
      cost: {cost},
      type: {type},
      picture: {picture}
    }
    RETURN pack`,

  params: {
    name: packObj.name,
    description: packObj.description,
    cost: packObj.cost,
    type: packObj.type,
    picture: packObj.picture,
  },
})
.then(pack => pack);

 /* ****************************************************************
 */
/**
 * Shape of owner node object: (example: owner object node)
 * {
  "_id": 3124,
  "labels": [
    "Owner"
  ],
  "properties": {
    "phone": "555-444-5555",
    "name": "Bob",
    "description": "I love American food",
    "auth_key": "ya29.Ci9qAxZIA7hXRvO68DYxb45faKUCweuu2YrGawMJzrH1LZ_U8ia_8GCw52jdmgS8CQ",
    "email": "fivesquare43@gmail.com"
  }
}
 */

/**
 * Finds owner node by email 
 * @param  {string} email
 * @return {owner object node}
 */
db.findOwnerByEmail = (email) => Node.cypherAsync({
  query: `MATCH (owner:Owner) WHERE owner.email = {email}
  RETURN owner`,
  params: {
    email,
  },
})
.then(response => response);
