const eventsRouter = require("express").Router();
const Event = require("../models/event");
eventsRouter.get("/", async (request, response) => {
    const shows = await Event.find({})
        .populate("club", { id:1, name:1, email:1 })
        .populate("users", {id:1, name:1})
    response.json(shows);
});
eventsRouter.post("/", async (request, response) => {
    const body = request.body;
    console.log("body", body);
    if (!body.content) {
        return response.status(400).json({
            error: "content is not present in the request"
        });
    }
    const newEvent = new Event(body.content);
    const savedEvent = await newEvent.save();
    response.status(201).json(savedEvent);

});
eventsRouter.put("/:id", async (request, response) => {
    const body = request.body;
    if (!body.content) {
        return response.status(400).json({
            error: "content is not present in the request"
        });
    }
    const newShow = {
        users : body.content.users,
    };
    // console.log("request.query.id",request.params);
    const event = await Event.findByIdAndUpdate(request.params.id, newShow,
        { new: true, runValidators: true, context: "query" });
    // console.log("res", show);
    response.json(event);
});
module.exports = eventsRouter;