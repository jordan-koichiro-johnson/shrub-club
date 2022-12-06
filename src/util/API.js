// dev mode 
const URL_PREFIX="http://localhost:3001"

const API = {
    login: (userObj) => {
        return fetch(`${URL_PREFIX}/api/user/login`, {
            method: "POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=> res.json())
    }
}
export default API