import axios from "axios";

const url = "http://localhost:5000";
// const url = "https://momory-react.herokuapp.com";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile'))
    {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get(`/posts`);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);


export const userLogin = (result) => API.post(`/user/login`, result);
export const userSignup = (result) => API.post(`/user/signup`, result);