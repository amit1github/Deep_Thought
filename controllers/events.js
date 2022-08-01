const dbConnect = require("../db_config");
const multer = require("multer");
const path = require("path");

// multer upload
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + ".png");
    },
  }),
}).single("myimg");

exports.createEvent = async (req, res) => {
  const db = await dbConnect();
  try {
    upload(req, res, (err) => {
      if (err) {
        return res.send("Error uploading file.");
      }
      res.send(req.filename);
    });

    let data = await db.insertOne(req.body);
    if (data.acknowledged) {
      console.log("data inserted");
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
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
  //   exports.readProduct = async (req, res) => {
  //     try {
  //       const limitValue = req.query.limit || 2;
  //       const skipValue = req.query.skip || 0;
  //       let data = await ProductSchema.find()
  //         .populate("category")
  //         .limit(limitValue)
  //         .skip(skipValue);
  //       res.status(200).send(data);
  //       console.log(data);
  //     } catch (error) {
  //       res.send(error);
  //     }
  //   };
};

exports.updateEvent = async (req, res) => {
  db.collection("Events").updateOne(req.body, function (err, info) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(info.acknowledged);
      res.json(info.acknowledged);
    }
  });
};

exports.deleteEvent = async (req, res) => {
  const db = await dbConnect();
  try {
    if (Object.keys(req.query).length !== 0) {
      let data = await db.deleteOne({_id: req.params._id});
      if (data.acknowledged) {
        console.log("record deleted");
        res.json(data);
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
