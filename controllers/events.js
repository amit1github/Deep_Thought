const dbConnect = require("../db_config");
const ObjectId = require("mongodb").ObjectId;
// const multer = require("multer");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");



// try {
//   let data = await db.insertOne(req.body);
//   if (data.acknowledged) {
//     console.log("data inserted");
//     res.json(data);
//   }

exports.createEvent = async (req, res) => {
  const db = await dbConnect();

  let form = new formidable.IncomingForm();
  
  const uploadFolder = path.join(__dirname, "../uploads", "files")
  
  // basic configuration
  form.keepExtensions = true;
  form.multiples = true
  form.maxFileSize = 50 * 1024 * 1024 // 5 MB
  form.uploadDir = uploadFolder
  // console.log(" form after", form);
  
  form.parse(req, async (err, fields, files) => {
    console.log("fields: ",fields);
    console.log("files: ", files);
    if (err) {
      console.log("Error parsing the files");
      return res.status(400).json({
        status: "Fail",
        message: "There was an error parsing the files",
        error: err,
      });
    }
 
    if (!files.myFile.length) {
      const file = files.myFile
  
      const isValid = isFileValid(true)
  
      const fileName = encodeURIComponent(file.name.replace(/\s/g, "-"))
  
      if (!isValid) {
        return res.status(400).json({
          status: "Fail",
          message: "The file type is not a valid type",
        });
      }
  
      try {
        // renames the file in the directory
        fs.renameSync(file.path, join(uploadFolder, fileName));
      } catch (error) {
        console.log(error);
      }
  
      try {
        // stores the fileName in the database
        const newFile = await File.create({
          name: `files/${fileName}`,
        });
        return res.status(200).json({
          status: "success",
          message: "File created successfully!!",
        });
      } catch (error) {
        res.json({
          error,
        });
      }
    } else {
      // Multiple files
    }
 
  }); 

}

//create event
// exports.createEvent = async (req, res) => {
//   const db = await dbConnect();

//   try {
//     upload(req, res, (err) => {
//       if (err) {
//         return res.send("Error uploading file.");
//       }
//       res.send(req.filename);
//     });

//     let data = await db.insertOne(req.body);
//     if (data.acknowledged) {
//       console.log("data inserted");
//       res.json(data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// };

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

// delete event
exports.deleteEvent = async (req, res) => {
  const db = await dbConnect();
  try {
    if (Object.keys(req.query).length !== 0) {
      console.log(req.query._id);
      let data = await db.deleteMany({ _id: new ObjectId(req.query._id) });
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
