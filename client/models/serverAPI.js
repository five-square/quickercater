import fetch from 'isomorphic-fetch';
import db from '../../server/db.js';

const ServerAPI = {};

ServerAPI.getOwner = (id) => db.findOwner(id);

ServerAPI.getAllOwners = () => db.findAllOwners();

ServerAPI.getAllStores = () => db.findAllStores();

ServerAPI.getMenuByOwner = (ownerId) =>
  fetch(`/api/menu/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(menus =>
    menus.map(element => ({
      id: element.menu._id,
      name: element.menu.properties.name,
      description: element.menu.properties.description,
      item: {
        id: element.item._id,
        name: element.item.properties.name,
        description: element.item.properties.description,
        price: element.item.properties.price,
        picture: element.item.properties.picture,
      },
    }))
  );

export default ServerAPI;
