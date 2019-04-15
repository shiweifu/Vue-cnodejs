import axios from 'axios';
import qs from 'qs';

export let BASE_URL = 'https://cnodejs.org/api/v1';

export let apiPaths = {
    GET_TOPICS: '/topics',
    GET_TOPIC_DETAIL: '/topic/',
    COLLECT_TOPIC: '/topic_collect/collect',
    UNCOLLECT_TOPIC: '/topic_collect/de_collect'
};

export function get(url, params) {
    if (!url.startsWith('http')) {
        url = `${BASE_URL}${url}`;
    }
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        });
    });
}

export function post(url, params) {
    if (!url.startsWith('http')) {
        url = `${BASE_URL}${url}`;
    }
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}
