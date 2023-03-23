import {
	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	LOGIN_USER_FAILED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_REQUEST,
	REFRESH_TOKEN_FAILED,
	REFRESH_TOKEN_SUCCESS,
	REFRESH_TOKEN_REQUEST,
	LOGOUT_USER_FAILED,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_REQUEST,
	SAVE_USER_FAILED,
	SAVE_USER_SUCCESS,
	SAVE_USER_REQUEST,
	GET_USER_FAILED,
	GET_USER_SUCCESS,
	GET_USER_REQUEST,
} from "../actions/authorization";
import { TAuthorization } from "../actions/authorization";
import { IAutorizationUser } from "../../pages/profile";
type TAuthorizationState = {
	accessToken?: string,
	refreshToken?: string,
	user: IAutorizationUser,
	isAuthorized?: boolean,
	isLoadingCreate?: boolean,
	hasErrorCreate?: boolean,
	isLoadingLogin: boolean,
	hasErrorLogin: boolean,
	isLoadingToken: boolean,
	hasErrorToken: boolean,
	isLoadingSave?: boolean,
	hasErrorSave?: boolean,
	isLoadingGetUser?: boolean,
	hasErrorGetUser?: boolean,
	isLoadingLogout?: boolean,
	hasErrorLogout?: boolean,
};

const initialState: TAuthorizationState = {
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
};

export const authorizationReducer = (state = initialState, action: TAuthorization): TAuthorizationState => {
	switch (action.type) {
		case CREATE_USER_REQUEST: {
			return {
				...state,
				isLoadingCreate: true,
			};
		}
		case CREATE_USER_SUCCESS: {
			return {
				...state,
				isLoadingCreate: false,
				hasErrorCreate: false,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken,
				user: action.user,
				isAuthorized: true,
			};
		}
		case CREATE_USER_FAILED: {
			return {
				...state,
				isLoadingCreate: false,
				hasErrorCreate: true,
			};
		}
		case LOGIN_USER_REQUEST: {
			return {
				...state,
				isLoadingLogin: true,
			};
		}
		case LOGIN_USER_SUCCESS: {
			return {
				...state,
				isLoadingLogin: false,
				hasErrorLogin: false,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken,
				user: action.user,
				isAuthorized: true,
			};
		}
		case LOGIN_USER_FAILED: {
			return {
				...state,
				isLoadingLogin: false,
				hasErrorLogin: true,
			};
		}
		case REFRESH_TOKEN_REQUEST: {
			return {
				...state,
				isLoadingToken: true,
			};
		}
		case REFRESH_TOKEN_SUCCESS: {
			return {
				...state,
				isLoadingToken: false,
				hasErrorToken: false,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken,
			};
		}
		case REFRESH_TOKEN_FAILED: {
			return {
				...state,
				isLoadingToken: false,
				hasErrorToken: true,
			};
		}
		case LOGOUT_USER_REQUEST: {
			return {
				...state,
				isLoadingLogout: true,
			};
		}
		case LOGOUT_USER_SUCCESS: {
			return {
				...state,
				isLoadingLogout: false,
				hasErrorLogout: false,
				accessToken: initialState.accessToken,
				refreshToken: initialState.refreshToken,
				user: initialState.user,
				isAuthorized: initialState.isAuthorized,
			};
		}
		case LOGOUT_USER_FAILED: {
			return {
				...state,
				isLoadingLogout: false,
				hasErrorLogout: true,
			};
		}
		case SAVE_USER_REQUEST: {
			return {
				...state,
				isLoadingSave: true,
			};
		}
		case SAVE_USER_SUCCESS: {
			return {
				...state,
				user: action.user,
				isLoadingSave: false,
				hasErrorSave: false,
			};
		}
		case SAVE_USER_FAILED: {
			return {
				...state,
				isLoadingSave: false,
				hasErrorSave: true,
			};
		}
		case GET_USER_REQUEST: {
			return {
				...state,
				isLoadingGetUser: true,
			};
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				user: {
					...state.user,
					name: action.user.name,
					email: action.user.email,
					password: '',
				},
				isAuthorized: true,
				isLoadingGetUser: false,
				hasErrorGetUser: false,
			};
		}
		case GET_USER_FAILED: {
			return {
				...state,
				isLoadingGetUser: false,
				hasErrorGetUser: true,
			};
		}
		default: {
			return state;
		}
	}
};
