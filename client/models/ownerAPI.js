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
    console.log(storeAndOwner);
    // console.log('in OwnerAPI: ', returnObj);
    return storeAndOwner;
  });

export default OwnerAPI;
