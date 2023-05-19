const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String,
    location: String,
    type: String,
    description: String,
    imgUrl: String,
    link: String,
    food: Boolean,
    online: Boolean,
    email: String,
    // club: Number
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club"
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});
eventSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Event", eventSchema);