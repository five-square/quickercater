import fetch from 'isomorphic-fetch';
// Create, Read, Update, Delete
const ItemAPI = {};

ItemAPI.create = (itemObj) =>
  fetch('/api/item/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemObj),
  })
  .then(data => data.json())
  .then(item => {
    console.log('In Item create: ', item._id);
    return ({
      id: item._id,
    });
  });

ItemAPI.getItemsbyId = (itemId) =>
  fetch(`/api/item/${itemId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(items => items.map(element => ({
    id: element.item._id,
    name: element.item.properties.name,
    description: element.item.properties.description,
    price: element.item.properties.price,
    picture: element.item.properties.picture,
  })));

ItemAPI.updateItem = (itemId, itemObj) =>
  fetch(`/api/item/update/${itemId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemObj),
  })
  .then(data => data.json())
  .then(items => items.map(itemElement => ({
    name: itemElement.item.properties.name,
    price: itemElement.item.properties.price,
    description: itemElement.item.properties.description,
    picture: itemElement.item.properties.picture,
  })));

ItemAPI.delete = (itemId) => // needs work
  fetch(`/api/item/delete/${itemId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(item => {
    console.log('In Item delete: ', item);
    return ({
      id: item.item._id,
    });
  });

ItemAPI.remove = (itemId, menuId) => // needs work
  fetch('/api/item/remove', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemId,
      menuId,
    }),
  })
  .then(data => data.json())
  .then(items => items.map(itemElement => ({
    item: {
      id: itemElement.item._id,
      name: itemElement.item.properties.name,
      price: itemElement.item.properties.price,
      description: itemElement.item.properties.description,
      picture: itemElement.item.properties.picture,
    },
    quantity: 1,
  })));

ItemAPI.getUnassignedItems = (ownerId) =>
  fetch(`/api/item/unassigned/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(items => items.map(item => ({
    id: item.item._id,
    name: item.item.properties.name,
    price: item.item.properties.price,
    description: item.item.properties.description,
    picture: item.item.properties.picture,
  })));

export default ItemAPI;
