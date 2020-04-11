import axios from "axios";



const axiosInstance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://54.194.42.85:3000/api/',
    timeout: 10000,
    headers: {"__token__" : 'XNnzXyVCMO0tUzyGp4NNWMOM7zrVcZUnmOeOVaF8Qdl1AlcnpB'}
});

export default axiosInstance;