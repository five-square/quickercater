import fetch from 'isomorphic-fetch';
import db from '../../server/db.js';

const ServerAPI = {};

ServerAPI.getOwner = (id) => db.findOwner(id);

ServerAPI.getAllOwners = () => db.findAllOwners();

ServerAPI.getAllStores = () => db.findAllStores();

ServerAPI.getMenusByOwner = (ownerId) =>
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

ServerAPI.getItemsByMenu = (menuId) =>
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

export default ServerAPI;
