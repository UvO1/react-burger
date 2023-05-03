import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";
import { TModal } from "../actions/modal";

type TViewModal = {
	isOpen: boolean;
};

export const initialState: TViewModal = {
	isOpen: false,
};
export const viewModal = (state = initialState, action: TModal): TViewModal => {
	switch (action.type) {
		case OPEN_MODAL: {
			return {
				...state,
				isOpen: true,
			};
		}
		case CLOSE_MODAL: {
			return {
				...state,
				isOpen: false,
			};
		}
		default: {
			return state;
		}
	}
};
