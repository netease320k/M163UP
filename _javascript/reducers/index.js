import {combineReducers} from "redux";
import {List, Map, Seq} from "immutable";
import {actions} from "../actions/actionTypes";

const appState = (state = Map({
    issueLabel: ':all',
    issueState: 'all',
    showDetail: false,
    loading: true
}), action)=> {
    return action.type === actions.CHANGE_APP_STATE ? state.merge({err: null}, action.appState) : state;
};

const labels = (state = List(), action) => {
    return action.type === actions.UPDATE_LABELS ? List(action.labels.map(({name, color}) => ({name, color}))) : state
};

const issues = (state = Map(), action)=> {
    return action.type === actions.UPDATE_ISSUES ?
        state.withMutations(state =>
            Seq(action.issues)
                .filterNot(issue => issue.pull_request !== undefined)
                .map(
                    ({
                        id,
                        title,
                        body_html,
                        state,
                        labels,
                        created_at,
                        updated_at,
                        closed_at,
                        assignee,
                        user:{login, html_url:user_url},
                        comments,
                        html_url
                    }) => ({
                        id,
                        title,
                        body_html,
                        state,
                        labels: labels.map(({name, color}) => ({name, color})),
                        created_at,
                        updated_at,
                        closed_at,
                        assignee: assignee && {login: assignee.login, html_url: assignee.html_url},
                        user: {login, html_url: user_url},
                        comments,
                        html_url
                    }
                    ))
                .reduce((map, issue)=> map.set(String(issue.id), issue), state)
        ) : state;

};

const etags = (state = Map(), action)=> {
    return action.type === actions.UPDATE_ETAGS || action.type === actions.INIT_ETAGS ? state.merge(Map(action.etag)) : state;
};

export const app = combineReducers({
    appState,
    issues,
    etags,
    labels,
});

export const initAppStore = app({}, {type: actions.INIT_APP});