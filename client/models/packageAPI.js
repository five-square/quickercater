import fetch from 'isomorphic-fetch';

const PackageAPI = {};


PackageAPI.getAllPackages = (ownerId) =>
  fetch(`/api/package/${ownerId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json());

PackageAPI.createPackage = (pack) =>
  fetch('/api/package/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pack),
  })
  .then(data => data);


PackageAPI.deletePackage = (packageID) =>
  fetch(`/api/package/${packageID}`, {
    method: 'post',
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
