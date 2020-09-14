import axios from 'axios';

const instance = axios.create({
    //change when this deploy
    baseURL: 'http://localhost:9000'
})
export default instance
