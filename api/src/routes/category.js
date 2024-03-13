const express = require('express');
const { getAllCategories,
        getCategoryPosts,
        getCategoryById,
        getCategoryBySlug,
        createNewCategory,
        updateCategoryById,
        deleteCategoryById } = require('../controllers/category.js');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/get', getCategoryPosts);
router.get('/:id', getCategoryById);
router.get('/:slug', getCategoryBySlug);
router.get('/create', createNewCategory);
router.get('/update/:id', updateCategoryById);
router.get('/delete/:id', deleteCategoryById);

module.exports = router;