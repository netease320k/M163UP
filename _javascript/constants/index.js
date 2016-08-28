// export const repository = 'hufan-Akari/M163UP';
export const issues_url = `https://api.github.com/repos/${repository}/issues`;
export const labels_url = `https://api.github.com/repos/${repository}/labels`;

export const concatIssueURL = ({issueState = 'all', issueLabel = '', issuePage = 1}) => `${issues_url}?state=${issueState}&labels=${issueLabel}&page=${issuePage}`;

export const getRequest = (url, etag) => {

    const myHeaders = new Headers({
        'If-None-Match': etag,
        'Accept': 'application/vnd.github.v3.html+json'
        // 'Time-Zone':'Asia/Shanghai'
    });

    const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    return new Request(url, myInit);
};

export const convertDateTime = (dateTimeString) => new Date(dateTimeString).toLocaleString().replace(/GMT.*/,'');

export const relLinktoPagenumber = (relLink) => {
    const first = /<.*page=(\d*)>; rel=\"first\"/.exec(relLink);
    const last = /<.*page=(\d*)>; rel=\"last\"/.exec(relLink);
    const prev = /<.*page=(\d*)>; rel=\"prev\"/.exec(relLink);
    const next = /<.*page=(\d*)>; rel=\"next\"/.exec(relLink);
    return {
        first: first && parseInt(first[1]),
        last:  last  && parseInt(last[1]),
        prev:  prev  && parseInt(prev[1]),
        next:  next  && parseInt(next[1])
    }
};;


export const appVersion = 1.1;
