import { combineReducers } from "redux";
import { getIngredientsReducer } from "./ingredients";
import { viewIngredientDetails } from "./card";
import { viewModal } from "./modal";
import { viewOrderDetails } from "./order";
import { burgerReducer } from "./burger";
import { changeTab } from "./tabs";
import { profileMenuReducer } from "./profile";
import { authorizationReducer } from "./authorization";
import { wsReducer } from "./ws";

export const rootReducer = combineReducers({
	ingredients: getIngredientsReducer,
	card: viewIngredientDetails,
	modal: viewModal,
	order: viewOrderDetails,
	burger: burgerReducer,
	tabs: changeTab,
	profile: profileMenuReducer,
	authorization: authorizationReducer,
	ws: wsReducer
});
