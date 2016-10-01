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
      'Content-Type':'application/json',
    },
    body: JSON.stringify({store, ownerId}),
  })
  .then(data => data.json())
  .then(db.linkOwnerToStore(store._id, ownerId));

OwnerAPI.getStoreAndOwnerByAuthKey = (sessionId) => 
  fetch('/api/owner/getStoreAndOwnerByAuthKey', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({authKey: sessionId}),
  })
  .then( data => data.json())
  .then( store => { console.log(store); return store});
export default OwnerAPI;