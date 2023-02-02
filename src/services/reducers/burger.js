import {
	ADD_BUN,
	ADD_INGREDIENT,
	CLEAR_BURGER,
	DELETE_INGREDIENT,
	REPLACE_ITEMS,
} from "../actions/burger";


const initialState = {
	buns: null,
	listIngredients: [],
};

export const burgerReducer = (state = initialState, action) => {
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
			let item = [];
			for (let key in action.listIngredients) {
				item[key] = action.listIngredients[key];
			}
			const item2 = item.splice(action.dragIndex, 1)[0];
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
