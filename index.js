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

app.post("/create-data", (req, res) => {
  db.collection("data").insertOne(
    { text: req.body.text },
    function (err, info) {
    console.log(info.acknowledged)
      res.json(info.acknowledged);
      if (err) {
        console.log(`${err}`);
      }
    }
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
