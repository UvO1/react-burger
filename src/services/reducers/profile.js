import{ CHANGE_MENU } from "../actions/profile";

const initialState = {
    isActiveMenu: 'profile',
};

export const profileMenuReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_MENU:{
            return{
                ...state,
                isActiveMenu: action.isActiveMenu, 
            };
        }
        default:{
            return state;
        }
    }
}