import axios from "axios";

const url = "http://localhost:5000";
// const url = "https://momory-react.herokuapp.com";

export const fetchPosts = () => axios.get(`${url}/posts`);
export const createPost = (newPost) => axios.post(`${url}/posts`, newPost);
export const updatePost = (id, post) => axios.patch(`${url}/posts/${id}`, post);
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`);
export const likePost = (id) => axios.patch(`${url}/posts/${id}/likepost`);


export const userLogin = (result) => axios.post(`${url}/user/login`, result);
export const userSignup = (result) => axios.post(`${url}/user/signup`, result);