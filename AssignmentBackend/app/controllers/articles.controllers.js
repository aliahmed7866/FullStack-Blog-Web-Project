const Joi = require('joi');
const articleModels = require("../models/articles.models")
const usersModels = require("../models/users.models")

const getOne = (req, res) => {
    let article_id = parseInt(req.params.article_id);
    articleModels.getSingleArticle(article_id, (err, article) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)
        return res.status(200).send(article)
    })
}
const getAll = (req, res) => {
    articleModels.getAllArticles((err, num_rows, articles) => {
        if (err) return res.sendStatus(500);

        return res.status(200).send(articles);

    })
}
const getArticlesByUser = (req, res) => {
    let user_id = parseInt(req.params.user_id);
    articleModels.getArticlesByUser(user_id,(err, num_rows, articles) => {
        if (err) return res.sendStatus(500);

        return res.status(200).send(articles);

    })
}
const updateArticle = (req, res) => {
    let article_id = parseInt(req.params.article_id);
    articleModels.getSingleArticle(article_id, (err, article) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)


        const schema = Joi.object({
            "title": Joi.string(),
            "author": Joi.string(),
            "article_text": Joi.string()
        })
        const {
            error
        } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        if (req.body.hasOwnProperty("author")) {
            article.author = req.body.author
        }
        if (req.body.hasOwnProperty("title")) {
            article.title = req.body.title
        }
        if (req.body.hasOwnProperty("article_text")) {
            article.article_text = req.body.article_text
        }

        articleModels.updateArticle(article_id, article, (err, id) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }
            return res.sendStatus(200)

        })
    })
}
/////// do this 
const deleteArticle = (req, res) => {
   
    let article_id = parseInt(req.params.article_id);
    articleModels.getSingleArticle(article_id, (err, article) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)
        articleModels.deleteArticle(article_id, (err) => {
            if (err) return res.sendStatus(500);
            return res.sendStatus(200);
        })
    })
}
const create = (req, res) => {
    const schema = Joi.object({
        "title": Joi.string().required(),
        "author": Joi.string().required(),
        "article_text": Joi.string().required()
    })
    const {
        error
    } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let token = req.get('X-Authorization')
    usersModels.getIdFromToken(token, (err, id) => {
        if (err || id === null) {
            return res.sendStatus(401)
        }

        let article = Object.assign({}, req.body);
        console.log(article)
        articleModels.addArticle(id, article, (err, id) => {
            if (err) return res.sendStatus(500);
            return res.status(201).send({
                article_id: id
            })

        })
    })



}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle,
    create: create,
    getArticlesByUser:getArticlesByUser
}