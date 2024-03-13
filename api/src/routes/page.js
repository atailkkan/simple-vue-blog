const express = require('express');
const { getAllPages,
        getPageById,
        getPageBySlug,
        createNewPage,
        updatePageById,
        deletePageById } = require('../controllers/page.js');

const router = express.Router();

router.get('/', getAllPages);
router.get('/:id', getPageById);
router.get('/:slug', getPageBySlug);
router.get('/create', createNewPage);
router.get('/update/:id', updatePageById);
router.get('/delete/:id', deletePageById);

module.exports = router;