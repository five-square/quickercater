import fetch from 'isomorphic-fetch';
import db from '../../server/db.js';

const ServerAPI = {};

ServerAPI.getOwner = (id) => db.findOwner(id);

ServerAPI.getAllOwners = () => db.findAllOwners();

ServerAPI.getAllStores = () =>
  fetch('/api/stores/all', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(stores => stores.map(store => ({
    id: store._id,
    name: store.properties.name,
    address: store.properties.address,
    description: store.properties.description,
    slogan: store.properties.slogan,
    picture: store.properties.picture,
    banner: store.properties.banner,
    type: store.properties.type,
    colors: {
      palette: {
        primary1Color: store.properties.primary1Color,
        primary2Color: store.properties.primary2Color,
        primary3Color: store.properties.primary3Color,
        accent1Color: store.properties.accent1Color,
        accent2Color: store.properties.accent2Color,
        accent3Color: store.properties.accent3Color,
        borderColor: store.properties.borderColor,
        canvasColor: store.properties.canvasColor,
        shadowColor: store.properties.shadowColor,
        textColor: store.properties.textColor,
        alternateTextColor: store.properties.alternateTextColor,
        pickerHeaderColor: store.properties.pickerHeaderColor,
      },
    },
  })));

ServerAPI.getStoreByOwner = (ownerId) =>
  fetch(`/api/store/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json());

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

ServerAPI.getOwnerByStoreId = (storeId) =>
  fetch(`/api/owner/store/${storeId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(owner => ({
    id: owner.owner._id,
    name: owner.owner.properties.name,
  }));

ServerAPI.getAllStoresAndOwners = () =>
  fetch('/api/storesAndOwners', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json());

export default ServerAPI;
