import * as actionTypes from '../constants/actionTypes';
import * as api from '../api/index';

export const auth = (result, token, history) => async (dispatch) => {

    try {
        await api.userLogin(result);   

        const action = {
            type: actionTypes.AUTH,
            payload: {
                result,
                token
            }
        }
        dispatch(action); 
        history.push('/');

    } catch (error) {
        console.log(error);
        history.push('/auth');
    }

}

export const login = (formData, history) => async (dispatch) => {

    try {
        const { data } = await api.userLogin(formData);
        const { result, token } = data;

        const action = {
            type: actionTypes.AUTH,
            payload: {
                result,
                token
            }
        }
        dispatch(action); 
        history.push('/');
        
    } catch (error) {
        console.log(error);
        history.push('/auth');
    }
}

export const signup = (formData, history) => async (dispatch) => {

    try {
        const { data }  = await api.userSignup(formData);
        const { result, token } = data;

        const action = {
            type: actionTypes.AUTH,
            payload: {
                result,
                token
            }
        }
        dispatch(action);       
        history.push('/');
    } catch (error) {
        console.log(error);
        history.push('/auth');
    }
}

export const userLogout = () => async (dispatch) => {

    try {
        const action = {
            type: actionTypes.LOGOUT
        }

        dispatch(action);
        
    } catch (error) {
        console.log(error);
    }
}
