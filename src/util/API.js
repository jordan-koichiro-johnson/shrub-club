// dev mode 
const URL_PREFIX="http://localhost:3006"

const API = {
    login: (userObj) => {
        return fetch(`${URL_PREFIX}/api/user/login`, {
            method: "POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=> res.json())
    },
    signup: (userObj) => {
        return fetch(`${URL_PREFIX}/api/user/signup`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type":"application/json"
            }
        })
    },
    // createprofile: (userObj) => {
    //     return fetch(`${URL_PREFIX}/api/profile/create`)
    // }
}
export default API