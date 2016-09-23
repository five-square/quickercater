import fetch from 'isomorphic-fetch';

const CustomerAPI = {};

CustomerAPI.create = (customerInfo) =>
  fetch('/api/customer/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerInfo),
  })
  .then(data => data.json());

export default CustomerAPI;
