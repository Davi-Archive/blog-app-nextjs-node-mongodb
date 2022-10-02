const models = require("../models");

const userDB = models.userModel;

// get all users from DB
// GET /api/user
const getUser = async (req, res, next) => {
  let users;
  try {
    users = await userDB.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) return res.status(404).json({ message: "No users found" });

  return res.status(200).json(users);
};

// signup
// POST /api/user/signup
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userDB.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Login Instead" });
  }

  let user;
  try {
   user= await userDB.create({
        name,
        email,
        password
    });
  } catch (error) {
    res.status(500).json({message: "Couldn't save data to database"})
  }
  return res.status(200).json(user);
};

module.exports = { getUser, signup };
