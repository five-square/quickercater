import fetch from 'isomorphic-fetch';
// Create, Recieve, Update, Delete
const ItemAPI = {};

ItemAPI.createItem = (itemObj) =>
  fetch('/api/item/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: itemObj.name,
    description: itemObj.description,
    price: itemObj.price,
    picture: itemObj.picture }),
  })
  .then(data => data.json())
  .then(items => items.map(itemElement => ({
    id: itemElement.item._id,
    name: itemElement.item.properties.name,
    price: itemElement.item.properties.price,
    description: itemElement.item.properties.description,
    picture: itemElement.item.properties.picture,
  })));

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
    body: JSON.stringify({ name: itemObj.name,
    description: itemObj.description,
    price: itemObj.price,
    picture: itemObj.picture }),
  })
  .then(data => data.json())
  .then(items => items.map(itemElement => ({
    name: itemElement.item.properties.name,
    price: itemElement.item.properties.price,
    description: itemElement.item.properties.description,
    picture: itemElement.item.properties.picture,
  })));

ItemAPI.deleteItem = (itemId) => // needs work
  fetch(`/api/item/delete/${itemId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json());
export default ItemAPI;
