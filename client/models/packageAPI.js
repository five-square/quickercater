import fetch from 'isomorphic-fetch';
//
const PackageAPI = {};
/**
 * Get all packages associated with a Store (by OwnerId)
 *
 * Package Object {
 *                  name: {string},
 *                  type: {string},
 *                  cost: {number},
 *                  description: {string},
 *                  picture: {string/URL}
 *                }
 *
 * @param  {number} - Owner Id
 * @return {List of Package Objects}
 */
PackageAPI.getAllPackages = (ownerId) =>
  fetch(`/api/package/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then(packages => packages.map(e => ({
    id: e.pack._id,
    name: e.pack.properties.name,
    description: e.pack.properties.description,
    type: e.pack.properties.type,
    cost: e.pack.properties.cost,
    picture: e.pack.properties.picture ? e.pack.properties.picture : null,
  })));
/**
 * Create a package in db
 *
 * Package Object {
 *                  name: {string},
 *                  type: {string},
 *                  cost: {number},
 *                  description: {string},
 *                  picture: {string/URL}
 *                }
 *
 * @param  {number} - Owner Id
 * @return {List of Package Objects}
 */
PackageAPI.create = (pack) =>
  fetch('/api/package/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pack),
  })
  .then(data => data);

/**
 * Delete package from database completely forever
 *
 * @param  {number}
 * @return {<none>}
 */
PackageAPI.delete = (packId) =>
  fetch(`/api/package/delete/${packId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json());
/**
 *  Update a Package in DB from Package Object
 *
 * Package Object {
 *                  name: {string},
 *                  type: {string},
 *                  cost: {number},
 *                  description: {string},
 *                  picture: {string/URL}
 *                }
 *
 * @param  {Package Object}
 * @return {Package Object}
 */
PackageAPI.update = (pack) =>
  fetch('/api/package/update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pack),
  })
  .then(data => data.json(data));
export default PackageAPI;
