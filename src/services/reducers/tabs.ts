import { CHANGE_TAB, RESET_TAB } from "../actions/tabs";
import { TTabs } from "../actions/tabs";

type TChangeTabState = {
	activeTab: "one" | "two" | "three";
};

export const initialState: TChangeTabState = {
	activeTab: "one",
};

export const changeTab = (state = initialState, action: TTabs): TChangeTabState => {
	switch (action.type) {
		case CHANGE_TAB: {
			return {
				...state,
				activeTab: action.activeTab,
			};
		}
		case RESET_TAB: {
			return {
				...state,
				activeTab: initialState.activeTab,
			};
		}
		default: {
			return state;
		}
	}
};
