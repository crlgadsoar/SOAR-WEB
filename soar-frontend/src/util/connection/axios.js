import axios from 'axios';
import { message } from 'antd';

export const LOCAL_URL =
  process.env.NODE_ENV !== 'production'
    ? 'https://192.168.110.74:8083'
    : window.location.protocol +
      '//' +
      window.location.hostname +
      ':' +
      window.location.port; //it's configurable for production site
export const localUIServerInstance = axios.create({ baseURL: LOCAL_URL });
export const instance = axios.create({
  //baseURL: 'https://10.227.101.80:8443',

  timeout: 50000,
});
/**
 * Sets the base URL for the Axios instance and logs the new URL.
 */
export const setUrl = (_url) => {
  console.log('SET URL ', _url);
  instance.interceptors.request.use((config) => {
    config.baseURL = _url;
    return config;
  });
};
// export const getImageBasePath = () => {
//   return process.env.NODE_ENV === 'production'
//     ? 'https://' + window.location.hostname + ':443/images/'
//     : 'https://192.168.140.155:443/images/';
// };

// export const getHelpProjectPath = () => {
//   return process.env.NODE_ENV === 'production'
//     ? 'https://' + window.location.hostname + ':9000/'
//     : 'https://ss.dmrc.org:9000/';
// };

if (localStorage.getItem('token')) {
  //instance2.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
  instance.defaults.headers.common['token'] = localStorage.getItem('token');
}
//AXIOS RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  (response) => {
    // if (response.data.name === 'TokenError') {
    //   console.devLog('Token Error', response);
    //   //REDIRECT TO LOGIN PAGE PENDING ON TOKEN ERROR
    //   localStorage.removeItem('token');
    //   window.location.reload();
    // }
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      process.env.NODE_ENV === 'development' &&
        message.error({
          content: 'TIMEOUT NETWORK ERROR',
          key: 'UI',
        });
      console.devLog('TIMEOUT_NETWORK_ERROR', error);
    } else if (error.toString().indexOf('500') !== -1) {
      // message.error({
      //   content: "INTERNAL SERVER ERROR",
      //   key: "UI",
      // });
      console.devLog('INTERNAL_SERVER_ERROR', error);
    }
    return Promise.reject(error.message);
  },
);

/**
 * Sets the authentication token for making requests with the instance.
 */
export const setAuthToken = (token) => {
  instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  if (token) {
    //applying token
    //instance2.defaults.headers.common["Authorization"] = "Bearer " + token;
    instance.defaults.headers.common['token'] = localStorage.getItem('token');
    //console.devLog("Token setAuthToken", token);
  } else {
    //deleting the token from header
    // delete instance2.defaults.headers.common["Authorization"];
    delete instance.defaults.headers.common['X-DreamFactory-Session-Token'];
  }
};
setAuthToken(localStorage.getItem('token'));
