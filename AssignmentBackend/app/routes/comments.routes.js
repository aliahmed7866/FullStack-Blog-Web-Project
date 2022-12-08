const commentsController = require("../controllers/comments.controllers")
const auth =require("../lib/authentication")
module.exports = function(app){
    app.route("/articles/:article_id/comments")
    .post(commentsController.addComment)
    .get(commentsController.getComments);
    app.route("/comments/:comment_id")
    .delete(auth.isAuthenticated,commentsController.deleteComment);
}