import { couldStartTrivia } from "typescript";
import { checkReponse, createUser, deleteCookie, loginUser, logoutUser, refreshToken } from "../../utils/burger-api";
import { setCookie } from "../../utils/burger-api";
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILED = "LOGOUT_USER_FAILED";
export const SAVE_USER_REQUEST = "SAVE_USER_REQUEST";
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const SAVE_USER_FAILED = "SAVE_USER_FAILED";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export function createUserAction(email, password, name){
    return function(dispatch){
        dispatch({
            type: CREATE_USER_REQUEST,
        });
        createUser(email, password, name)
        .then(checkReponse)
        .then((data) => {
            if(data.success){
                dispatch({
                    type: CREATE_USER_SUCCESS,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    user: {
                        name: data.user.name,
                        email: data.user.email,
                        password: password,
                    }
                });
                setCookie("accessToken", data.accessToken, {expires: 1200});
                localStorage.setItem("refreshToken", data.refreshToken);
            }
            else{
                dispatch({
                    type: CREATE_USER_FAILED,
                });
            }

        })
        .catch((e) => {
            dispatch({
                type: CREATE_USER_FAILED,
            });
        });
    };
}

export function loginUserAction(email, password){
    return function(dispatch){
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        loginUser(email, password)
            .then(checkReponse)
            .then((data) => {
                if(data.success){
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        user: data.user,
                    });
                }
            })
            .catch((e) => {
                dispatch({
                    type: LOGIN_USER_FAILED,
                });
            });
    }
}

export function refreshTokenAction(token){
    return function(dispatch){
        dispatch({
            type: REFRESH_TOKEN_REQUEST,
        });
        refreshToken(token)
        .then(checkReponse)
        .then((data) => {
            if(data.success){
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                });
            }
            else{
                dispatch({
                    type: REFRESH_TOKEN_FAILED,
                });
            }
        })
        .catch((e) => {
            dispatch({
                type: REFRESH_TOKEN_FAILED,
            });
        });
    };
}

export function logoutUserAction(token){
    return function(dispatch){
        dispatch({
            type: LOGOUT_USER_REQUEST,
        });
        if(token){
            logoutUser(token)
            .then(checkReponse)
            .then((data) => {
                if(data.success){
                    dispatch({
                        type: LOGOUT_USER_SUCCESS
                    });
                    localStorage.removeItem("refreshToken");
                    deleteCookie("accessToken");
                }
                else{
                    dispatch({
                        type: LOGOUT_USER_FAILED,
                    });
                }
            })
            .catch((e) => {
                dispatch({
                    type: LOGOUT_USER_FAILED,
                });
            });
        }
        
    };
}
