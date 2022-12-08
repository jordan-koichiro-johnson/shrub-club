// dev mode 
const URL_PREFIX="http://localhost:3006"

// publish 
// const URL_PREFIX = "https://guava-api.herokuapp.com"

const API = {
    login: (userObj) => {
        return fetch(`${URL_PREFIX}/api/user/login`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    },
    signup: (userObj) => {
        return fetch(`${URL_PREFIX}/api/user/signup`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    },
    createprofile: (token) => {
        return fetch(`${URL_PREFIX}/api/profile/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
    },
    findcurrentUser: (token) => {
        return fetch(`${URL_PREFIX}/api/profile/current-user`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
    },
    getUserFromToken: (token) => {
        return fetch(`${URL_PREFIX}/api/user/getuserfromtoken`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
    },
    createShrub: (profileid) => {
        return fetch(`${URL_PREFIX}/api/shrub/create`, {
            method: "POST",
            body: JSON.stringify(profileid),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    },
    getMyShrub: (profileid) => {
        return fetch(`${URL_PREFIX}/api/shrub/myshrub`, {
            method: "GET",
            body: JSON.stringify(profileid),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    },
    getProfileTag: (token) => {
        return fetch(`${URL_PREFIX}/api/profiletag/current`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
    },
    getOneItem: (itemId) => {
        return fetch(`${URL_PREFIX}/api/item/${itemId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    },
    deleteShrubTag: (shrubId) => {
        return fetch(`${URL_PREFIX}/api/shrubtag/delete`, {
            method: "DELETE",
            body: JSON.stringify(shrubId),
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    getItemByName: (itemName) => {
        return fetch(`${URL_PREFIX}/api/item/name/${itemName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    },
    saveCustom: (itemObj) => {
        return fetch(`${URL_PREFIX}/api/shrubtag/change`, {
            method: "POST",
            body: JSON.stringify(itemObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }
}
export default API