const clubsRouter = require("express").Router();
const Club = require("../models/club");
clubsRouter.get("/", async (request, response) => {
    const clubs = await Club.find({})
    response.json(clubs);
});
clubsRouter.post("/", async (request, response) => {
    const body = request.body;
    console.log("body", body);
    if (!body.content) {
        return response.status(400).json({
            error: "content is not present in the request"
        });
    }
    const newClub = new Club(body.content);
    const savedClub = await newClub.save();
    response.status(201).json(savedClub);
});
module.exports = clubsRouter;