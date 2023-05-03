import {
	VIEW_ORDER_DETAILS,
	HIDE_ORDER_DETAILS,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAILED,
} from "../actions/order";
import { TOrder } from "../actions/order";

export type TViewOrderDetails = {
	name: string,
	number: number | null,
	success: boolean,
	isLoading: boolean,
	hasError: boolean,
};


export const initialState: TViewOrderDetails = {
	name: "",
	number: null,
	success: false,
	isLoading: false,
	hasError: false,
};
export const viewOrderDetails = (state = initialState, action: TOrder): TViewOrderDetails => {
	switch (action.type) {
		case VIEW_ORDER_DETAILS: {
			return {
				...state,
				name: action.name,
				number: action.number,
				success: action.success,
			};
		}
		case HIDE_ORDER_DETAILS: {
			return initialState;
		}

		case GET_ORDER_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case GET_ORDER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				hasError: false,
			};
		}
		case GET_ORDER_FAILED: {
			return {
				...state,
				hasError: true,
				isLoading: false,
			};
		}
		default: {
			return state;
		}
	}
};
