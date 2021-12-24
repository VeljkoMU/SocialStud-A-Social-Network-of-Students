const n4j = require('neo4j-driver');

const neo4jDriver = n4j.driver("neo4j://localhost:7687", n4j.auth.basic("neo4j", "ccc"));

const neo4j = neo4jDriver.session();

module.exports = neo4j;