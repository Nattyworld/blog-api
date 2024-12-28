const Blog = require('../models/blogmodels');
const calculateReadingTime = require('../utils/calculatereadtime');

exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, body } = req.body;

    const readingTime = calculateReadingTime(body);

    const blog = new Blog({
      title,
      description,
      tags,
      body,
      author: req.user.id,
      reading_time: readingTime,
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', order = 'timestamp' } = req.query;

    const blogs = await Blog.find({ state: 'published', $or: [
      { title: new RegExp(search, 'i') },
      { tags: new RegExp(search, 'i') }
    ]})
      .sort(order)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
