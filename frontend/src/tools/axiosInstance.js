import axios from "axios";



const axiosInstance = axios.create({
        baseURL: 'https://cors-anywhere.herokuapp.com/http://34.253.213.211:3000/api/',
    timeout: 50000,
    headers: {
        "__token__" : 'XNnzXyVCMO0tUzyGp4NNWMOM7zrVcZUnmOeOVaF8Qdl1AlcnpB',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

export default axiosInstance;
