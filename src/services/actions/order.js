import { getOrder } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";

export const VIEW_ORDER_DETAILS = "VIEW_ORDER_DETAILS";
export const HIDE_ORDER_DETAILS = "HIDE_ORDER_DETAILS";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getOrderAction(fetchList) {
	return function (dispatch) {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		getOrder(fetchList)
			.then(checkReponse)
			.then((data) => {
				dispatch({
					type: "VIEW_ORDER_DETAILS",
					order: {
						name: data.name,
						number: data.order.number,
						success: data.success,
					},
				});
			})
			.catch((e) => {
				dispatch({
					type: "GET_ORDER_FAILED",
				});
			});
	};
}
