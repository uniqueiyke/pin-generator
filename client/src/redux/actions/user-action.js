import {
    USER_CREATED,
    USER_CREATION_FAILED,
    USER_FETCH_SUCCEEDED,
    USER_FETCH_FAILED,
    USER_LOGIN_SUCCEEDED,
    USER_LOGIN_FAILED,
    IS_FETCHING_USER,
    USER_LOGGED_OUT,
    API_KEY_REFRESHED
} from './action-types';

import axios from 'axios';
import tokenConfig from './token-config';

const userCreated = data => ({
    type: USER_CREATED,
    payload: data
});

const userCreationFailed = error => ({
    type: USER_CREATION_FAILED,
    payload: error
});

const userLoginSucceeded = data => ({
    type: USER_LOGIN_SUCCEEDED,
    payload: data
});

const userLoginFailed = error => ({
    type: USER_LOGIN_FAILED,
    payload: error
});

const userFetchSuccess = data => ({
    type: USER_FETCH_SUCCEEDED,
    payload: data
});

const userFetchFailed = error => ({
    type: USER_FETCH_FAILED,
    payload: error
});

const isFatchingUser = () => ({
    type: IS_FETCHING_USER,
});

export const logoutUser = () => ({
    type: USER_LOGGED_OUT
})

const apiKeyRefreshed = new_key => ({
    type: API_KEY_REFRESHED,
    payload: new_key
})

export const registerUser = data => async dispatch => {
    try {
        const response = await axios({
            url: '/users/register',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': "application/json"
            }
        });

        dispatch(userCreated(response.data));

    } catch (error) {
        // let errorObject = JSON.parse(JSON.stringify(error));
        dispatch(userCreationFailed(error));
        console.log(error);
    }
}

export const loginUser = data => async dispatch => {

    try {
         const response = await axios({
            url: '/users/login',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': "application/json"
            }
        });

        dispatch(userLoginSucceeded(response.data));

    } catch (error) {
        dispatch(userLoginFailed(error));
        console.log(error);
    }
}

export const fetchUser = () => async dispatch => {
    dispatch(isFatchingUser());
    try {
            const response = await axios({
            url: '/users/user/profile',
            method: 'GET',
            headers: tokenConfig('application/json')
        });
        dispatch(userFetchSuccess(response.data));
    } catch (error) {
        dispatch(userFetchFailed(error));
        let errorObject = JSON.parse(JSON.stringify(error));
        console.log(errorObject);
    }
}

export const refreshApiKey = () => async dispatch => {
    try {
            const response = await axios({
            url: '/users/user/refresh-key',
            method: 'GET',
            headers: tokenConfig('application/json')
        });
        dispatch(apiKeyRefreshed(response.data));
    } catch (error) {
        let errorObject = JSON.parse(JSON.stringify(error));
        console.log(errorObject);
    }
}
