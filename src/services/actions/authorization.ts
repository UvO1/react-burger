import { checkReponse, createUser, deleteCookie, loginUser, logoutUser, refreshToken } from "../../utils/burger-api";
import { setCookie } from "../../utils/burger-api";
import { IAutorizationUser } from "../../pages/profile";
import { TAppDispatch } from "../hooks";

export const CREATE_USER_REQUEST: "CREATE_USER_REQUEST" = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS" = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED: "CREATE_USER_FAILED" = "CREATE_USER_FAILED";
export const LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST" = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS" = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED: "LOGIN_USER_FAILED" = "LOGIN_USER_FAILED";
export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS" = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED" = "REFRESH_TOKEN_FAILED";
export const LOGOUT_USER_REQUEST: "LOGOUT_USER_REQUEST" = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS" = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILED: "LOGOUT_USER_FAILED" = "LOGOUT_USER_FAILED";
export const SAVE_USER_REQUEST: "SAVE_USER_REQUEST" = "SAVE_USER_REQUEST";
export const SAVE_USER_SUCCESS: "SAVE_USER_SUCCESS" = "SAVE_USER_SUCCESS";
export const SAVE_USER_FAILED: "SAVE_USER_FAILED" = "SAVE_USER_FAILED";
export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

interface ICreateUserRequest{
    readonly type: typeof CREATE_USER_REQUEST,
    readonly isLoadingCreate?: boolean,
}

interface ICreateUserSuccess{
    readonly type: typeof CREATE_USER_SUCCESS,
    readonly isLoadingCreate?: boolean,
    readonly hasErrorCreate?: boolean,
    readonly accessToken: string,
    readonly refreshToken: string,
    readonly user: IAutorizationUser,
    readonly isAuthorized?: boolean,
}

interface ICreateUserFailed{
    readonly type: typeof CREATE_USER_FAILED,
    readonly isLoadingCreate?: boolean,
    readonly hasErrorCreate?: boolean,
}

interface ILoginUserRequest{
    readonly type: typeof LOGIN_USER_REQUEST,
    readonly isLoadingLogin?: boolean,
}

interface ILoginUserSuccess{
    readonly type: typeof LOGIN_USER_SUCCESS,
    readonly isLoadingLogin?: boolean,
    readonly hasErrorLogin?: boolean,
    readonly accessToken: string,
    readonly refreshToken: string,
    readonly user: IAutorizationUser,
    readonly isAuthorized?: boolean,
}

interface ILoginUserFailed{
    readonly type: typeof LOGIN_USER_FAILED,
    readonly isLoadingLogin?: boolean,
    readonly hasErrorLogin?: boolean,
}

interface IRefreshTokenRequest{
    readonly type: typeof REFRESH_TOKEN_REQUEST,
    readonly isLoadingToken?: boolean,
}

interface IRefreshTokenSuccess{
    readonly type: typeof REFRESH_TOKEN_SUCCESS,
    readonly isLoadingToken?: boolean,
    readonly hasErrorToken?: boolean,
    readonly accessToken: string,
    readonly refreshToken: string,
}

interface IRefreshTokenFailed{
    readonly type: typeof REFRESH_TOKEN_FAILED,
    readonly isLoadingToken?: boolean,
    readonly hasErrorToken?: boolean,
}

interface ILogoutUserRequest{
    readonly type: typeof LOGOUT_USER_REQUEST,
    readonly isLoadingLogout?: boolean,
}

interface ILogoutUserSuccess{
    readonly type: typeof LOGOUT_USER_SUCCESS,
    readonly isLoadingLogout?: boolean,
    readonly hasErrorLogout?: boolean,
    readonly accessToken?: string,
    readonly refreshToken?: string,
    readonly user?: IAutorizationUser,
    readonly isAuthorized?: boolean,
}

interface ILogoutUserFailed{
    readonly type: typeof LOGOUT_USER_FAILED,
    readonly isLoadingLogout?: boolean,
    readonly hasErrorLogout?: boolean,
}

interface ISaveUserRequest{
    readonly type: typeof SAVE_USER_REQUEST,
    readonly isLoadingLogout?: boolean,
}

interface ISaveUserSuccess{
    readonly type: typeof SAVE_USER_SUCCESS,
    readonly isLoadingSave?: boolean,
    readonly hasErrorSave?: boolean,
    readonly user: IAutorizationUser,
}

interface ISaveUserFailed{
    readonly type: typeof SAVE_USER_FAILED,
    readonly isLoadingSave?: boolean,
    readonly hasErrorSave?: boolean,
}
interface IGetUserRequest{
    readonly type: typeof GET_USER_REQUEST,
    readonly isLoadingGetUser?: boolean,
}

interface IGetUserSuccess{
    readonly type: typeof GET_USER_SUCCESS,
    readonly isLoadingGetUser?: boolean,
    readonly hasErrorGetUser?: boolean,
    readonly user: IAutorizationUser,
    readonly isAuthorized?: boolean,
    readonly accessToken?: string,
    readonly refreshToken?: string | null,
}

interface IGetUserFailed{
    readonly type: typeof GET_USER_FAILED,
    readonly isLoadingGetUser?: boolean,
    readonly hasErrorGetUser?: boolean,
}

export type TAuthorization = ICreateUserRequest
| ICreateUserSuccess
| ICreateUserFailed
| ILoginUserRequest
| ILoginUserSuccess
| ILoginUserFailed
| IRefreshTokenRequest
| IRefreshTokenSuccess
| IRefreshTokenFailed
| ILogoutUserRequest
| ILogoutUserSuccess
| ILogoutUserFailed
| ISaveUserRequest
| ISaveUserSuccess
| ISaveUserFailed
| IGetUserRequest
| IGetUserSuccess
| IGetUserFailed;

export function createUserAction(email: string, password: string, name: string){
    return function(dispatch: TAppDispatch){
        dispatch({
            type: CREATE_USER_REQUEST,
        });
        createUser(email, password, name)
        .then(checkReponse)
        .then((data: any) => {
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
        .catch(() => {
            dispatch({
                type: CREATE_USER_FAILED,
            });
        });
    };
}

export function loginUserAction(email: string, password: string){
    return function(dispatch: TAppDispatch){
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        loginUser(email, password)
            .then(checkReponse)
            .then((data: any) => {
                if(data.success){
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        user: data.user,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_USER_FAILED,
                });
            });
    }
}

export function refreshTokenAction(){
    return function(dispatch: TAppDispatch){
        dispatch({
            type: REFRESH_TOKEN_REQUEST,
        });
        refreshToken()
        .then(checkReponse)
        .then((data: any) => {
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
        .catch(() => {
            dispatch({
                type: REFRESH_TOKEN_FAILED,
            });
        });
    };
}

export function logoutUserAction(token: string){
    return function(dispatch: TAppDispatch){
        dispatch({
            type: LOGOUT_USER_REQUEST,
        });
        if(token){
            logoutUser(token)
            .then(checkReponse)
            .then((data: any) => {
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
            .catch(() => {
                dispatch({
                    type: LOGOUT_USER_FAILED,
                });
            });
        }
        
    };
}
