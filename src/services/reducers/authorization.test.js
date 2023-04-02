import {authorizationReducer} from "./authorization";
import * as types from "../actions/authorization";

describe('todos reducer', () =>{
    it('should return the initial state', () =>{
        expect(authorizationReducer(undefined, {})).toEqual(
            {
                accessToken: "",
                refreshToken: "",
                user: {
                    email: "",
                    name: "",
                    password: "",
                },
                isAuthorized: false,
                isLoadingCreate: false,
                hasErrorCreate: false,
                isLoadingLogin: false,
                hasErrorLogin: false,
                isLoadingToken: false,
                hasErrorToken: false,
                isLoadingSave: false,
                hasErrorSave: false,
                isLoadingGetUser: false,
                hasErrorGetUser: false,
                isLoadingLogout: false,
                hasErrorLogout: false,
            }
        )
    })
    it('should handle CREATE_USER_REQUEST', () => {
        expect(authorizationReducer([],{
            type: types.CREATE_USER_REQUEST
        })).toEqual(
            {
                isLoadingCreate: true
            }
        )
    })
    it('should handle CREATE_USER_SUCCESS', () => {
        expect(authorizationReducer( [],
            {
            type: types.CREATE_USER_SUCCESS,
            accessToken:'tempAccessToken',
            refreshToken: 'tempRefreshToken',
            user: {
                email: "email",
                name: "name",
                password: "password",
            }
        })).toEqual(
            {
                isLoadingCreate: false,
				hasErrorCreate: false,
				accessToken: 'tempAccessToken',
				refreshToken: 'tempRefreshToken',
				user: {
                    email: "email",
                    name: "name",
                    password: "password"
                },
				isAuthorized: true,
            }
        )
    })
    it('should handle CREATE_USER_FAILED', () => {
        expect(authorizationReducer([],{
            type: types.CREATE_USER_FAILED
        })).toEqual(
            {
				isLoadingCreate: false,
				hasErrorCreate: true,
            }
        )
    })
    it('should handle LOGIN_USER_REQUEST', () => {
        expect(authorizationReducer([],{
            type: types.LOGIN_USER_REQUEST
        })).toEqual(
            {
                isLoadingLogin: true
            }
        )
    })
    it('should handle LOGIN_USER_SUCCESS', () => {
        expect(authorizationReducer( [],
            {
            type: types.LOGIN_USER_SUCCESS,
            accessToken:'tempAccessToken',
            refreshToken: 'tempRefreshToken',
            user: {
                email: "email",
                name: "name",
                password: "password",
            }
        })).toEqual(
            {
				isLoadingLogin: false,
				hasErrorLogin: false,
				accessToken: 'tempAccessToken',
				refreshToken: 'tempRefreshToken',
				user: {
                    email: "email",
                    name: "name",
                    password: "password"
                },
				isAuthorized: true,
            }
        )
    })
    it('should handle LOGIN_USER_FAILED', () => {
        expect(authorizationReducer([],{
            type: types.LOGIN_USER_FAILED
        })).toEqual(
            {
				isLoadingLogin: false,
				hasErrorLogin: true,
            }
        )
    })
    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(authorizationReducer([],{
            type: types.REFRESH_TOKEN_REQUEST
        })).toEqual(
            {
                isLoadingToken: true,
            }
        )
    })
    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(authorizationReducer( [],
            {
            type: types.REFRESH_TOKEN_SUCCESS,
            accessToken:'tempAccessToken',
            refreshToken: 'tempRefreshToken',
        })).toEqual(
            {
				isLoadingToken: false,
				hasErrorToken: false,
				accessToken: 'tempAccessToken',
				refreshToken: 'tempRefreshToken'
            }
        )
    })
    it('should handle REFRESH_TOKEN_FAILED', () => {
        expect(authorizationReducer([],{
            type: types.REFRESH_TOKEN_FAILED
        })).toEqual(
            {
				isLoadingToken: false,
				hasErrorToken: true,
            }
        )
    })
    it('should handle LOGOUT_USER_REQUEST', () => {
        expect(authorizationReducer([],{
            type: types.LOGOUT_USER_REQUEST
        })).toEqual(
            {
                isLoadingLogout: true,
            }
        )
    })
    it('should handle LOGOUT_USER_SUCCESS', () => {
        expect(authorizationReducer( [],
            {
            type: types.LOGOUT_USER_SUCCESS,
        })).toEqual(
            {
				isLoadingLogout: false,
				hasErrorLogout: false,
				accessToken: "",
                refreshToken: "",
                user: {
                    email: "",
                    name: "",
                    password: "",
                },
                isAuthorized: false,
            }
        )
    })
    it('should handle LOGOUT_USER_FAILED', () => {
        expect(authorizationReducer([],{
            type: types.LOGOUT_USER_FAILED
        })).toEqual(
            {
				isLoadingLogout: false,
				hasErrorLogout: true,
            }
        )
    })
    it('should handle SAVE_USER_REQUEST', () => {
        expect(authorizationReducer([],{
            type: types.SAVE_USER_REQUEST
        })).toEqual(
            {
                isLoadingSave: true,
            }
        )
    })
    it('should handle SAVE_USER_SUCCESS', () => {
        expect(authorizationReducer( [],
            {
            type: types.SAVE_USER_SUCCESS,
            user: {
                email: "email",
                name: "name",
                password: "password",
            }
        })).toEqual(
            {
                isLoadingSave: false,
				hasErrorSave: false,
				user: {
                    email: "email",
                    name: "name",
                    password: "password"
                }
            }
        )
    })
    it('should handle SAVE_USER_FAILED', () => {
        expect(authorizationReducer([],{
            type: types.SAVE_USER_FAILED
        })).toEqual(
            {
				isLoadingSave: false,
				hasErrorSave: true
            }
        )
    })
    it('should handle GET_USER_REQUEST', () => {
        expect(authorizationReducer([],{
            type: types.GET_USER_REQUEST
        })).toEqual(
            {
                isLoadingGetUser: true,
            }
        )
    })
    it('should handle GET_USER_SUCCESS', () => {
        expect(authorizationReducer( [],
            {
            type: types.GET_USER_SUCCESS,
            user: {
                email: "email",
                name: "name",
                password: "",
            }
        })).toEqual(
            {
				isLoadingGetUser: false,
				hasErrorGetUser: false,
				user: {
                    email: "email",
                    name: "name",
                    password: ""
                },
				isAuthorized: true,
            }
        )
    })
    it('should handle GET_USER_FAILED', () => {
        expect(authorizationReducer([],{
            type: types.GET_USER_FAILED
        })).toEqual(
            {
				isLoadingGetUser: false,
				hasErrorGetUser: true,
            }
        )
    })
})