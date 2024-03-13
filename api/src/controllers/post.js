const Post = require('../models/post.js');
const { uid } = require('uid');
const slugify = require('slugify');
const { Op } = require('sequelize');

async function getAllPosts(req, res) {
    try {
        const post = await Post.findAll();
        res.json(post);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getPostById(req, res) {
    const { id } = req.params;
    try {
        const post = await Post.findOne({ where: { id } });
        if(post === null) {
            return res.json({ message: "Bu ID'ye ait post bulunamadı" });
        }
        res.json(post);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getPostBySlug(req, res) {
    const { slug } = req.params;
    try {
        const post = await Post.findOne({ where: { slug } });
        if(post === null) {
            return res.json({ message: "Bu ID'ye ait post bulunamadı" });
        }
        res.json(post);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createNewPost(req, res) {
    const id = uid(32);
    const { title } = req.body;
    const slug = slugify(title, { lower: true });
    try {
        const post = await Post.findOne({
            where: {
                [Op.or]: [
                    { title },
                    { slug }
                ]
            }
        });
        if(post) {
            return res.json({ message: "Bu post daha önce eklenmiş" });
        }
        await Post.create({ id, title, slug, image: 'https://placehold.jp/800x600.png' });
        res.json({ message: "Post başarıyla oluşturuldu" });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updatePostById(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const slug = slugify(title, { lower: true });
    try {
        const post = await Post.findOne({
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
        if(post) {
            return res.json({ message: "Bu post daha önce eklenmiş" });
        }
        await Post.update({ title, slug }, { where: { id } });
        res.json({ message: "Post başarıyla güncellendi" });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deletePostById(req, res) {
    const { id } = req.params;
    try {
        await Post.destroy({ where: { id } });
        res.json({ message: "Post başarıyla silindi" });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    getPostBySlug,
    createNewPost,
    updatePostById,
    deletePostById
}