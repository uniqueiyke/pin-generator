import jwtDecode from 'jwt-decode';
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
} from '../actions/action-types';

const initialState = () => {
    const token = localStorage.getItem('token');
    let isAuthenticated = false;
    if (token) {
        const tokenExpiration = jwtDecode(token).exp;
        const dateNow = new Date();
        if (tokenExpiration > dateNow.getTime() / 1000) {
          isAuthenticated = true;
        }
      }
     
    return {
        isAuthenticated,
        isFetchingData: false,
        user: null,
        error: null
    };
}

export default (state = initialState(), action) => {
    switch (action.type) {
        case USER_CREATED: 
        case USER_LOGIN_SUCCEEDED:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                isFetchingData: false,
                error: null
            }

            case USER_FETCH_SUCCEEDED:
            case API_KEY_REFRESHED:
                return {
                    ...state,
                    user: action.payload,
                    isAuthenticated: true,
                    isFetchingData: false,
                    error: null
                }

           
            case USER_CREATION_FAILED:
            case USER_FETCH_FAILED:
            case USER_LOGIN_FAILED: 
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                isFetchingData: false,
                isAuthenticated: false,
                error: action.payload
            }

            case USER_LOGGED_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                isFetchingData: false,
                isAuthenticated: false,
                error: null
            }

        case IS_FETCHING_USER:
            return ({
                ...state,
                isFetchingData: true
            })

        default:
            return state;
    }
}