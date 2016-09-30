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

OwnerAPI.createStore = (ownerId) => 
  fetch('/api/store/create', {
    method: 'get',
    headers: {
      'Content-Type':'application/json',
    },
  })
  .then(data => data.json())
  .then(newStore => console.log('NewStore: ', newStore));

export default OwnerAPI;
