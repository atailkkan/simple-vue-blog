const express = require('express');
const { getAllPosts,
        getPostById,
        getPostBySlug,
        createNewPost,
        updatePostById,
        deletePostById } = require('../controllers/post.js');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/id/:id', getPostById);
router.get('/slug/:slug', getPostBySlug);
router.get('/create', createNewPost);
router.get('/update/:id', updatePostById);
router.get('/delete/:id', deletePostById);

module.exports = router;