import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import App from './components/app/app';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware } from 'redux';
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import {rootReducer} from './services/reducers/index';
import thunk from 'redux-thunk';
import { wsMiddleware } from './utils/middleware';
import { wsActions } from './services/actions/ws';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const root: Root = ReactDOM.createRoot(
  document.getElementById('root')!
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware("wss://norma.nomoreparties.space/orders/all", wsActions)));
const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
