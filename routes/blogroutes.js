const express = require('express');
const { createBlog, getBlogs } = require('../controllers/blogcontrollers');
const auth = require('../middlewares/authmiddlewares');
const router = express.Router();

router.get('/', getBlogs);
router.post('/', auth, createBlog);

module.exports = router;
