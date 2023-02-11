import { getIngredients } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredientsAction() {
	return function (dispatch) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		});
		getIngredients()
			.then(checkReponse)
			.then((data) => {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					ingredients: data.data.map((item) => {
						item.count = 0;
						return item;
					}),
				});
			})
			.catch((e) => {
				dispatch({
					type: GET_INGREDIENTS_FAILED,
				});
			});
	};
}
