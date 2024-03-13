const Page = require('../models/page.js');
const { uid } = require('uid');
const slugify = require('slugify');
const { Op } = require('sequelize');

async function getAllPages(req, res) {
    try {
        const pages = await Page.findAll();
        res.json(pages);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getPageById(req, res) {
    const { id } = req.params;
    try {
        const page = await Page.findOne({ where: { id } });
        if(page === null) {
            return res.json({ message: "Bu ID'ye ait sayfa bulunamadı" });
        }
        res.json(page);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getPageBySlug(req, res) {
    const { slug } = req.params;
    try {
        const page = await Page.findOne({ where: { slug } });
        if(page === null) {
            return res.json({ message: "Bu ID'ye ait sayfa bulunamadı" });
        }
        res.json(page);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createNewPage(req, res) {
    const id = uid(32);
    const { title } = req.body;
    const slug = slugify(title, { lower: true });
    try {
        const page = await Page.findOne({
            where: {
                [Op.or]: [
                    { title },
                    { slug }
                ]
            }
        });
        if(page) {
            return res.json({ message: "Bu sayfa daha önce eklenmiş" });
        }
        await Page.create({ id, title, slug });
        res.json({ message: "Sayfa başarıyla oluşturuldu" });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updatePageById(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const slug = slugify(title, { lower: true });
    try {
        const page = await Page.findOne({
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
        if(page) {
            return res.json({ message: "Bu sayfa daha önce eklenmiş" });
        }
        await Page.update({ title, slug }, { where: { id } });
        res.json({ message: "Sayfa başarıyla güncellendi" });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deletePageById(req, res) {
    const { id } = req.params;
    try {
        await Page.destroy({ where: { id } });
        res.json({ message: "Sayfa başarıyla silindi" });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllPages,
    getPageById,
    getPageBySlug,
    createNewPage,
    updatePageById,
    deletePageById
}