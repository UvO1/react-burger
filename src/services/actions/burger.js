export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const CLEAR_BURGER = "CLEAR_BURGER";
export const FILL_BURGER = "FILL_BURGER";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const REPLACE_ITEMS = "REPLACE_ITEMS";
export function fillBurger(ingredients) {
	return function (dispatch) {
		dispatch({
			type: CLEAR_BURGER,
		});
		ingredients.map((element) => {
			if (element.type === "bun") {
				dispatch({
					type: ADD_BUN,
					buns: element,
				});
			} else {
				dispatch({
					type: ADD_INGREDIENT,
					ingredient: element,
				});
			}
		});
	};
}
