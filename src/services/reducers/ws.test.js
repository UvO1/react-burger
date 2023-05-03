import {wsReducer} from "./ws";
import * as types from "../actions/ws";
import { initialState } from "./ws";

describe('todos reducer', () =>{
    it('should return the initial state', () =>{
        expect(wsReducer(undefined, {})).toEqual(
            /*{
                wsConnected: false,
                messages: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0,
                },
                messagesUser: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0,
                },
            }*/ initialState
        )
    });
    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer({
            wsConnected: false,
        },{
            type: types.WS_CONNECTION_SUCCESS
        })).toEqual(
            {
                wsConnected: true,
            }
        )
    })
    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer([],{
            type: types.WS_CONNECTION_ERROR
        })).toEqual(
            {
                wsConnected: false,
            }
        )
    })
    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer({
            wsConnected: true,
        },{
            type: types.WS_CONNECTION_CLOSED
        })).toEqual(
            {
                wsConnected: false,
            }
        )
    })
    it('should handle WS_GET_MESSAGE', () => {
        expect(wsReducer([],{
            type: types.WS_GET_MESSAGE,
            payload: {
                success: false,
                orders: ["1", "2"],
                total: 100,
                totalToday: 10
            }
        })).toEqual(
            {
                messages: {
                    success: false,
                    orders: ["1", "2"],
                    total: 100,
                    totalToday: 10
                }
            }
        )
    })
    it('should handle WS_GET_MESSAGE_USER', () => {
        expect(wsReducer([],{
            type: types.WS_GET_MESSAGE_USER,
            payload: {
                success: false,
                orders: ["1", "2"],
                total: 100,
                totalToday: 10
            }
        })).toEqual(
            {
                messagesUser: {
                    success: false,
                    orders: ["1", "2"],
                    total: 100,
                    totalToday: 10
                }
            }
        )
    })
});