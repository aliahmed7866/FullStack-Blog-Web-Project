const getAllComments = (article_id) => {
    return fetch("http://localhost:3333/articles/" + article_id + "/comments")
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
}

const addComment = (article_id, commentText) => {
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment_text: commentText
        })
    };

    return fetch("http://localhost:3333/articles/" + article_id + "/comments", requestData)
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 404) {
                throw "We could not find the article that you are trying to comment on!"
            } else {
                throw "Something went wrong!"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
}
const deleteComment = (comment_id, token) => {
    const requestData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    };

    return fetch("http://localhost:3333/comments/" + comment_id, requestData)
        .then((response) => {
            if (response.status === 200) {
                return
            } else if (response.status === 404) {
                throw "We could not find the the content that you are attempting to delete. Refresh the page and try again!"
            } else if (response.status === 401) {
                throw "You have to be logged in to delete a comment"
            } else {
                throw "Something went wrong"
            }
        })
        .catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
}
export const commentService = {
    getAllComments,
    addComment,
    deleteComment
}