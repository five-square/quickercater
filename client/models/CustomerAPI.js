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

CustomerAPI.sendEmail = (mailOptions, ownerId) =>
  fetch('/api/customer/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mailOptions, ownerId }),
  })
  .then(data => data.json());
export default CustomerAPI;
