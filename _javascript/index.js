import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import app from "./reducers";
import App from "./components/App";
import thunkMiddleware from "redux-thunk";
import {initApp} from "./actions";
import logger from 'redux-logger'
import {appVersion} from './constants'

const appVersionFromLocalStorage = localStorage.getItem('appVersion')||0;
if (appVersionFromLocalStorage < appVersion) {
    localStorage.clear();
    localStorage.setItem('appVersion',appVersion);
}

let store = createStore(app, {
        appState: JSON.parse(localStorage.getItem('appState'))||{
            issueLabel: '',
            issueState: 'all',
            issuePage: 1,
        },
        caches: JSON.parse(localStorage.getItem('caches'))||{},
    }, applyMiddleware(
    thunkMiddleware,
    logger()
));


store.subscribe(() => {
    localStorage.setItem('appState', JSON.stringify(store.getState().appState));
    localStorage.setItem('caches', JSON.stringify(store.getState().caches));
});


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

store.dispatch(initApp(store.getState().caches));
