const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose").set("strictQuery", true);
const usersRouter = require("./controllers/users");
const eventsRouter = require("./controllers/events");
const clubsRouter = require("./controllers/clubs");
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.info("connected to MongoDB");
    })
    .catch((error) => {
        console.error("error connecting to MongoDB:", error.message);
    });
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/clubs", clubsRouter);
module.exports = app;
