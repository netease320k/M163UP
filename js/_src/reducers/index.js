import {combineReducers} from 'redux'

const appState = (state = {
    issueLabel: '',
    issueState: 'all',
    issuePage: 1,
}, action)=> {
    return action.type === 'CHANGE_APP_STATE' ? action.appState : state;
};

const caches = (state = {}, action)=> {
    return action.type === 'UPDATE_CACHE' ? Object.assign({}, state, {[action.url]: action.cache}) : state;
};

const app = combineReducers({
    appState,
    caches
});

export default app