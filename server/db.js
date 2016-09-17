const Promise = require('bluebird');

const neo4j = Promise.promisifyAll(require('neo4j'));

const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474' });

const db = module.exports;

db.createOwner = (owner => Node.cypherAsync({
  query: `MERGE (profile:Profile 
    { name: {name}, phone: {phone}, email: {email}, desc: {desc}, auth_key: {auth_key} })
    RETURN profile`,
  params: {
    name: owner.name,
    phone: owner.phone,
    email: owner.email,
    desc: owner.desc,
    auth_key: owner.auth_key,
  },
}));

db.findOwner = (ownerName => Node.cypherAsync({
  query: 'MATCH (profile:Profile { name: {name} }) RETURN profile',
  params: {
    name: ownerName,
  },
}));

db.deleteOwner = (ownerName => Node.cypherAsync({
  query: 'MATCH (profile:Profile { name: {name} }) DELETE profile',
  params: {
    name: ownerName,
  },
}));
