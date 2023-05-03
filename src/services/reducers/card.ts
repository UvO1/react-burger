import { IIngredient } from "../../components/types";
import {
	VIEW_INGREDIENT_DETAILS,
	HIDE_INGREDIENT_DETAILS,
} from "../actions/card";
import { TIngredientDetails } from "../actions/card";

type TViewIngredientDetails = {
	ingredient: IIngredient | null;
};

export const initialState: TViewIngredientDetails = {
	ingredient: null,
};
export const viewIngredientDetails = (state = initialState, action: TIngredientDetails): TViewIngredientDetails => {
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
				ingredient: null,
			};
		}
		default: {
			return state;
		}
	}
};
