import fetch from 'isomorphic-fetch';

const OwnerAPI = {};

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

OwnerAPI.createStore = (store, ownerId) =>
  fetch('/api/store/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ store, ownerId }),
  })
  .then(data => data.json());

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
    console.log(store);
    return store;
  });

export default OwnerAPI;
