const express = require("express")
const router = express.Router();
const { createEvent, getEvents, paginateEvents, deleteEvent, updateEvent } = require("../controllers/events")

router.post("/events", createEvent)

// router.get("/events/:_id", getEvents)

// router.get("/events", paginateEvents)

// router.put("/events/:_id", updateEvent)

router.delete("/events", deleteEvent)

module.exports = router