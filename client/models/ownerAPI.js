import fetch from 'isomorphic-fetch';

const OwnerAPI = {};
/**
 * Get all menus for a store (chosen ownerId)
 *
 *  Menu Object {
 *                id,
 *                name,
 *                description,
 *              }
 *
 *
 * @param  {number} - Owner Id
 * @return {Array of Menu Objects}
 */
OwnerAPI.getMenus = (ownerId) =>
  fetch(`/api/menu/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(menus => menus.map(element => ({
    id: element.menu._id,
    name: element.menu.properties.name,
    description: element.menu.properties.description,
  })));

/**
 * Create new Store in DB
 *
 * Store Object {
 *                name: {string},
 *                picture: {string},
 *                address: {string},
 *                slogan: {string},
 *                description: {string}
 *              }
 *
 * @param  {Store Object}
 * @param  {number}
 * @return {Store Object}
 */
OwnerAPI.createStore = (store, ownerId) =>
  fetch('/api/store/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ store, ownerId }),
  })
  .then(data => data.json());
/**
 * Update properties of a Store owned by ownerId
 *
 * Store Object {
 *                name: {string},
 *                picture: {string},
 *                address: {string},
 *                slogan: {string},
 *                description: {string}
 *              }
 *
 * @param  {Store Object}
 * @param  {number}
 * @return {Store Object (extended with id))}
 */
OwnerAPI.updateStore = (newStore, ownerId) =>
  fetch('/api/store/update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newStore, ownerId }),
  })
  .then(data => data.json())
  .then(store => ({
    id: store.store._id,
    name: store.store.properties.name,
    address: store.store.properties.address,
    description: store.store.properties.description,
    slogan: store.store.properties.slogan,
    picture: store.store.properties.picture,
  }));
/**
 * Get Custom object with Store Object(if exists)
 * and Owner Object from db based on Google OAUTH Token
 * that will be in user's session after login
 *
 * Store And Owner Object {
 *                          store: {Store Object [optional]},
 *                          owner: {Owner Object}
 *                        }
 *
 * @param  {string} - Google OAUTH Token
 * @return {Store And Owner Object}
 */
OwnerAPI.getStoreAndOwnerByAuthKey = (sessionId) =>
  fetch('/api/owner/getStoreAndOwnerByAuthKey', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ authKey: sessionId }),
  })
  .then(data => data.json())
  .then(store => {
    //console.log(store);
    return store;
  });

export default OwnerAPI;
