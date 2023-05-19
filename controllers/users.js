const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");


usersRouter.get("/", async (request, response) => {
    const users = await User.find({})
        // .populate("club", { name: 1 });
    response.json(users);
});
usersRouter.post("/", async (request, response) => {
    const { username, password, name } = request.body.content;
    if (!username || !password) {
        return response.status(400).json({
            error: "Username or Password is missing!"
        });
    }
    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: "Username or password is not valid!"
        });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return response.status(400).json({
            error: "Username already Exists!"
        });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
        ...request.body.content
    });

    const newUser = await user.save();
    response.status(201).json(newUser);
});

module.exports = usersRouter;