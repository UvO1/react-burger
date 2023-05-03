import {changeTab} from "./tabs";
import * as types from "../actions/tabs";

describe('todos reducer', () =>{
    it('should return the initial state', () =>{
        expect(changeTab(undefined, {})).toEqual(
            {
                activeTab: "one",
            }
        )
    })
    it('should handle CHANGE_TAB', () => {
        expect(changeTab([],{
            type: types.CHANGE_TAB,
            activeTab: "one",
        })).toEqual(
            {
                activeTab: "one",
            }
        )
        expect(changeTab([],{
            type: types.CHANGE_TAB,
            activeTab: "two",
        })).toEqual(
            {
                activeTab: "two",
            }
        )
        expect(changeTab([],{
            type: types.CHANGE_TAB,
            activeTab: "three",
        })).toEqual(
            {
                activeTab: "three",
            }
        )
    })
    it('should handle RESET_TAB', () => {
        expect(changeTab([],{
            type: types.RESET_TAB,
            activeTab: "one",
        })).toEqual(
            {
                activeTab: "one",
            }
        )
        expect(changeTab([],{
            type: types.RESET_TAB,
            activeTab: "two",
        })).toEqual(
            {
                activeTab: "one",
            }
        )
        expect(changeTab([],{
            type: types.RESET_TAB,
            activeTab: "three",
        })).toEqual(
            {
                activeTab: "one",
            }
        )
    })
    
})