import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
WS_GET_MESSAGE_USER} from "../actions/ws"
  import { IwsAction } from "../actions/ws";
import { IMessages } from "../../components/types";
    type TwsReducer = {
        wsConnected: boolean,
        messages: IMessages,
        messagesUser: IMessages,
    }

    export const initialState:TwsReducer = {
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
      };

export const wsReducer = (state = initialState, action:IwsAction): TwsReducer => {
    switch (action.type){
        case WS_CONNECTION_SUCCESS: {
            return{
                ...state,
                wsConnected: true,
            };
        }
        case WS_CONNECTION_ERROR:{
            return{
                ...state,
                wsConnected: false,
            };
        }
        case WS_CONNECTION_CLOSED:{
            return{
                ...state,
                wsConnected: false,
            };
        }
        
        case WS_GET_MESSAGE:{

            return{
                ...state,
                messages: {
                    success: action.payload.success,
                    orders: action.payload.orders,
                    total: action.payload.total,
                    totalToday: action.payload.totalToday
                }

            };
        }
        case WS_GET_MESSAGE_USER:{

            return{
                ...state,
                messagesUser: {
                    success: action.payload.success,
                    orders: action.payload.orders,
                    total: action.payload.total,
                    totalToday: action.payload.totalToday
                }

            };
        }
        default:
            return state;
            
    }
}


