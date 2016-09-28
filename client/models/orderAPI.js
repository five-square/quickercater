
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
  }).then(resp => resp.json()).catch(e=>console.error(e));

  orderAPI.fetchOrderDetails = (orderId) => 
    fetch(`/api/order/${orderId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json()).then(orderItemRel => {
      var orderObj = Object.assign({},orderItemRel[0].order.properties, { id: orderItemRel[0].order._id} );
      var items = orderItemRel.map( dbObj =>{
        return Object.assign({},dbObj.item.properties, {id: dbObj.item._id, quantity: dbObj.rel.properties.quantity } );
      });
      var result = { items: items, order: orderObj, customer: orderItemRel[0].customer.properties };
     console.log(result);
     
     return result;
    });

export default orderAPI;
