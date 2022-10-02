const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

//Users
