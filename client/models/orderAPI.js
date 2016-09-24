// 1. Get Pending & accepted orders
//
//
// 1. Pending orders -- cannot be edited by owner
// 2. Accepted orders -- editable by owner

// Pending order --> accepted
// create rel (owner)-[rel:CAN_EDIT]->(order)

import fetch from 'isomorphic-fetch';

const orderAPI = {};

orderAPI.getPendingOrders = (ownerId) =>
  fetch(`/api/order/getAllPending/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => resp.json());

export default orderAPI;
