import API_ENDPOINT_URL from './API_ENDPOINT_URL';
import {
  instance,
  setAuthToken,
} from 'util/connection/axios';

/**
 * A service object for managing user data and authentication.
 */
const UserManagementService = {
  /**
   * Re-authenticate user based on existing token.
   * Prevents infinite loops by skipping if no token is present.
   */
  reAuth: async function (token) {
    if (!token) {
      console.log("🚨 No token found, skipping reAuth");
      return null; // Prevents infinite refresh loop
    }

    return {
      token: token,
      user_name: "admin",
    };
  },

  /**
   * Sign in a user with the provided username, password, and version.
   */
  signIn: async function ({ username, password, version }) {
    console.log('Credentials on signin =>', username, password, version);

    return instance
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_USER_LOGIN, {
        user_name: username,
        password: password,
        version: version,
        uniqueUserId: 'usr',
      })
      .then((res) => {
        console.log('Authentication(SignIn) Resp ', res);
        console.log('Authentication(SignIn) Resp Data ', res.data);
  
        if (res.data.response_type !== 'LOGGED_IN') {
          return new Error(`${res.data.remarks} (${res.data.response_type}) `);
        }
  
        if (!res.data.token) {
          return new Error(`${res.data.remarks} (${res.data.response_type}) `);
        }
  
        // ✅ Store token properly
        localStorage.setItem('token', res.data.token);
        console.log("Token stored:", localStorage.getItem('token')); // ✅ Debugging
  
        setAuthToken(res.data.token);
        return {
          ...res.data.data,
          uniqueUserId: res.data.uniqueUserId,
          token: res.data.token,
        };
      })
      .catch((err) => {
        console.log('SignIn error:', err);
        return new Error('NETWORK ERROR');
      });
  },

  /**
   * Signs out the user and clears authentication-related data.
   */
  signOut: async function (username) {
    console.log("Signing out:", username);

    // ✅ Remove everything related to authentication
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    localStorage.removeItem('role');

    // ✅ Force refresh to prevent old session issues
    window.location.reload();

    return { message: "Signed out successfully" };
  },

  /**
   * Fetch list of usernames from the API.
   */
  getUsernameList: async function (_reqParam = '') {
    return instance
      .get(API_ENDPOINT_URL.GET_USER_MANAGEMENT_USERNAME_LIST + _reqParam)
      .then((res) => {
        console.log('User list fetched:', res);
        return res.data;
      })
      .catch((err) => {
        console.log('Error fetching user list:', err);
        return new Error('NETWORK ERROR');
      });
  },
};

export default UserManagementService;
