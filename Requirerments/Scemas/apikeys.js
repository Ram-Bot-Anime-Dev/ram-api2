const mongoose = require("mongoose");

const ModLogSchema = new mongoose.Schema({
    email: String,
    _id: String,
});

module.exports = mongoose.model("api_keys_pro", ModLogSchema);
