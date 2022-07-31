const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "deepThought_taskOne";
const client = new MongoClient(url);

const dbConnect = async () => {
  let result = await client.connect();
  db = result.db(dbName);
  return db.collection("Events");
};

module.exports = dbConnect
