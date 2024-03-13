const Category = require('../models/category.js');
const Post = require('../models/post.js');
const { uid } = require('uid');
const slugify = require('slugify');
const { Op } = require('sequelize');

async function getAllCategories(req, res) {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getCategoryPosts(req, res) {
    const { slug } = req.query;
    try {
        const category = await Category.findOne({ where: { slug } });
        const posts = await Post.findAll({ where: { category_id: category.id } });
        if(posts.length === 0) {
            return res.json({ message: "Bu kategoriye ait post bulunamadı" });
        }
        res.json(posts);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getCategoryById(req, res) {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ where: { id } });
        if(category === null) {
            return res.json({ message: "Bu ID'ye ait kategori bulunamadı" });
        }
        res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getCategoryBySlug(req, res) {
    const { slug } = req.params;
    try {
        const category = await Category.findOne({ where: { slug } });
        if(category === null) {
            return res.json({ message: "Bu ID'ye ait kategori bulunamadı" });
        }
        res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createNewCategory(req, res) {
    const id = uid(32);
    const { title } = req.body;
    const slug = slugify(title, { lower: true });
    try {
        const category = await Category.findOne({
            where: {
                [Op.or]: [
                    { title },
                    { slug }
                ]
            }
        });
        if(category) {
            return res.json({ message: "Bu kategori daha önce eklenmiş" });
        }
        await Category.create({ id, title, slug });
        res.json({ message: "Kategori başarıyla oluşturuldu" });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateCategoryById(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const slug = slugify(title, { lower: true });
    try {
        const category = await Category.findOne({
            where: {
                [Op.or]: [
                    { title },
                    { slug }
                ],
                [Or.not]: [
                    { id }
                ]
            }
        });
        if(category) {
            return res.json({ message: "Bu kategori daha önce eklenmiş" });
        }
        await Category.update({ title, slug }, { where: { id } });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteCategoryById(req, res) {
    const { id } = req.params;
    try {
        await Category.destroy({ where: { id } });
        res.json({ message: "Kategori başarıyla silindi" });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllCategories,
    getCategoryPosts,
    getCategoryById,
    getCategoryBySlug,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById
}