import type { Middleware, MiddlewareAPI } from 'redux';
import { TAppDispatch } from '../services/hooks';
import { RootState } from '..';
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_START, WS_CONNECTION_START_USER, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_GET_MESSAGE_USER } from '../services/actions/ws';
import { getCookie } from './burger-api';

export const wsMiddleware = (wsUrl: string, wsActions: any): Middleware => {
    return((store: MiddlewareAPI<TAppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let socketUser: WebSocket | null = null;
        return next => (action: any) => {
            const {dispatch, getState} = store;
            const {type, payload} = action;
            
            if(type === WS_CONNECTION_START){
                socket = new WebSocket(wsUrl);
            }
            if(type === WS_CONNECTION_START_USER){
                let tempAccess = getCookie("accessToken");
                let newUrl: string = '';
                if (tempAccess) newUrl = tempAccess.substring(7); 
                socketUser = new WebSocket('wss://norma.nomoreparties.space/orders'+'?token='+newUrl);
            }
            if (socket){
                socket.onopen = event => {
                    dispatch({
                        type: WS_CONNECTION_SUCCESS,
                        payload: event,
                    });
                }
                socket.onerror = event => {
                    dispatch({
                        type: WS_CONNECTION_ERROR,
                        payload: event,
                    });
                }
                socket.onmessage = event => {
                    const {data} = event;

                        dispatch({
                            type: WS_GET_MESSAGE,
                            payload: JSON.parse(data),
                        });

                }

                socket.onclose = event => {
                    dispatch({
                        type: WS_CONNECTION_CLOSED,
                        payload: event,
                    });
                }
            }
            if (socketUser){
                socketUser.onopen = event => {
                    dispatch({
                        type: WS_CONNECTION_SUCCESS,
                        payload: event,
                    });
                }
                socketUser.onerror = event => {
                    dispatch({
                        type: WS_CONNECTION_ERROR,
                        payload: event,
                    });
                }
                socketUser.onmessage = event => {
                    const {data} = event;
                        dispatch({
                            type: WS_GET_MESSAGE_USER,
                            payload: JSON.parse(data),
                        });
                    
                }

                socketUser.onclose = event => {
                    dispatch({
                        type: WS_CONNECTION_CLOSED,
                        payload: event,
                    });
                }
            }
            next(action);
        };
    }) as Middleware;
};