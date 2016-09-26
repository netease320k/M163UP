export const issues_url = `https://api.github.com/repos/${repository}/issues?state=all&per_page=100`;
export const labels_url = `https://api.github.com/repos/${repository}/labels`;

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

export const convertDateTime = (dateTimeString) => new Date(dateTimeString).toLocaleString().replace(/GMT.*/, '');


export const appVersion = 4;
