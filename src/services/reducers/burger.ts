import {
	ADD_BUN,
	ADD_INGREDIENT,
	CLEAR_BURGER,
	DELETE_INGREDIENT,
	REPLACE_ITEMS,
} from "../actions/burger";
import { TBurger } from "../actions/burger";
import { IIngredient, IIngredientUuid } from "../../components/types";

type TBurgerState = {
	buns: IIngredient | null;
	listIngredients: Array<IIngredientUuid>;
	payload: IIngredient | null;
};

const initialState: TBurgerState = {
	buns: null,
	listIngredients: [],
	payload: null,
};


export const burgerReducer = (state = initialState, action: TBurger): TBurgerState => {
	switch (action.type) {
		case ADD_BUN: {
			return {
				...state,
				buns: action.buns,
			};
		}
		case ADD_INGREDIENT: {
				return {
					...state,
					listIngredients: [...state.listIngredients, action.payload],
				};
			
		}
		case DELETE_INGREDIENT: {
			return {
				...state,
				listIngredients: [...state.listIngredients].filter(
					(item) => item.uuid !== action.uuid
				),
			};
		}
		case CLEAR_BURGER: {
			return {
				...state,
				buns: null,
				listIngredients: [],
			};
		}
		case REPLACE_ITEMS: {
			let item: Array<IIngredientUuid> = [];
			for (let key in action.listIngredients) {
				item[key] = action.listIngredients[key];
			}
			const item2: IIngredientUuid = item.splice(action.dragIndex, 1)[0];
			item.splice(action.hoverIndex, 0, item2);
			return {
				...state,
				listIngredients: item,
			};
		}
		default: {
			return state;
		}
	}
};
