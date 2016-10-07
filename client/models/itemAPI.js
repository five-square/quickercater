import fetch from 'isomorphic-fetch';

const ItemAPI = {};

/**
 * Create a menu item in db
 *
 * ItemObj {
 *          name: {string},
 *          description: {string},
 *          price: {string},
 *          picture: {string},
 *          }
 *
 * @param  {Item Object}
 * @return { Object {id} }
 */
ItemAPI.create = (itemObj) =>
  fetch('/api/item/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemObj),
  })
  .then(data => data.json())
  .then(item => ({
    id: item._id,
  }));


/**
 * Fetch get details of menu item by menuItemId
 *
 * ItemObj {
 *          name: {string},
 *          description: {string},
 *          price: {string},
 *          picture: {string},
 *          }
 *
 * @param  {number}
 * @return {itemObj}
 */
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


/**
 * Update menu item with new itemObj
 *
 * ItemObj {
 *          name: {string},
 *          description: {string},
 *          price: {string},
 *          picture: {string},
 *          }
 *
 * @param  {item object}
 * @return {item object}
 */
ItemAPI.edit = (itemObj) =>
  fetch('/api/item/update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemObj),
  })
  .then(data => data.json())
  .then(item => ({
    item: {
      id: item.item._id,
      name: item.item.properties.name,
      price: item.item.properties.price,
      description: item.item.properties.description,
      picture: item.item.properties.picture,
    },
    quantity: 1,
  }));

/**
 * Delete item from database completely forever
 *
 * ItemObj {
 *          name: {string},
 *          description: {string},
 *          price: {string},
 *          picture: {string},
 *          }
 *
 * @param  {number}
 * @return { <none> }
 */
ItemAPI.delete = (itemId) =>
  fetch(`/api/item/${itemId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json());


/**
 * Unlink an item from a certain menu
 *
 * @param  {number}
 * @param  {number}
 * @return {<none>}
 */
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

/**
 * Update an order with a new list of items
 *
 * @param  {array of Item Objects}
 * @return {array of item Objects}
 */
ItemAPI.updateOrder = (itemArray) =>
  fetch('/api/item/reorder', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemArray.map((item, index) => ({
      index,
      id: item.item.id,
    }))),
  })
  .then(data => data.json());

/**
 *  Get items not assigned to a menu for a Store
 *  (these will show in "item bank")
 *
 * ItemObj {
 *          name: {string},
 *          description: {string},
 *          price: {string},
 *          picture: {string},
 *          }
 *
 * @param  {number}
 * @return {array of item Objects}
 */
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
