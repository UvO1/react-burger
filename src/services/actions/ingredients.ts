import { IIngredient } from "../../components/app/app";
import { TGetIngredients } from "../actions/index";
export const DECREASE_INGREDIENT: 'DECREASE_INGREDIENT' = 'DECREASE_INGREDIENT';
export const INCREASE_INGREDIENT: 'INCREASE_INGREDIENT' = 'INCREASE_INGREDIENT';
export const DECREASE_BUNS: 'DECREASE_BUNS' = 'DECREASE_BUNS';
export const CLEAR_COUNTERS: 'CLEAR_COUNTERS' = 'CLEAR_COUNTERS';

interface IDecreaseIngredient {
    readonly type: typeof DECREASE_INGREDIENT;
    readonly ingredients?: Array<IIngredient>;
    readonly id?: string;
}
interface IIncreaseIngredient {
    readonly type: typeof INCREASE_INGREDIENT;
    readonly ingredients?: Array<IIngredient>;
    readonly id?: string;
}

interface IDecreaseBuns {
    readonly type: typeof DECREASE_BUNS;
    readonly ingredients?: Array<IIngredient>;
}

interface IClearCounters {
    readonly type: typeof CLEAR_COUNTERS;
    readonly ingredients?: Array<IIngredient>;
}

export type TIngredients = IDecreaseIngredient 
| IIncreaseIngredient 
| IDecreaseBuns 
| IClearCounters
| TGetIngredients;