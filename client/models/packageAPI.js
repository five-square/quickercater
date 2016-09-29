import fetch from 'isomorphic-fetch';
//
const PackageAPI = {};


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

PackageAPI.create = (pack) =>
  fetch('/api/package/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pack),
  })
  .then(data => data);


PackageAPI.delete = (packageID) =>
  fetch(`/api/package/delete/`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json(data));

PackageAPI.updatePackage = (pack) =>
  fetch('/api/package/update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pack),
  })
  .then(data => data.json(data));
export default PackageAPI;
