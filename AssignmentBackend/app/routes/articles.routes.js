const articleController = require("../controllers/articles.controllers")
const auth =require("../lib/authentication")
module.exports = function(app) {
    app.route("/articles")
        .get(articleController.getAll)
        .post(auth.isAuthenticated, articleController.create);

    app.route("/articles/:article_id")
        .get(articleController.getOne)
        .patch(auth.isAuthenticated, articleController.updateArticle)
        .delete(auth.isAuthenticated, articleController.deleteArticle);
    app.route("/userArticles/:user_id")
    .get(articleController.getArticlesByUser)
  
}