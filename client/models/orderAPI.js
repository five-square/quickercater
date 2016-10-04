
//
// Get all items and QTYs associated iwth a particular order
// { order: {orderObj}, items: [ {item: itemObj, qty: rel.qty }, ... {...}] }
// make sure to provide properties


import fetch from 'isomorphic-fetch';

const orderAPI = {};

orderAPI.fetchPendingOrders = (ownerId) =>
  fetch(`/api/order/getAllPending/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => resp.json());

orderAPI.fetchAcceptedOrders = (ownerId) =>
fetch(`/api/order/getAllAccepted/${ownerId}`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
}).then(resp => resp.json()).catch(e => console.error(e));

orderAPI.fetchOrderDetails = (orderId) =>
  fetch(`/api/order/${orderId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => resp.json()).then(orderItemRel => {
    console.log('fetchOrderDetails orderItemRel: ', orderItemRel);
    const orderObj = Object.assign({}, orderItemRel[0].order.properties,
                                  { id: orderItemRel[0].order._id });
    const items = orderItemRel.map(dbObj =>
     Object.assign({}, dbObj.item.properties,
        { id: dbObj.item._id,
         quantity: dbObj.relA.properties.quantity,
         total: dbObj.relA.properties.quantity * dbObj.item.properties.price })
    );
    const pack = Object.assign({}, orderItemRel[0].package.properties,
                              { id: orderItemRel[0].package._id });
    const result = { items,
                    order: orderObj,
                    customer: orderItemRel[0].customer.properties,
                    package: pack };
    console.log(result);
    return result;
  });

    orderAPI.fetchCompletedOrders = (ownerId) =>
      fetch(`/api/order/getAllCompletedOrders/${ownerId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(resp => resp.json());


orderAPI.createAcceptOrderRelationship = (acceptedOrderId) =>
  fetch('/api/order/accepted/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId: acceptedOrderId }),
  })
  .then(resp => resp.json());

orderAPI.createFulfilledOrderRelationship = (fulfilledOrderId) =>
  fetch('/api/order/fulfilled/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId: fulfilledOrderId }),
  })
  .then(resp => resp.json());

orderAPI.deleteRejectedOrder = (rejectedOrderId) =>
  fetch('/api/order/delete/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId: rejectedOrderId }),
  })
  .then(resp => resp.json());

orderAPI.updateOrder = (order, items, removedItems) =>
  fetch('/api/order/update/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order, items, removedItems }),
  })
  .then(resp => resp.json());

orderAPI.create = (orderInfo) => {
  console.log('CreateOrderAPI orderInfo: ', orderInfo);
  return fetch('/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderInfo),
  })
  .then(data => data.json());
};

export default orderAPI;
