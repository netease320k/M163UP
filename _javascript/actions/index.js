import fetch from "isomorphic-fetch";
import {concatIssueURL, getRequest, labels_url} from "../constants";

const fetchData = (url, etag)=> (dispatch) => fetch(
    getRequest(url, etag),
    {timeout: 10000}
).then((response)=> {
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    }
    if (response.ok) {
        let new_etag = response.headers.get('etag');
        let link = response.headers.get('link');
        return response.json().then((data)=> {
            dispatch(updateCache(url, {etag: new_etag, data,link}))
        })
    }
    else {
        let {status, statusText} = response;
        return {type: 'IGNORE_ME', status, statusText};
    }
});


export const changeAppState = ({issueLabel, issueState, issuePage = 1, appState, caches}) => (dispatch) => {

    const newAppState = {
        issueLabel: issueLabel === undefined ? appState.issueLabel : issueLabel,
        issueState: issueState || appState.issueState,
        issuePage,
    };


    dispatch({
        type: 'CHANGE_APP_STATE',
        appState: newAppState
    });

    const url = concatIssueURL(newAppState);

    const etag = caches[url] ? caches[url].etag : '';

    dispatch(fetchData(url,etag));

};

export const initApp = (caches)=> (dispatch) => {
    const labels_etag = caches[labels_url] ? caches[labels_url].etag : '';
    const issues_etag = caches[concatIssueURL({})] ? caches[concatIssueURL({})].etag : '';
    dispatch(fetchData(labels_url,labels_etag));
    dispatch(fetchData(concatIssueURL({}),issues_etag));
};



export const updateCache = (url, cache)=> ({
    type: 'UPDATE_CACHE',
    cache,
    url
});
