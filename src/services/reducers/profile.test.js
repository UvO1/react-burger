import {profileMenuReducer} from "./profile";
import * as types from "../actions/profile";
import { initialState } from "./profile";

describe('todos reducer', () =>{
    it('should return the initial state', () =>{
        expect(profileMenuReducer(undefined, {})).toEqual(
            /*{
                isActiveMenu: 'profile',
            }*/
            initialState
        )
    })
    it('should handle CHANGE_MENU', () => {
        expect(profileMenuReducer([],{
            type: types.CHANGE_MENU,
            isActiveMenu: 'orders'
        })).toEqual(
            {
                isActiveMenu: 'orders',
            }
        )
        expect(profileMenuReducer([],{
            type: types.CHANGE_MENU,
            isActiveMenu: 'profile'
        })).toEqual(
            {
                isActiveMenu: 'profile',
            }
        )
        expect(profileMenuReducer([],{
            type: types.CHANGE_MENU,
            isActiveMenu: 'constructor'
        })).toEqual(
            {
                isActiveMenu: 'constructor',
            }
        )
    })
    
})