import fetch from 'isomorphic-fetch';

const MenuAPI = {};

MenuAPI.getItems = (menuId) =>
  fetch(`/api/menu/items/${menuId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(items => items.map(itemElement => ({
    id: itemElement.item._id,
    name: itemElement.item.properties.name,
    price: itemElement.item.properties.price,
    description: itemElement.item.properties.description,
    picture: itemElement.item.properties.picture,
  })));

MenuAPI.removeItem = (menuId, itemId) =>
  fetch('/api/menu/item/remove', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ menuId, itemId }),
  })
  .then(data => data.json())
  .then(items => items.map(itemElement => ({
    id: itemElement.item._id,
    name: itemElement.item.properties.name,
    price: itemElement.item.properties.price,
    description: itemElement.item.properties.description,
    picture: itemElement.item.properties.picture,
  })));

MenuAPI.create = (menuObj) => {
  console.log('in menu api: ', menuObj);
  return fetch('/api/menu/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuObj),
  })
  .then(data => data.json())
  .then(menu => {
    console.log('In Menu.create: ', menu);
    return ({
      id: menu.menu._id,
    });
  });
};

/*
  {
    menuId,
    itemId,
    order
  }
 */
MenuAPI.addItem = (newObj) =>
  fetch('api/menu/item/add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObj),
  })
  .then(data => data.json())
  .then(item => ({
    id: item._id,
  }));

MenuAPI.delete = (menuId) => {
  console.log('in menuAPI: ', menuId);
  return fetch('api/menu/delete', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: menuId }),
  })
  .then(data => data.json())
  .then(data => data);
};

export default MenuAPI;
