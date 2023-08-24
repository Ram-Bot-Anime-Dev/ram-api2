const mongoose = require("mongoose");

const ModLogSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collation: "users" }
);

exports.User = mongoose.model("Users", ModLogSchema);
