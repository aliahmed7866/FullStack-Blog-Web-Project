const login = (email, password) => {
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };
    return fetch("http://localhost:3333/login", requestData)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw "Something went wrong - Please make sure the details you have entered are correct!"
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            localStorage.setItem("session_token", resJson.session_token)
            localStorage.setItem("user_id", resJson.user_id)
            console.log(resJson);
            return resJson
        })
        .catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
}

const logout = () => {
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem("session_token")
        }
    };
    return fetch("http://localhost:3333/logout", requestData)
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem("session_token")
                localStorage.removeItem("user_id")
                return
            } else if (response.status === 401) {
                throw "Not Logged in"
            } else {
                throw "Something went wrong"
            }
        })

        .catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
}
const getUser = (user_id) => {

    return fetch("http://localhost:3333/users/" + user_id)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw "Something went wrong! - User Not Found"
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
const getAllUsers = () => {
    const requestData = {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem("session_token")
        }
    }
    return fetch("http://localhost:3333/users", requestData)
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
const createUser = (forename, surname, email, password, token) => {
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({
            first_name: forename,
            last_name: surname,
            email: email,
            password: password
        })
    };
    return fetch("http://localhost:3333/users", requestData)
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw "Something went wrong - Please make sure the details you have entered are correct!"
            } else {
                throw "Something went wrong!"
            }
        })
        .then((resJson) => {
            return resJson.user_id;
        })
        .catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
}
export const userService = {
    login: login,
    logout: logout,
    getUser: getUser,
    getAllUsers: getAllUsers,
    createUser: createUser
}