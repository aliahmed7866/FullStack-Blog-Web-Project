const getAll = () => {
    return fetch("http://localhost:3333/articles")
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
const getOne = (article_id) => {
    return fetch("http://localhost:3333/articles/" + article_id)
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
const getArticlesByUser = (user_id) => {
    return fetch("http://localhost:3333/userArticles/" + user_id)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                throw "You have to be logged in to access this content"
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

const addArticle = (author, title, article_text, token) => {
    const article = {
        "author": author,
        "title": title,
        "article_text": article_text
    }
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(article)

    };
    console.log(requestData)
    return fetch("http://localhost:3333/articles/", requestData)
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                throw "You have to be logged in to access this content"
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
const deleteArticle = (article_id, token) => {
    const requestData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    };
    return fetch("http://localhost:3333/articles/" + article_id, requestData)
        .then((response) => {
            if (response.status === 200) {
                return;
            } else if (response.status === 401) {
                throw "You have to be logged in to access this content"
            } else {
                throw "Something went wrong"
            }
        })

        .catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
}
const updateArticle = (article_id, article, token) => {

    const requestData = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(article)

    };
    console.log(JSON.stringify(article))
    return fetch("http://localhost:3333/articles/" + article_id, requestData)
        .then((response) => {
            if (response.status === 200) {
                return;
            } else if (response.status === 401) {
                throw "You have to be logged in to access this content"
            } else {
                throw "Something went wrong!"
            }
        })
        .then((resJson) => {
            return resJson
        })

        .catch((error) => {
            return Promise.reject(error)
        })
}
export const articleService = {
    getAll,
    getOne,
    getArticlesByUser: getArticlesByUser,
    addArticle: addArticle,
    deleteArticle: deleteArticle,
    updateArticle: updateArticle
}