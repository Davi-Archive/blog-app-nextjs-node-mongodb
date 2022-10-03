const { default: mongoose } = require("mongoose");
const models = require("../models");
const blogDB = models.blogModel;
const userDB = models.userModel;

// check all Blogs
// GET /api/blog
const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await blogDB.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogs });
};

// Add a new Blog
// POST /api/blog/add
const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await userDB.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }
  const blog = new blogDB({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog._id);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json(blog);
};

// Update blog on id
// PUT /api/blog/:id

const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await blogDB.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to Update the blog" });
  }
  return res.status(200).json(blog);
};

// Get one blog by id
// GET /api/blog/:id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await blogDB.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    res.status(404).json({ message: "No Blog found" });
  }
  return res.status(200).json(blog);
};

// DELETE one blog by id
// DELETE /api/blog/:id

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await blogDB.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
};

// GET one blog by id
// GET /blog/user/:id
const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await userDB.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No blog found" });
  }
  return res.status(200).json({ blogs: userBlogs });
};

module.exports = {
  getByUserId,
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
};
