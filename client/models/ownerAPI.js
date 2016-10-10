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

OwnerAPI.updateStoreColors = (storeObj) =>
  fetch('/api/store/update/colors', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(storeObj),
  })
  .then(data => data.json())
  .then(store => ({
    id: store.store._id,
    name: store.store.properties.name,
    address: store.store.properties.address,
    description: store.store.properties.description,
    slogan: store.store.properties.slogan,
    picture: store.store.properties.picture,
    banner: store.store.properties.banner,
    type: store.store.properties.type,
    colors: {
      palette: {
        primary1Color: store.store.properties.primary1Color,
        primary2Color: store.store.properties.primary2Color,
        primary3Color: store.store.properties.primary3Color,
        accent1Color: store.store.properties.accent1Color,
        accent2Color: store.store.properties.accent2Color,
        accent3Color: store.store.properties.accent3Color,
        borderColor: store.store.properties.borderColor,
        canvasColor: store.store.properties.canvasColor,
        shadowColor: store.store.properties.shadowColor,
        textColor: store.store.properties.textColor,
        alternateTextColor: store.store.properties.alternateTextColor,
        pickerHeaderColor: store.store.properties.pickerHeaderColor,
      },
    },
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
  .then(storeAndOwner => {
    console.log('in ownerAPI: storeAndOwner', storeAndOwner[0].store === null);

    return storeAndOwner[0].store === null
      ? [{ owner: { id: storeAndOwner[0].owner._id } }]
      : [{
        owner: {
          id: storeAndOwner[0].owner._id,
        },
        store: {
          id: storeAndOwner[0].store._id,
          name: storeAndOwner[0].store.properties.name,
          address: storeAndOwner[0].store.properties.address,
          description: storeAndOwner[0].store.properties.description,
          slogan: storeAndOwner[0].store.properties.slogan,
          picture: storeAndOwner[0].store.properties.picture,
          banner: storeAndOwner[0].store.properties.banner,
          type: storeAndOwner[0].store.properties.type,
          colors: {
            palette: {
              primary1Color: storeAndOwner[0].store.properties.primary1Color,
              primary2Color: storeAndOwner[0].store.properties.primary2Color,
              primary3Color: storeAndOwner[0].store.properties.primary3Color,
              accent1Color: storeAndOwner[0].store.properties.accent1Color,
              accent2Color: storeAndOwner[0].store.properties.accent2Color,
              accent3Color: storeAndOwner[0].store.properties.accent3Color,
              borderColor: storeAndOwner[0].store.properties.borderColor,
              canvasColor: storeAndOwner[0].store.properties.canvasColor,
              shadowColor: storeAndOwner[0].store.properties.shadowColor,
              textColor: storeAndOwner[0].store.properties.textColor,
              alternateTextColor: storeAndOwner[0].store.properties.alternateTextColor,
              pickerHeaderColor: storeAndOwner[0].store.properties.pickerHeaderColor,
            },
          },
        },
      }];
  });

export default OwnerAPI;
