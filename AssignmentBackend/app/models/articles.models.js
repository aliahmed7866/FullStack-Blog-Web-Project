const db = require("../../database")

const getAllArticles = (done) => {

    const articles = [];

    db.each(
        "SELECT * FROM articles",
        [],
        (err, row) => {
            if (err) console.log("Something went wrong: " + err);
            let article ={
                article_id: row.article_id,
                title: row.title,
                author: row.author,
                date_published: new Date(row.date_published).toLocaleDateString(),
                date_edited: new Date(row.date_edited).toLocaleDateString(),
                article_text: row.article_text
            }
            articles.push(article);
        },
        (err, num_rows) => {
            return done(err, num_rows, articles)
        }
    )
}
const getSingleArticle = (id, done) => {
    const sql = 'SELECT * FROM articles WHERE article_id=?'
    db.get(sql, [id], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)
        article = {
            article_id: row.article_id,
            author: row.author,
            title: row.title,
            date_published: new Date(row.date_published).toLocaleDateString(),
            date_edited: new Date(row.date_edited).toLocaleDateString(),
            article_text: row.article_text

        }
        return done(null, article)

    })
}
const addArticle = (user_id, article, done) => {
    let dateToday = Date.now();
    const sql = `INSERT INTO articles (title,author,date_published,date_edited,article_text,created_by) VALUES(?,?,?,?,?,?)`

    let values = [article.title, article.author, dateToday, dateToday, article.article_text, user_id]
    db.run(
        sql,
        values,
        function(err) {
            if (err) return done(err, null)
            return done(null, this.lastID)
        }
    )
}

const updateArticle = (user_id, article, done) => {
    const sql = 'UPDATE articles SET title=?,author=?,article_text=? WHERE article_id=?'
    let values = [article.title, article.author, article.article_text, user_id]
    db.run(
        sql,
        values,
        (err) => {
            return done(err)
        }
    )
}
const deleteArticle = (article_id, done) => {
    const sql = 'DELETE FROM articles WHERE article_id=?';
    db.run(sql, [article_id], (err) => {
        return done(err)

    })

}
const getArticlesByUser = (user_id,done) => {

    const articles = [];

    db.each(
        "SELECT * FROM articles where created_by=?",
        [user_id],
        (err, row) => {
            if (err) console.log("Something went wrong: " + err);
            let article ={
                article_id: row.article_id,
                title: row.title,
                author: row.author,
                date_published: new Date(row.date_published).toLocaleDateString(),
                date_edited: new Date(row.date_edited).toLocaleDateString(),
                article_text: row.article_text
            }
            articles.push(article);
        },
        (err, num_rows) => {
            return done(err, num_rows, articles)
        }
    )
}


module.exports = {
    getAllArticles: getAllArticles,
    addArticle: addArticle,
    getSingleArticle: getSingleArticle,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle,
    getArticlesByUser:getArticlesByUser
}