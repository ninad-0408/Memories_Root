import * as api from "../api";
import * as actionTypes from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        const action = {
            type: actionTypes.FETCH_ALL, 
            payload: data
        }
        dispatch(action);

    } catch (error) {
        console.log(error);
    }
   
}

export const createPost = (post) => async (dispatch) => {

    try {
        const { data } = await api.createPost(post);
        const action = {
            type: actionTypes.CREATE, 
            payload: data 
        }
        dispatch(action);

    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(id, post);
        const action = {
            type: actionTypes.UPDATE,
            payload: data
        }

        dispatch(action);
    } catch (error) {
        console.log(error);
    }

}

export const likePost = (id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(id);
        const action = {
            type: actionTypes.UPDATE,
            payload: data
        }

        dispatch(action);
    } catch (error) {
        console.log(error);
    }

}

export const deletePost = (id) => async (dispatch) => {
    
    try {
        await api.deletePost(id);
        const action = {
            type: actionTypes.DELETE,
            payload: id
        }

        dispatch(action)
    } catch (error) {
        console.log(error);
    }
}
