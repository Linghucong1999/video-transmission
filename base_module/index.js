const axios = require('axios');

const authentication = ''; // 所有 Runway REST API 端点均通过作为 X-API-Key 标头传递的 API 密钥进行身份验证，X-API-Key: {YOUR_API_KEY}

const instance = axios.create({
    timeout: 70000, // 请求超时时间
    header: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求拦截器
instance.interceptors.request.use((config) => {
    config.headers['X-API-Key'] = authentication;
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应拦截器
instance.interceptors.response.use(response => {
    if (response.data.status) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response.data);
    }
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求';
                break;
            case 401:
                error.message = '未授权，请重新登录';
                break;
            case 403:
                error.message = '拒绝访问';
                break;
            case 404:
                error.message = '请求错误,未找到该资源';
                break;
            case 405:
                error.message = '请求方法未允许';
                break;
            case 408:
                error.message = '请求超时';
                break;
            case 500:
                error.message = '服务器端出错';
                break;
            case 501:
                error.message = '网络未实现';
                break;
            case 502:
                error.message = '网络错误';
                break;
            case 503:
                error.message = '服务不可用';
                break;
            case 504:
                error.message = '网络超时';
                break;
            default:
                error.message = `连接错误${error.response.message}`;
        }
    } else {
        error.message = "连接到服务器失败";
    }
    return Promise.reject(error.response);
})

class BaseModel {
    constructor() { }

    //get请求
    get(url, param, responseType, header) {
        return instance({
            method: 'get',
            url,
            params: param || {},
            headers: {
                ...(header || {})
            },
            responseType: responseType,
        });
    }

    //post请求
    post(url, param, header) {
        return instance({
            method: 'post',
            url,
            data: param || {},
            headers: {
                ...(header || {}),
                'Content-type': 'application/json;charset=UTF-8'
            }
        });
    }
    put(url, param, header) {
        return instance({
            method: 'put',
            url,
            data: param || {},
            headers: {
                ...(header || {}),
                'Content-type': 'application/json;charset=UTF-8'
            }
        });
    }
    delete(url, param, header) {
        return instance({
            method: 'delete',
            url,
            params: param || {},
            headers: {
                ...(header || {}),
            }
        });
    }
}

module.exports = new BaseModel();