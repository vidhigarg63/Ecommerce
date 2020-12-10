import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://e-commerce-bc5e9-default-rtdb.firebaseio.com/'
})

export default instance;