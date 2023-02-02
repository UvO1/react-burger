import { v4 as uuidv4 } from "uuid";
export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const CLEAR_BURGER = "CLEAR_BURGER";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const REPLACE_ITEMS = "REPLACE_ITEMS";

export function addIngredient(ingredient){
	return{
		type: ADD_INGREDIENT,
		payload: {
			...ingredient,
			uuid: uuidv4(),
		}
	}
}
