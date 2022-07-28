const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// database name
const dbName = "deepThought_taskOne";
let db;

// database connection
client
  .connect()
  .then(() => {
    db = client.db(dbName);
    // app.listen(5000);
    console.log(`MongoDB connected successfully`);
  })
  .catch((err) => {
    console.log(`Error connecting mongodb ` + err);
  });

app.use(express.json());

// My routes
const xyz = require("");

// My routes with API
app.use("/api", xyz);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
