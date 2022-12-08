const db = require("../../database")

const addComment = (article_id,comment_text,done) => {
    let dateToday = Date.now();
    const sql='INSERT INTO comments (comment_text,date_published,article_id) VALUES(?,?,?)'
    let values = [comment_text, dateToday,article_id]
    db.run(sql, values, function(err) {
        if (err) return done(err)
        return done(null, this.lastID)
    })
    
    
}

const deleteComment = (comment_id, done) => {
    const sql = 'DELETE FROM comments WHERE comment_id=?';
    
    db.run(sql, [comment_id], (err) => {
        return done(err)
    })
}


const getSingleComment = (id, done) => {
    const sql = 'SELECT * FROM comments WHERE comment_id=?'
    db.get(sql, [id], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)
        comment ={
            comment_id: row.comment_id
        }
        return done(null, comment)

    })
}
const getComments = (article_id,done) => {

    let sql = 'SELECT * FROM comments WHERE article_id=?';
    const comments = [];

    db.each(
        sql,[article_id],
        (err, row) => {
            if (err) console.log("Something went wrong: " + err);
            if(!row) return done(404)
            let comment= {
                article_id: row.article_id,
                comment_text: row.comment_text,
                comment_id: row.comment_id,
                date_published: new Date(row.date_published).toLocaleDateString()
            }
            comments.push(comment);
        },
        (err, num_rows) => {
            return done(err, num_rows, comments)
        }
    )
    }


module.exports = {
    addComment:addComment,
    deleteComment:deleteComment,
    getComments:getComments,
    getSingleComment:getSingleComment
}