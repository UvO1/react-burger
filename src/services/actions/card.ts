import { IIngredient, IIngredientUuid } from "../../components/app/app";


export const VIEW_INGREDIENT_DETAILS: 'VIEW_INGREDIENT_DETAILS' = 'VIEW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS: 'HIDE_INGREDIENT_DETAILS' = 'HIDE_INGREDIENT_DETAILS';

interface IViewIngredientDetails{
    readonly type: typeof VIEW_INGREDIENT_DETAILS;
    readonly ingredient: IIngredient;
}

interface IHideIngredientDetails{
    readonly type: typeof HIDE_INGREDIENT_DETAILS;
    readonly ingredient?: IIngredient;
}

export type TIngredientDetails = IViewIngredientDetails
    | IHideIngredientDetails;