
const { MongoClient } = require("mongodb");
// database name
const url = "mongodb://localhost:27017";

const dbName = "deepThought_taskOne";
const client = new MongoClient(url);
const   db= client.db(dbName);
module.exports = {
    db,
    client,
 }