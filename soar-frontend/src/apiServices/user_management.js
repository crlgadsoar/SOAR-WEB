import API_ENDPOINT_URL from './API_ENDPOINT_URL';
import {
  instance,
  setAuthToken,
  //localUIServerInstance,
} from 'util/connection/axios';

/**
 * A service object for managing user data and authentication.
 */
const UserManagementService = {
  reAuth: async function (token) {
    //TODO remove
    return {
      token: token,
      user_name: 'admin',
    };
    //TODO UNCOMMENT
    /*
    return instance
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_VERIFY_TOKEN, {
        token: token,
      })
      .then((res) => {
        console.devLog('Reauthentication Resp', res);

        if (res.data.response_type !== 'LOGGED_IN') {
          return new Error(`${res.data.remarks} (${res.data.response_type}) `);
        }

        if (!res.data.token) {
          return new Error(`${res.data.remarks} (${res.data.response_type}) `);
        }

        if (res.data.response_type === 'TOKEN_ERROR') {
          console.devLog('TokenError');
          return new Error(`${res.data.remarks} (${res.data.response_type}) `);
        }

        if (!res.data?.data) {
          console.devLog('Failure Reason ', res.data.response_type);
          return new Error(res.data.response_type);
        } else {
          //console.devLog('res.data else ', res.data);
          return {
            ...res.data.data,
            uniqueUserId: res.data.uniqueUserId,
            token: res.data.token,
          };
        }
      })
      .catch((err) => {
        console.devLog('error ', err);
        console.devLog('RABBIT MQ WAS DOWN + LAN WAS NOT WORKING');

        return new Error(
          err.toString().toUpperCase().indexOf('ERROR') === -1
            ? err
            : 'NETWORK ERROR',
        );
      });
      */
  },
  /**
   * Sign in a user with the provided username, password, and version.
   */
  signIn: async function ({ username, password, version }) {
    console.log('Credentials on signin=>', username, password, version);
    return instance
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_USER_LOGIN, {
        user_name: username,
        password: password,
        // playerId: '-1',
        // deviceType: 'WEB',
        version: version,
        uniqueUserId: 'usr',
        // username.toString().toUpperCase() +
        // Date.now().toString(36).toUpperCase() +
        // Math.random().toString(36).substr(2).toUpperCase(),
      })
      .then((res) => {
        console.log('Authentication(SignIn) Resp ', res);
        console.log('Authentication(SignIn) Resp Data ', res.data);

        if (res.data.response_type !== 'LOGGED_IN') {
          return new Error(`${res.data.remarks} (${res.data.response_type}) `);
        }

        if (!res.data.token) {
          //return { message: "LOGIN TOKEN MISSING" };
          return new Error(`${res.data.remarks} (${res.data.response_type}) `);
        }

        localStorage.setItem('token', res.data.token);
        setAuthToken(res.data.token);
        return {
          ...res.data.data,
          uniqueUserId: res.data.uniqueUserId,
          token: res.data.token,
        };
      })
      .catch((err) => {
        console.devLog('error ', err);
        console.devLog('NETWORK WAS DOWN/NOT WORKING');
        return new Error('NETWORK ERROR');
      });
  },
  /**
   * Signs out the user by making a POST request to the API endpoint for user sign out.
   * @throws {Error} - If there is a network error during the sign out process.
   */
  signOut: async function (username) {
    return instance
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_USER_LOGOUT, {
        // deviceType: 'WEB',
        // loginStatus: 'LOGOUTOK',
        user_name: username,
      })
      .then((res) => {
        console.devLog('signOut', res);
        localStorage.removeItem('token');
      })
      .catch((err) => {
        console.devLog('signOut error ', err);
        return new Error('NETWORK ERROR');
      });
  },

  getUsernameList: async function (_reqParam = '') {
    return instance
      .get(API_ENDPOINT_URL.GET_USER_MANAGEMENT_USERNAME_LIST + _reqParam)
      .then((res) => {
        console.devLog('userList', res);
        return res.data;
      })
      .catch((err) => {
        console.devLog('signOut error ', err);
        return new Error('NETWORK ERROR');
      });
  },
};

export default UserManagementService;
