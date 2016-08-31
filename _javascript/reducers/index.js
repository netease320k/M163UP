import {combineReducers} from 'redux'

const appState = (state = {
    issueLabel: '',
    issueState: 'all',
    showDetail: false,
    loading: true
}, action)=> {
    return action.type === 'CHANGE_APP_STATE' ? Object.assign({}, state, {err:null},action.appState) : state;
};

const labels = (state = [], action) => {
    return action.type === 'UPDATE_LABELS' ? action.labels : state
};

const issues = (state = {}, action)=> {
    return action.type === 'UPDATE_ISSUES' ? Object.assign({}, state, ...action.issues.map(i => ({[i.id]: i}))) : state;
};

const etags = (state = {}, action)=> {
    return action.type === 'UPDATE_ETAGS' ? Object.assign({}, state,action.etag): state
};

const app = combineReducers({
    appState,
    issues,
    etags,
    labels,
});

export default app