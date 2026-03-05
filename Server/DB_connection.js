const psql = require("pg-promise")();
const db = psql("postgresql://postgres:0313@localhost:5432/postgres");

module.exports =  db;