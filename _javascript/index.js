import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware,compose} from "redux";
import app from "./reducers";
import App from "./components/App";
import thunkMiddleware from "redux-thunk";
import {initApp} from "./actions";
import {appVersion} from './constants'

const initAppStore = {
    appState: {
        issueLabel: '',
        issueState: 'all',
        showDetail: false,
        loading: true
    },
    issues: {},
    etags: {},
    labels: [],
};

const database = new class {
    constructor(appVersion) {
        var mod = 'modernizr';
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            this.support = true;

            const appVersionFromLocalStorage = localStorage.getItem('appVersion') || 0;
            if (appVersionFromLocalStorage < appVersion) {
                localStorage.clear();
                localStorage.setItem('appVersion', appVersion);
            }
        } catch (e) {
            this.support = false;
        }
    }

    get app() {
        return this.support && {
                appState: JSON.parse(localStorage.getItem('appState')) || initAppStore.appState,
                issues: JSON.parse(localStorage.getItem('issues')) || initAppStore.issues,
                etags: JSON.parse(localStorage.getItem('etags')) || initAppStore.etags,
                labels: JSON.parse(localStorage.getItem('labels')) || initAppStore.labels
            }
    }

    set app(value) {
        if (this.support) {
            localStorage.setItem('appState', JSON.stringify(value.appState));
            localStorage.setItem('labels', JSON.stringify(value.labels));
            const storeIssuesWithEtags = (p = Object.keys(value.etags).length - 1) => {
                if (p < 1) {
                    console.log('cannot store,so sad!')
                }
                else {
                    const issue_to_store = Object.assign({}, ...[...new Array(p - 1).keys()]
                        .map(i => value.etags[i + 1].data)
                        .reduce((previousValue, currentValue)=> previousValue.concat(currentValue), [])
                        .map(id =>({[id]: value.issues[id]})));
                    const etags_to_store = Object.assign({}, [...new Array(p).keys()]
                        .map(i=>(value.etags[i])));
                    try {
                        localStorage.setItem('issues', JSON.stringify(issue_to_store));
                        localStorage.setItem('etags', JSON.stringify(etags_to_store));
                    }
                    catch (e) {
                        storeIssuesWithEtags(p - 1);
                    }

                }

            };
            try {
                localStorage.setItem('issues', JSON.stringify(value.issues));
                localStorage.setItem('etags', JSON.stringify(value.etags));
            }
            catch (e) {
                storeIssuesWithEtags();
            }
        }
    }
}(appVersion);


const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
    const createLogger = require(`redux-logger`);
    const logger = createLogger();
    middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(app,database.app||initAppStore);

store.subscribe(() => database.app = store.getState());


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);


store.dispatch(initApp(store.getState().etags));
