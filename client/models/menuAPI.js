import fetch from 'isomorphic-fetch';

const MenuAPI = {};

/**
 * Gets all items for a certain store menu
 *
 * ItemObj {
 *          name: {string},
 *          description: {string},
 *          price: {string},
 *          picture: {string},
 *          }
 *
 * @param  {number} - Menu ID
 * @return {Array of Item Objects}
 */
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

/**
 * @param  {Menu Object}
 *
 * Menu Obj {
 *             name: {string},
 *             description: {string},
 *             order: {number} - zero-index value
 *          }
 *
 * @return {Menu Object}
 */
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

/**
 * Add item to a store's particular menu
 *
 *   New Item Object {
 *                    menuId,
 *                    itemId,
 *                    order
 *                    }
 * @param  {newItem Object}
 * @return {number} - item Id
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


/**
 * Add item from item bank to active menu
 *
 * ItemObj {
 *          name: {string},
 *          description: {string},
 *          price: {string},
 *          picture: {string},
 *          }
 *
 * @param  {item Object}
 * @return {<none>}
 */
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
/**
 * Detaches items from Menu, then deletes menu
 * (for use with menus that ARE NOT empty)
 *
 * @param  {number}
 * @param  {number}
 * @return {<none>}
 */
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
/**
 * Detaches items from Menu, then deletes menu
 * (for use with menus that ARE empty)
 *
 * @param  {number}
 * @param  {number}
 * @return {<none>}
 */
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

/**
 * Update menu with new menu information
 *
 * Menu Obj {
 *             name: {string},
 *             description: {string},
 *             order: {number} - zero-index value
 *          }
 *
 * @param  {Menu Object}
 * @param  {number}
 * @return {Menu Object}
 */
MenuAPI.edit = (newMenuInfo, ownerId) =>
  fetch(`/api/menu/${ownerId}/update`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMenuInfo),
  })
  .then(data => data.json());
/**
 * Changes the view order of menus
 *
 * Menu Obj {
 *             name: {string},
 *             description: {string},
 *             order: {number} - zero-index value
 *          }
 *
 * @param  {Menu Array}
 * @return {Menu Array}
 */
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
