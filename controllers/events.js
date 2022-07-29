const { db} = require("../db_config");

exports.createEvent = async (req, res) => {
    db.collection("createEvent").insertOne(req.body,
   function (err, info) {
    if (err) {
        console.log(err);
        res.json(err)
    } else {
        console.log(info.acknowledged);
        res.json(info.acknowledged)
    }
   });
}

exports
