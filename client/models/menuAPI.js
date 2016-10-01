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
    item: {
      id: itemElement.item._id,
      name: itemElement.item.properties.name,
      price: itemElement.item.properties.price,
      description: itemElement.item.properties.description,
      picture: itemElement.item.properties.picture,
    },
    quantity: 1,
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

MenuAPI.create = (menuObj) =>
  fetch('/api/menu/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuObj),
  })
  .then(data => data.json())
  .then(menu => ({
    id: menu.menu._id,
  }));

/*
  {
    menuId,
    itemId,
    order
  }
 */
MenuAPI.addNewItem = (newObj) =>
  fetch('/api/menu/item/add_new', {
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

MenuAPI.addExistingItem = (itemObj) =>
  fetch('/api/menu/item/add_existing', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemObj),
  })
  .then(data => data.json())
  .then(items => items.map(itemElement => ({
    item: {
      id: itemElement.items._id,
      name: itemElement.items.properties.name,
      price: itemElement.items.properties.price,
      description: itemElement.items.properties.description,
      picture: itemElement.items.properties.picture,
    },
    quantity: 1,
  })));

MenuAPI.deleteWithItems = (menuId, ownerId) =>
  fetch('/api/menu/delete', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: menuId, ownerId }),
  })
  .then(data => data.json())
  .then(menus => menus.map(element => ({
    id: element.menu._id,
    name: element.menu.properties.name,
    description: element.menu.properties.description,
  })));

MenuAPI.deleteEmptyMenu = (menuId, ownerId) =>
  fetch('/api/menu/delete/empty', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: menuId, ownerId }),
  })
  .then(data => data.json())
  .then(menus => menus.map(element => ({
    id: element.menu._id,
    name: element.menu.properties.name,
    description: element.menu.properties.description,
  })));

MenuAPI.move = (direction, menuId, ownerId) =>
  fetch(`/api/menu/${ownerId}/reorder`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      direction,
      menuId,
    }),
  })
  .then(data => data.json());

MenuAPI.edit = (newMenuInfo, ownerId) =>
  fetch(`/api/menu/${ownerId}/update`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMenuInfo),
  })
  .then(data => data.json());

MenuAPI.updateOrder = (menuArray) =>
  fetch('/api/menu/reorder', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuArray.map((menu, index) => ({
      index,
      id: menu.id,
    }))),
  })
  .then(data => data.json())
  .then(menus => menus.map(element => ({
    id: element.menu._id,
    name: element.menu.properties.name,
    description: element.menu.properties.description,
  })));


export default MenuAPI;
