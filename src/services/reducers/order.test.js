import {viewOrderDetails} from "./order";
import * as types from "../actions/order";
import { initialState } from "./order";

describe('todos reducer', () =>{
    it('should return the initial state', () =>{
        expect(viewOrderDetails(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle VIEW_ORDER_DETAILS', () => {
        expect(viewOrderDetails([],{
            type: types.VIEW_ORDER_DETAILS,
            name: "name",
            number: 0,
            success: true,
        })).toEqual(
            {
                name: "name",
                number: 0,
                success: true,
            }
        )
    })
    it('should handle HIDE_ORDER_DETAILS', () => {
        expect(viewOrderDetails([],{
            type: types.HIDE_ORDER_DETAILS,
            name: "name",
            number: 0,
            success: true,
        })).toEqual(
            {
                name: "",
                number: null,
                success: false,
                isLoading: false,
                hasError: false,
            }
        )
    })
    it('should handle GET_ORDER_REQUEST', () => {
        expect(viewOrderDetails([],{
            type: types.GET_ORDER_REQUEST,
            name: "name",
            number: 0,
            success: true,
        })).toEqual(
            {
                isLoading: true,
            }
        )
    })
    it('should handle GET_ORDER_SUCCESS', () => {
        expect(viewOrderDetails([],{
            type: types.GET_ORDER_SUCCESS,
            name: "name",
            number: 0,
            success: true,
        })).toEqual(
            {
                isLoading: false,
				hasError: false,
            }
        )
    })
    it('should handle GET_ORDER_FAILED', () => {
        expect(viewOrderDetails([],{
            type: types.GET_ORDER_FAILED,
            name: "name",
            number: 0,
            success: true,
        })).toEqual(
            {
				hasError: true,
				isLoading: false,
            }
        )
    })
})