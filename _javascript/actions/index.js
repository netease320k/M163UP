import fetch from "isomorphic-fetch";
import {getRequest, labels_url, issues_url} from "../constants";
import {actions} from "./actionTypes";

export const changeAppState = appState =>({
    type: actions.CHANGE_APP_STATE,
    appState
});

export const updateEtags = ({url, etag, data, p, next})=> ({
    type: actions.UPDATE_ETAGS,
    etag: {[url]: {etag, data, next, p}}
});

export const updateLabels = ({labels}) =>({
    type: actions.UPDATE_LABELS,
    labels
});


export const updateIssues = ({issues}) => ({
    type: actions.UPDATE_ISSUES,
    issues
});


const fetchData = ({url, etag, onSuccess, onNotModified})=>
    dispatch =>
        fetch(getRequest(url, etag), {timeout: 10 * 1000})
            .then(
                response => {
                    const {status, statusText, ok} = response;
                    const xRateLimitRemaining = Number(response.headers.get('X-RateLimit-Remaining'));
                    const xRateLimitReset = new Date(response.headers.get('X-RateLimit-Reset') * 1000);
                    let timeOffset = 0;
                    if (xRateLimitRemaining <= 5) {
                        const now = new Date();
                        timeOffset = (xRateLimitReset - now ) / (xRateLimitRemaining+1) + 1000;
                    }

                    if (status >= 400) {
                        //遇到错误,10秒钟后重试
                        // setTimeout(()=>dispatch(fetchData({url, etag, onSuccess, onNotModified})),timeOffset);
                        dispatch(changeAppState({err: `网络连接出错,错误代码:${status},错误信息:${statusText}`}));
                        throw new Error("Bad response from server");
                    }
                    if (status == 304) {
                        dispatch(changeAppState({loading: false}));
                        onNotModified({timeOffset});
                        return;
                    }
                    if (ok) {
                        const new_etag = response.headers.get('etag');
                        const link = response.headers.get('link');
                        return response.json().then((data)=> onSuccess({data, etag: new_etag, link, timeOffset}))
                    }
                    console.log('We should not go here. What happened?')
                })
            .catch(error => {
                //超时,10秒钟后重试
                // setTimeout(()=>dispatch(fetchData({url, etag, onSuccess, onNotModified})), 10 * 1000);
                dispatch(changeAppState({err: `网络连接超时,错误信息:${error.message}`}));
            });


export const initApp = etags =>
    dispatch => {
        dispatch(fetchLabels({etags}));
        dispatch(fetchIssues({etags}));
    };

const fetchLabels = ({etags})=>
    dispatch =>{
        dispatch(fetchData({
            url: labels_url,
            etag: ((etags.get(labels_url)||{}).etag),
            onSuccess: ({data, etag:new_etag})=> {
                dispatch(updateLabels({labels: data}));
                dispatch(updateEtags({url: labels_url, etag: new_etag, p: 0}))
            },
            onNotModified:()=>{}
        }));
    };



const fetchIssues = ({url = issues_url, etags = [], p = 1}) =>
    dispatch =>
        dispatch(fetchData({
            url,
            etag: ((etags.get(url)||{}).etag),
            onSuccess: ({data, etag:new_etag, link, timeOffset})=> {
                dispatch(changeAppState({loading: false}));
                dispatch(updateIssues({issues: data}));
                const next = /<(.*)>; rel=\"next\"/.exec(link);
                dispatch(updateEtags({url, etag: new_etag, data: data.map(issue=>issue.id), p, next:next[1]}));
                if (next) {
                    dispatch(changeAppState({loading: true}));
                    setTimeout(()=> {
                        dispatch(fetchIssues({url: next[1], etags, p: p + 1}))
                    }, timeOffset)
                }
                else {
                    dispatch(changeAppState({loading: false}))
                }
            },
            onNotModified: ({timeOffset}) => {
                if (etags.get(url).next)
                    setTimeout(()=> {
                        dispatch(fetchIssues({url: etags.get(url).next, etags, p: p + 1}))
                    }, timeOffset)
            }
        }));

