import fetch from 'isomorphic-fetch';

const CustomerAPI = {};

/**
 * Create new customer with post request to REST API
 *
 * CustomerInfo: {
 *                  name: {string},
 *                  phone: {string},
 *                  email: {string} ,
 *                  auth_key: {string}
 *                }
 *
 * @param  {customerInfo Object}
 * @return {customerInfo Object}
 */
CustomerAPI.create = (customerInfo) =>
  fetch('/api/customer/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerInfo),
  })
  .then(data => data.json());
/**
 *  Send an email defined by mailOptions object using Gmail
 *
 * mailOptions {
//   from: {string},
//   to: {string},
//   subject: {string},
//   generateTextFromHTML: {boolean}
//   text: {string}
// };
 * @param  {[mailOptions Object]}
 * @return {success / failure}
 */
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
