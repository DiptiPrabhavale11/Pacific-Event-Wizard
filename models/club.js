const mongoose = require("mongoose");
const clubSchema = new mongoose.Schema({
    name: String,
    description: String,
    imgUrl: String,
    email: String,
});
clubSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Club", clubSchema);