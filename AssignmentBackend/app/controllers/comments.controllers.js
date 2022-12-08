const Joi = require('joi');
const articleModels = require("../models/articles.models")
const commentsModels = require("../models/comments.models")
var Filter = require('bad-words'),
    filter = new Filter({ replaceRegex:  /[A-Za-z0-9가-힣_]/g });

const addComment = (req, res) => {
    const schema = Joi.object({
        "comment_text": Joi.string().required()
    })
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    let article_id = parseInt(req.params.article_id);
    articleModels.getSingleArticle(article_id, (err,article) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)
    
    let comment_text = req.body.comment_text;
    let cleaned_comment = filter.clean(comment_text)
    commentsModels.addComment(article.article_id, cleaned_comment, (err, id) => {
        if (err) return res.sendStatus(500);
        return res.status(201).send({comment_id: id})

    })
})
}
const getComments = (req, res) => {
    let article_id = parseInt(req.params.article_id);
    articleModels.getSingleArticle(article_id, (err) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)
    })
    commentsModels.getComments(article_id, (err, num_rows, comments) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500);
        return res.status(200).send(comments);

    })
    
}
const deleteComment = (req, res) => {
    let comment_id = parseInt(req.params.comment_id)
    commentsModels.getSingleComment(comment_id,(err,comment)=>{
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)
       
    
    commentsModels.deleteComment(comment_id, (err) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send("Item deleted");
    })
})

}

module.exports = {
    getComments: getComments,
    deleteComment: deleteComment,
    addComment: addComment
}