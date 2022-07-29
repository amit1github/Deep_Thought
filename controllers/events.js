const { db } = require("../db_config");

exports.createEvent = async (req, res) => {
  db.collection("Events").insertOne(req.body, function (err, info) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(info.acknowledged);
      res.json(info.acknowledged);
    }
  });
};

exports.getEvents = async (req, res) => {
  // try {
  //     let data = await db.collection("Events").findOne(req.params)
  //     if(data) res.send(data)
  //     else res.send({error: "User Not Found"})
  // } catch (error) {
  //     console.log(error);
  //     res.send(error)
  // }

  db.collection("Events").find(req.params, {
    function(err, info) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(info.acknowledged);
        res.json(info.acknowledged);
      }
    },
  });
};

exports.paginateEvents = async (req, res) => {
  //
};

exports.updateEvent = async (req, res) => {
  //
};

exports.deleteEvent = async (req, res) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      let data = await db.collection("Events").deleteOne(req.query);
      console.log(data);
      res.send(data);
    }
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};
