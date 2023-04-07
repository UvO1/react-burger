import { IMessages } from "../../components/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_START_USER: 'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_GET_MESSAGE_USER: 'WS_GET_MESSAGE_USER' = 'WS_GET_MESSAGE_USER';

interface IwsConnectionStart{
    readonly type: typeof WS_CONNECTION_START;
    readonly wsConnected?: boolean;
}
interface IwsConnectionStartUser{
    readonly type: typeof WS_CONNECTION_START_USER;
    readonly wsConnected?: boolean;
}

interface IwsConnectionSuccess{
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly wsConnected?: boolean;
}

interface IwsConnectionError{
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly wsConnected?: boolean;
}

interface IwsConnectionClosed{
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly wsConnected?: boolean;
}

interface IwsGetMessage{
    readonly type: typeof WS_GET_MESSAGE;
    readonly messages?: any;
    readonly payload: any;
}
interface IwsGetMessageUser{
    readonly type: typeof WS_GET_MESSAGE_USER;
    readonly messages?: any;
    readonly payload: any;
}

export type IwsAction = 
IwsConnectionStart
| IwsConnectionStartUser
| IwsConnectionSuccess
| IwsConnectionError
| IwsConnectionClosed
| IwsGetMessage
| IwsGetMessageUser;

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
  };

export const wsConnectionSuccess = () => {
    return {
      type: WS_CONNECTION_SUCCESS
    };
  };
  
  export const wsConnectionError = (): IwsConnectionError => {
    return {
      type: WS_CONNECTION_ERROR
    };
  };
  
  export const wsConnectionClosed = (): IwsConnectionClosed => {
    return {
      type: WS_CONNECTION_CLOSED
    };
  };
  
  export const wsGetMessage = (message:IMessages): IwsGetMessage => {
    return {
      type: WS_GET_MESSAGE,
      payload: message,
    };
  };

  export const wsGetMessageUser = (message:IMessages): IwsGetMessageUser => {
    return {
      type: WS_GET_MESSAGE_USER,
      payload: message,
    };
  };
