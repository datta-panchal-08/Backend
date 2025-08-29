import axios from 'axios';

const baseUrl = "http://localhost:3000/api/v1"

const instance = axios.create({
    baseURL:baseUrl,
    withCredentials:true,
});

export const post = (url,data)=>instance.post(url,data); 
export const get = (url)=>instance.get(url);