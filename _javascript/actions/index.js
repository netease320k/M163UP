import fetch from "isomorphic-fetch";
import {getRequest, labels_url, issues_url} from "../constants";

export const changeAppState = appState =>({
    type: 'CHANGE_APP_STATE',
    appState
});

export const updateEtags = ({url, etag, data, p })=> ({
    type: 'UPDATE_ETAGS',
    etag: {[p]: {etag, data}}
});

export const updateLabels = ({labels = []}) =>({
    type: 'UPDATE_LABELS',
    labels: labels.map(({name, color}) => ({name, color}))
});


export const updateIssues = ({issues = []}) => ({
    type: 'UPDATE_ISSUES',
    issues: issues.filter(issue => issue.pull_request === undefined).map(({
        id, title, body_html, state, labels, created_at, updated_at, closed_at, assignee, user:{login, html_url:user_url}, comments, html_url
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
});


const fetchData = ({url, etag, onSuccess})=>
    dispatch =>
        fetch(getRequest(url, etag), {timeout: 10 * 1000}).then(
            response => {
                if (response.status >= 400) {
                    //遇到错误,20秒钟后重试
                    setTimeout(()=>dispatch(fetchData({url, etag, onSuccess})), 20 * 1000);
                    throw new Error("Bad response from server");
                }
                if (response.ok) {
                    const new_etag = response.headers.get('etag');
                    const link = response.headers.get('link');
                    return response.json().then((data)=> onSuccess({data, etag: new_etag, link}))
                }
                else if (response.status == 304) {
                    //没有修改,5分钟后重新检测
                    setTimeout(()=>dispatch(fetchData({url, etag, onSuccess})), 5 * 60 * 1000);

                }
            });


export const initApp = etags =>
    dispatch => {
        dispatch(fetchLabels({etags}));
        dispatch(fetchIssues({etags}));
    };

const fetchLabels = ({etags})=>
    dispatch =>
        dispatch(fetchData({
            url: labels_url,
            etag: (etags[0] && etags[0].etag),
            onSuccess: ({data, etag:new_etag})=> {
                dispatch(updateLabels({labels: data}));
                dispatch(updateEtags({url: labels_url, etag: new_etag, p: 0}))
            }
        }));


const fetchIssues = ({url = issues_url, etags = [], p = 1}) =>
    dispatch =>
        dispatch(fetchData({
            url,
            etag: (etags[p] && etags[p].etag),
            onSuccess: ({data, etag:new_etag, link})=> {
                dispatch(updateIssues({issues: data}));
                dispatch(updateEtags({url, etag: new_etag, data: data.map(issue=>issue.id) , p}));
                const next = /<(.*)>; rel=\"next\"/.exec(link);
                if (next) {
                    dispatch(changeAppState({loading: true}));
                    setTimeout(()=>dispatch(fetchIssues({url: next[1], etags, p: p + 1})), 10 * 1000)
                }
                else {
                    dispatch(changeAppState({loading: false}))
                }
            }
        }));

