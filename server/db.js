const Promise = require('bluebird');

const neo4j = Promise.promisifyAll(require('neo4j'));

const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474' });

const db = module.exports;

/*
  **********************************************************************************************

  These functions will handle generic nodes and relationships.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

db.createRelationship = (parentLabel, parentId, relLabel, destLabel, destIdArray) =>
  Node.cypherAsync({
    query: `
      WITH {destIdArray} AS destIds
      UNWIND destIds AS destId
      MATCH (parent:${parentLabel}) WHERE ID(parent) = {parentId}
      MATCH (dest:${destLabel}) WHERE ID(dest) = destId
      MERGE (parent)-[rel:${relLabel}]->(dest)
      RETURN parent, rel, dest`,
    params: {
      parentId,
      destIdArray,
    },
  });

db.findRelationship = (parentLabel, parentId, relLabel, destLabel, destId) =>
  Node.cypherAsync({
    query: `
      MATCH (parent:${parentLabel}) WHERE ID(parent) = {parentId}
      MATCH (dest:${destLabel}) WHERE ID(dest) = {destId}
      MATCH (parent)-[rel:${relLabel}]-(dest)
      RETURN rel`,
    params: {
      parentId,
      destId,
    },
  });

db.findRelationshipById = (relId) =>
  Node.cypherAsync({
    query: `
      MATCH (rel) WHERE ID(rel) = {id}
      RETURN rel`,
    params: {
      id: relId,
    },
  });

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

db.findAllOwners = () => Node.cypherAsync({
  query: 'MATCH (owner:Owner) RETURN owner',
})
.then(response => response.map(e => e.owner));

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

db.findOwnerByAuthKey = (authKey) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE owner.auth_key = ${authKey}
    RETURN owner`,
  params: {
    authKey,
  },
});

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Orders.

  **********************************************************************************************
*/
db.createOrder = (order) => Node.cypherAsync({
  query: `
    MERGE (order:CustomerOrder {
      name: {name},
      created_on: {created_on},
      request_date: {request_date},
      fulfilled: {fulfilled},
      total_price: {total_price},
      address: {address}
    }) 
    RETURN order`,
  params: {
    name: order.name,
    created_on: order.created_on,
    request_date: order.request_date,
    fulfilled: order.fulfilled,
    total_price: order.total_price,
    address: order.address,
  },
})
.then(response => response[0].order);

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
db.addItemsToOrder = (orderId, items, ownerId) => Node.cypherAsync({
  query: `
    WITH {items} AS itemArray
    UNWIND itemArray AS menuitem
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (item:Item)<-[:CAN_EDIT]-(menu:Menu)<-[:CAN_EDIT]-(owner) WHERE ID(item) = menuitem.itemId
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

db.createOrderPackageRelationship = (orderId, packageId, quantity) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
    MATCH (pkg:Package) WHERE ID(pkg) = ${packageId}
    MERGE (order)-[rel:REQUEST {quantity: {quantity}}]->(pkg)
    RETURN rel`,
  params: {
    orderId,
    packageId,
    quantity,
  },
})
.then(response => response);

db.createOrderAndRelationships = (orderInfo) => {
  var saveOrder = {};
  return db.createOrder(orderInfo.order)
    .then((orderCreated) => {
      saveOrder = Object.assign({}, orderCreated);
      return Promise.all([db.addItemsToOrder(orderCreated._id, orderInfo.items, orderInfo.ownerId),
        db.createOrderCustomerRelationship(
          orderCreated._id, orderInfo.customerId, orderInfo.package.expires),
        db.createOrderPackageRelationship(
          orderCreated._id, orderInfo.package.id, 1),
        db.createRelationship(
          'Owner', orderInfo.ownerId, 'VIEW', 'CustomerOrder', [orderCreated._id]),
        ]);
    })
    .then(response => ({ order: saveOrder, relationships: response }));
};

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

