import { getOrder } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";
import { CLEAR_BURGER } from "./burger";
import { CLEAR_COUNTERS } from "./ingredients";
import { TAppDispatch } from "../hooks";

export const VIEW_ORDER_DETAILS: "VIEW_ORDER_DETAILS" = "VIEW_ORDER_DETAILS";
export const HIDE_ORDER_DETAILS: "HIDE_ORDER_DETAILS" = "HIDE_ORDER_DETAILS";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

interface IViewOrderDetails{
	readonly type: typeof VIEW_ORDER_DETAILS;
	readonly name: string,
	readonly number: number,
	readonly success: boolean,
}

interface IHideOrderDetails{
	readonly type: typeof HIDE_ORDER_DETAILS;
	readonly name?: string,
	readonly number?: number | null,
	readonly success?: boolean,
	readonly isLoading?: boolean,
	readonly hasError?: boolean,
}

interface IGetOrderRequest{
	readonly type: typeof GET_ORDER_REQUEST;
	readonly isLoading?: boolean,
}

interface IGetOrderFailed{
	readonly type: typeof GET_ORDER_FAILED;
	readonly isLoading?: boolean,
	readonly hasError?: boolean,
}

interface IGetOrderSuccess{
	readonly type: typeof GET_ORDER_SUCCESS;
	readonly isLoading: boolean,
	readonly hasError: boolean,
}

export type TOrder = IViewOrderDetails 
	| IHideOrderDetails 
	| IGetOrderFailed 
	| IGetOrderSuccess 
	| IGetOrderRequest;

export function getOrderAction(fetchList: Array<string>) {
	return function (dispatch: TAppDispatch) {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		getOrder(fetchList)
			.then(checkReponse)
			.then((data: any) => {
				dispatch({
					type: VIEW_ORDER_DETAILS,
					name: data.name,
					number: data.order.number,
					success: data.success,
				});
				dispatch({
					type: CLEAR_BURGER
				})
				dispatch({
					type: CLEAR_COUNTERS
				})
			})
			.catch(() => {
				dispatch({
					type: GET_ORDER_FAILED
				});
			});
	};
}
