const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    clubName: String,
    role: String,
    club: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Club"
        }

});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;