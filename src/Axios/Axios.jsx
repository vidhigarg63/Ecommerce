import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://e-commerce-4e8db-default-rtdb.firebaseio.com/'
    // baseURL : 'https://e-commerce-ddfd4.firebaseio.com/'
})

export default instance;