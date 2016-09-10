import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import {app, initAppStore} from "./reducers";
import App from "./components/App";
import thunkMiddleware from "redux-thunk";
import {initApp} from "./actions";
import {storeDatabas, database} from "./middlewares";
import {Map, List} from "immutable";

const middlewares = [thunkMiddleware, storeDatabas];

if (process.env.NODE_ENV === `development`) {
    const createLogger = require(`redux-logger`);
    const logger = createLogger();
    middlewares.push(logger);
}

(async()=> {
    const etags = await database.getItem('etags');
    const labels = await database.getItem('labels');
    const appState = await database.getItem('appState');
    const issues = await database.getItem('issues');

    const store = compose(applyMiddleware(...middlewares))(createStore)(app, {
            etags: Map(etags || initAppStore.etags),
            labels: List(labels || initAppStore.labels),
            appState: Map(appState || initAppStore.appState).set('loading',true),
            issues: Map(issues || initAppStore.issues)
        }
    );

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.querySelector('.site-content')
    );

    store.dispatch(initApp(store.getState().etags));

})();

console.info(`这里是 ${site.github.project_tagline}`);
console.info(`欢迎加入我们的项目建设 ${site.github.repository_url}`);