const express = require("express")
const router = express.Router();
const { createEvent } = require("../controllers/events")

router.post("/create-event", createEvent)

module.exports = router