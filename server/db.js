const Promise = require('bluebird');
const neo4j = Promise.promisifyAll(require('neo4j'));
const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474' });
const db = module.exports;

db.getAllNodes = () => {
  return Node.cypherAsync({
    query: `MATCH (n) RETURN n`,
  });
};

db.createOwner = (owner => {
  return Node.cypherAsync({
    query: `MERGE (profile:Profile 
    { name: {name}, phone: {phone}, email: {email}, logo: {logo} })
     RETURN profile`,
     params: {
      name: owner.name,
      phone: owner.phone,
      email: owner.email,
      logo: owner.logo,
    },
  });
});

db.findOwner = (ownerName => {
  return Node.cypherAsync({
    query: `MATCH (profile:Profile { name: {name} }) RETURN profile`,
    params: {
      name: ownerName,
    },
  });
});

db.deleteOwner = (ownerName => {
  return Node.cypherAsync({
    query: `MATCH (profile:Profile { name: {name} }) DELETE profile`,
    params: {
      name: ownerName,
    },
  });
});
