import { v4 as uuidv4 } from "uuid";
import { IIngredient, IIngredientUuid } from "../../components/types";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const CLEAR_BURGER: "CLEAR_BURGER" = "CLEAR_BURGER";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const REPLACE_ITEMS: "REPLACE_ITEMS" = "REPLACE_ITEMS";


interface IAddBun{
	readonly type: typeof ADD_BUN;
	readonly buns: IIngredient;
}
interface IAddIngredient{
	readonly type: typeof ADD_INGREDIENT;
	readonly listIngredients?: Array<IIngredient>;
	readonly payload: IIngredientUuid;
}

interface IClearBurger{
	readonly type: typeof CLEAR_BURGER;
	readonly buns?: IIngredient;
	readonly listIngredients?: Array<IIngredient>;
}
interface IDeleteIngredient{
	readonly type: typeof DELETE_INGREDIENT;
	readonly listIngredients?: Array<IIngredient>;
	readonly uuid: string;
}
interface IReplaceItems{
	readonly type: typeof REPLACE_ITEMS;
	readonly listIngredients: Array<IIngredientUuid>;
	readonly hoverIndex: number;
	readonly dragIndex: number;
}

export type TBurger = IAddBun
| IAddIngredient
| IClearBurger
| IDeleteIngredient
| IReplaceItems;


export interface IAddIngredientAction {
	readonly type: typeof ADD_INGREDIENT;
	readonly payload: IIngredientUuid;

}


export function addIngredient(ingredient: IIngredient): IAddIngredientAction{
	return{
		type: ADD_INGREDIENT,
		payload: {
			...ingredient,
			uuid: uuidv4(),
		}
	}
}
