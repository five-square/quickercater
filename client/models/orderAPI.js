import fetch from 'isomorphic-fetch';

const orderAPI = {};
/**
 * Get pending orders by ownerId (of store)
 * (pending orders => (or:CustomerOrder)-[VIEW]->(ow:Owner))
 *
 * Order Object {
 *                address: {string},
 *                total_price: {number},
 *                created_on: {string},
 *                request_date: {string},
 *                fulfilled: {boolean}
 *                name: {string}
 *              }
 *
 *
 * @param  {number}
 * @return {Array of Order Objects}
 */
orderAPI.fetchPendingOrders = (ownerId) =>
  fetch(`/api/order/getAllPending/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => resp.json());


/**
 * Get accepted orders by ownerId (of store)
 * (accepted orders => (or:CustomerOrder)<-[CAN_EDIT]-(ow:Owner))
 *
 * Order Object {
 *                address: {string},
 *                total_price: {number},
 *                created_on: {string},
 *                request_date: {string},
 *                fulfilled: {boolean}
 *                name: {string}
 *              }
 *
 *
 * @param  {number}
 * @return {Array of Order Objects}
 */
orderAPI.fetchAcceptedOrders = (ownerId) =>
fetch(`/api/order/getAllAccepted/${ownerId}`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
}).then(resp => resp.json());

/**
 * Get custom 'Order Details' object which includes:
 *        1) List of items
 *        2) Customer details
 *        3) Package selected
 *
 * Order Details Object {
 *                        items: {array of items},
 *                        customer: {Customer Object},
 *                        package: package object (extended with 'id')
 *                      }
 *
 * Order Object {
 *                address: {string},
 *                total_price: {number},
 *                created_on: {string},
 *                request_date: {string},
 *                fulfilled: {boolean}
 *                name: {string}
 *              }
 *
 * @param  {number} - Order ID
 * @return {Order Details Object}
 */
orderAPI.fetchOrderDetails = (orderId) =>
  fetch(`/api/order/${orderId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => resp.json()).then(orderItemRel => {
    const orderObj = Object.assign({}, orderItemRel[0].order.properties,
                                  { id: orderItemRel[0].order._id });
    const items = orderItemRel.map(dbObj =>
     Object.assign({}, dbObj.item.properties,
        { id: dbObj.item._id,
         quantity: dbObj.relA.properties.quantity,
         total: dbObj.relA.properties.quantity * dbObj.item.properties.price })
    );
    console.log('orderItemRel: ', orderItemRel);
    let pack = null;
    if (orderItemRel[0].package) {
      pack = Object.assign({}, orderItemRel[0].package.properties,
                                { id: orderItemRel[0].package._id });
    }

    const result = { items,
                    order: orderObj,
                    customer: orderItemRel[0].customer.properties,
                    package: pack };
    return result;
  });

/**
 * Get completed orders by ownerId (of store)
 * (completed orders => (or:CustomerOrder)-[COMPLETE]-(ow:Owner))
 *
 * Order Object {
 *                address: {string},
 *                total_price: {number},
 *                created_on: {string},
 *                request_date: {string},
 *                fulfilled: {boolean}
 *                name: {string}
 *              }
 *
 *
 * @param  {number}
 * @return {Array of Order Objects}
 */
orderAPI.fetchCompletedOrders = (ownerId) =>
      fetch(`/api/order/getAllCompletedOrders/${ownerId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(resp => resp.json());


/**
 * Set an order to 'accepted' in db by order Id
 *
 * @param  {number}
 * @return {<none>}
 */
orderAPI.createAcceptOrderRelationship = (acceptedOrderId) =>
  fetch('/api/order/accepted/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId: acceptedOrderId }),
  })
  .then(resp => resp.json());

/**
 * Set an order to 'completed' in db by order Id
 *
 * @param  {number}
 * @return {<none>}
 */
orderAPI.createFulfilledOrderRelationship = (fulfilledOrderId) =>
  fetch('/api/order/fulfilled/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId: fulfilledOrderId }),
  })
  .then(resp => resp.json());
/**
 * Delete an order that is rejected by Store owner
 *
 * @param  {number}
 * @return {<none>}
 */
orderAPI.deleteRejectedOrder = (rejectedOrderId) =>
  fetch('/api/order/delete/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId: rejectedOrderId }),
  })
  .then(resp => resp.json());

/**
 * Change details of an accepted order
 *
 * @param  {Order Object}
 * @param  {List of Item Objects}
 * @param  {List of Item Objects}
 * @return {Order Object}
 */
orderAPI.updateOrder = (order, items, removedItems) =>
  fetch('/api/order/update/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order, items, removedItems }),
  })
  .then(resp => resp.json());

/**
 * Create new order in db
 *
 * Order Object {
 *                address: {string},
 *                total_price: {number},
 *                created_on: {string},
 *                request_date: {string},
 *                fulfilled: {boolean}
 *                name: {string}
 *              }
 *
 * @param  {Order Object}
 * @return {Order Object}
 */
orderAPI.create = (orderInfo) =>
  fetch('/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderInfo),
  })
  .then(data => data.json());

export default orderAPI;
