const express = require("express");
const cors = require("cors");
const colors = require("colors");
const app = express();
app.use(cors());
require("dotenv").config();

const connectDB = require("./config/db");

app.use(express.json()) // all data ib json

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "express setup" });
});

app.use("/api/user/", require("./routes/userRoutes"));
app.use("/api/blog/", require("./routes/blogRoutes"));


const port = process.env.PORT || 3001;

connectDB();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
