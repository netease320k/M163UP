import {appVersion} from "../constants";
import localforage from "localforage";
import {actions} from "../actions/actionTypes";

export const database = new class {
    constructor(appVersion) {
        localforage.config({
            name: 'NetEaseMusic320K',
            storeName: 'app',
        });
        (async ()=>{
            const v = await localforage.getItem('appVersion');
            if(v<appVersion){
                await localforage.clear();
                await localforage.setItem('appVersion',appVersion);
            }
        })();
        this.quotaExceeded = false;
        this.getItem = localforage.getItem;
    }

    setItem(key, value, successCallback) {
        if (localforage.driver() && !this.quotaExceeded) {
            localforage.setItem(key, value)
                .then(value => successCallback(value))
                .catch(e => {
                    if (e) {
                        if (e.code) {
                            switch (e.code) {
                                case 22:
                                    this.quotaExceeded = true;
                                    break;
                                case 1014:
                                    // Firefox
                                    if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                                        this.quotaExceeded = true;
                                    }
                                    break;
                                case e.QUOTA_ERR:
                                    this.quotaExceeded = true;
                                    break;
                            }
                        } else if (e.number === -2147024882) {
                            // Internet Explorer 8
                            this.quotaExceeded = true;
                        }
                    }
                });
        }
    }
}(appVersion);

export const storeDatabas = ({getState}) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case actions.CHANGE_APP_STATE:
            database.setItem('appState', getState().appState.toJS());
            break;
        case actions.UPDATE_LABELS:
            database.setItem('labels', getState().labels.toJS());
            break;
        case actions.UPDATE_ETAGS:
            database.setItem('etags', getState().etags.toJS());
            break;
        case actions.UPDATE_ISSUES:
            database.setItem('issues', getState().issues.toJS());
            break;
    }
};