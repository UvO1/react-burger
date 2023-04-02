import {viewModal} from "./modal";
import * as types from "../actions/modal";

describe('todos reducer', () =>{
    it('should return the initial state', () =>{
        expect(viewModal(undefined, {})).toEqual(
            {
                isOpen: false,
            }
        )
    })
    it('should handle OPEN_MODAL', () => {
        expect(viewModal([],{
            type: types.OPEN_MODAL
        })).toEqual(
            {
                isOpen: true,
            }
        )
    })
    it('should handle CLOSE_MODAL', () => {
        expect(viewModal([],{
            type: types.CLOSE_MODAL
        })).toEqual(
            {
                isOpen: false,
            }
        )
    })
})