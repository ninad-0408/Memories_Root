import * as actionTypes from '../constants/actionTypes';

export const auth = (result, token) => async (dispatch) => {

    try {
        const action = {
            type: actionTypes.AUTH,
            payload: {
                result,
                token
            }
        }
        dispatch(action);

    } catch (error) {
        console.log(error);
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