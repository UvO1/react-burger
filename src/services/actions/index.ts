import { getIngredients } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";
import { IIngredient } from "../../components/app/app";
import { TAuthorization } from "./authorization";
import { TBurger } from "./burger";
import { TIngredientDetails } from "./card";
import { TIngredients } from "./ingredients";
import { TModal } from "./modal";
import { TOrder } from "./order";
import { IChangeMenu } from "./profile";
import { TTabs } from "./tabs";
import { TAppDispatch } from "../hooks";
import { IwsAction } from "./ws";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
    readonly isLoading?: boolean;
}
interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly hasError?: boolean;
	readonly ingredients: Array<IIngredient>;
    readonly isLoading?: boolean;
}
interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
	readonly hasError?: boolean;
    readonly isLoading?: boolean;
}

export type TGetIngredients = IGetIngredientsRequest | IGetIngredientsSuccess | IGetIngredientsFailed;

export type TProjectActions = TAuthorization 
| TBurger 
| TIngredientDetails
| TGetIngredients
| TIngredients
| TModal
| TOrder
| IChangeMenu
| TTabs
| IwsAction;


export function getIngredientsAction() {
	return function (dispatch: TAppDispatch) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		});
		getIngredients()
			.then(checkReponse)
			.then((data: any) => {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					ingredients: data.data.map((item: IIngredient) => {
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

export async function getIngredientsFunc() {
	return await getIngredients()
			.then(checkReponse)
			.then((data) => {
				return data;
			})
			.catch(() => {
				return null;
			});
}
