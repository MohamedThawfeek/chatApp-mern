import axios from 'axios'


const instance = axios.create({
    baseURL : 'https://my-first-app-chat-app.herokuapp.com'
})

export default instance