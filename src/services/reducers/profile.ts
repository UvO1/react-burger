import{ CHANGE_MENU } from "../actions/profile";
import { IChangeMenu } from "../actions/profile";

type TProfileMenu = {
    isActiveMenu: 'profile' | 'orders' | 'constructor';
}

const initialState: TProfileMenu = {
    isActiveMenu: 'profile',
};

export const profileMenuReducer = (state = initialState, action: IChangeMenu): TProfileMenu => {
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