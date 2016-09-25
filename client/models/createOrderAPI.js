import fetch from 'isomorphic-fetch';

const CreateOrderAPI = {};

CreateOrderAPI.create = (orderInfo) => {
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

export default CreateOrderAPI;
