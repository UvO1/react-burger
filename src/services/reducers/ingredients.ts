import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from "../actions/index";
import {
	INCREASE_INGREDIENT,
	DECREASE_INGREDIENT,
	DECREASE_BUNS,
	CLEAR_COUNTERS,
} from "../actions/ingredients";
import { TIngredients } from "../actions/ingredients";
import { IIngredient } from "../../components/app/app";

type TIngredientsState = {
	isLoading: boolean,
	hasError: boolean,
	ingredients: Array<IIngredient>,
	id?: string;
}

const initialState: TIngredientsState = {
	isLoading: false,
	hasError: false,
	ingredients: [],
};
export const getIngredientsReducer = (state = initialState, action: TIngredients): TIngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				ingredients: action.ingredients,
				hasError: false,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return {
				...state,
				hasError: true,
				isLoading: false,
			};
		}
		case INCREASE_INGREDIENT: {
			return {
				...state,
				ingredients: [...state.ingredients].map((item) => {
					if (item._id === action.id) {
						if (item.type === "bun") item.count += 2;
						else item.count += 1;
					}
					return item;
				}),
			};
		}
		case DECREASE_INGREDIENT: {
			return {
				...state,
				ingredients: [...state.ingredients].map((item) => {
					if (item._id === action.id) {
						if (item.type === "bun") item.count -= 2;
						else item.count -= 1;
					}
					return item;
				}),
			};
		}
		case DECREASE_BUNS: {
			return {
				...state,
				ingredients: [...state.ingredients].map((item) => {
					if (item.type === "bun") {
						item.count = 0;
					}
					return item;
				}),
			};
		}
		case CLEAR_COUNTERS: {
			return{
				...state,
				ingredients: [...state.ingredients].map((item) => {
						item.count = 0;
					return item;
				}),
			}
		}
		default:
			return state;
	}
};
