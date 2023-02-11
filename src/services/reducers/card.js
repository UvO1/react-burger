import {
	VIEW_INGREDIENT_DETAILS,
	HIDE_INGREDIENT_DETAILS,
} from "../actions/card";

const initialState = {
	ingredient: {},
};
export const viewIngredientDetails = (state = initialState, action) => {
	switch (action.type) {
		case VIEW_INGREDIENT_DETAILS: {
			return {
				...state,
				ingredient: action.ingredient,
			};
		}
		case HIDE_INGREDIENT_DETAILS: {
			return {
				...state,
				ingredient: {},
			};
		}
		default: {
			return state;
		}
	}
};
