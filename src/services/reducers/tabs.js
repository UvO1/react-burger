import { CHANGE_TAB, RESET_TAB } from "../actions/tabs";

const initialState = {
	activeTab: "one",
};

export const changeTab = (state = initialState, action) => {
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