db.fetchAllPendingOrders = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (order:CustomerOrder)-[rel:VIEW]->(owner)
    RETURN order`,
  params: {
    ownerId,
  },
})
.then(response => {return response});

db.fetchAllAcceptedOrders = (ownerId) => {
  Node.cypherAsync({
    query: `
    MATCH (owner:Owner) WHERE ID(owner) = {ownerId}
    MATCH (order:CustomerOrder)-[rel:EDIT]->(owner)
    RETURN order`,
    params: {
      ownerId,
    },
  }).then(response => response);
};


db.fetchAllCompletedOrders = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = {ownerId}
    MATCH (order:CustomerOrder)-[rel:VIEW]->(owner)
    WHERE order.fulfilled = true
    RETURN order`,
  params: {
    ownerId,
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

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Menus.

  **********************************************************************************************
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

db.getItemsByMenuId = (menuId) => Node.cypherAsync({
  query: `
    MATCH (menu:Menu) WHERE ID(menu) = ${menuId}
    MATCH (menu)-[rel:CAN_EDIT]->(item:Item)
    RETURN item ORDER BY rel.order`,
  params: {
    menuId,
  },
});

db.addItemToMenu = (obj) => Node.cypherAsync({
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

db.createStore = (store) => Node.cypherAsync({
  query: `
    MERGE (store:Store {
      name: {name},
      picture: {picture},
      address: {address},
      slogan: {slogan},
      description: {description}
    }) 
    RETURN store`,
  params: {
    name: store.name,
    picture: store.picture,
    address: store.address,
    slogan: store.slogan,
    description: store.description,
  },
})
.then(response => response[0].order);

db.findAllStores = () => Node.cypherAsync({
  query: 'MATCH (stores:Store) RETURN stores',
})
.then(response => response.map(e => e.stores));

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

db.getItemByPicture = (picture) => Node.cypherAsync({
  query: `
    MATCH (item:Item)
    WHERE item.picture = {picture}
    RETURN item`,
  params: {
    picture,
  },
}).then(resp => resp[0].item);

db.updateItem = (itemObj) => {
  const id1 = itemObj._id;
  const itemCopy = Object.assign({}, itemObj);
  delete itemCopy._id;  // don't want to create an '_id' prop (doesn't go both ways)
  return Node.cypherAsync({
    query: `
      MATCH (item:Item)
      WHERE ID(item) = {id}
      SET item = {itemCopy}
      RETURN item`,
    params: {
      id: id1,
      name: itemCopy.name,
      description: itemCopy.description,
      price: itemCopy.price,
      picure: itemCopy.picure,
      itemCopy,
    },
  }).then(response => response[0].item);
};

db.removeItemById = (itemId) => Node.cypherAsync({
  query: `MATCH (i:Item)
          WHERE ID(i) = {id}  
          OPTIONAL MATCH () -[rel]-(i)
          DELETE rel
          DELETE i
          return count(i) as success`,
  params: {
    id: itemId,
  },
}).then(response => response[0].success === 1);

/*
 **********************************************************************************************
  This functions will create, update, get and delete packages.

 **********************************************************************************************
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

db.createPackage = (pkg) => Node.cypherAsync({
  query: `
    MERGE(pack:Package {
      name: {name},
      type: {type},
      cost: {cost},
      description: {description},
      picture: {picture}
    })
    MATCH(owner:Owner) WHERE ID(owner) = {ownerId}
    MERGE(owner) -[:CAN_EDIT]->(pack)
    RETURN pack`,
  params: {
    name: pkg.pack.name,
    type: pkg.pack.type,
    cost: pkg.pack.cost,
    description: pkg.pack.description,
    picture: pkg.pack.picture,
    ownerId: pkg.ownerId,
  },
})
.then(response => response.pack);

 /* ****************************************************************
 */

db.findOwnerByEmail = (email) => Node.cypherAsync({
  query: `MATCH (owner:Owner) WHERE owner.email = {email}
  RETURN owner`,
  params: {
    email,
  },
})
.then(response => response);
