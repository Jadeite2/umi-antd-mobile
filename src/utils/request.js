import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import { setUrlEncoded } from './baseServer';
import { getToken, setToken } from './token';
import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorText = codeMessage[response.status] || response.statusText;
  Toast.fail(errorText, 1);
  const error = new Error(errorText);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  // body 添加token
  if (newOptions.body) {
    newOptions.body.__token__ = getToken();
  } else {
    newOptions.body = {
      __token__: getToken(),
    };
  }
  let new_url;
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (newOptions.contentType === 'application/json') {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else if (newOptions.contentType === 'formData') {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...newOptions.headers,
      };
      if (newOptions.body) {
        newOptions.body = setUrlEncoded(newOptions.body);
      }
    }
    new_url = url
  } else if (newOptions.method === 'GET') {
    new_url = url + '?' + setUrlEncoded(newOptions.body)
    delete newOptions.body
  }

  return fetch(new_url, newOptions)
    .then(checkStatus)
    .then((response) => {
      return response.json();
    });
}

/**
 *  the proxy of request
 * @param url
 * @param options
 * @returns {*}
 */
function proxyRequest(url, options, showError = true) {
  options = options || {};
  return request(url, options).then((response) => {
    if (response && response.token) {
        setToken(response.token);
    }
    if (response.err_code === -1 || response.code === 1) {
      // return response.data || {};
      return response || {};
    }
    if (showError) {
      if (response.code !== 403){
        Toast.fail(response.msg, 1)
      }
    }
      const e = new Error();
      e.code = response.code;
      e.message = response.message || `Failed to get data code : ${e.code}`;
      throw e;
  }).catch((e,url) => {
    console.log(e,'errrr')
    const status = e.code;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      if (status === 403) {
        router.push('/login');
        return;
      }
      if (status <= 504 && status >= 500) {
        // router.push('/login');
        return;
      }
      if (status >= 404 && status < 422) {
        // router.push('/404');
        return;
      }
  });
}

proxyRequest.get = (url, data, options, showError) => {
  options = options || {};
  options.body = data || {};
  options.method = 'GET';
  return proxyRequest(url, options, showError);
};

proxyRequest.post = (url, data, options, showError) => {
  options = options || {};
  options.body = data || {};
  options.method = 'POST';
  return proxyRequest(url, options, showError);
};

proxyRequest.put = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'PUT';
  return proxyRequest(url, options);
};

proxyRequest.delete = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'DELETE';
  return proxyRequest(url, options);
};

export default proxyRequest;
