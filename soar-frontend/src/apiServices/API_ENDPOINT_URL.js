const API_ENDPOINT_URL = {
  //localUIServerInstance APIs
  GET_STATION_DATA_LIST: "/getStationJson",
  POST_STATION_DATA_LIST: "/postStationData",
  // POST_USER_SIGN_OUT: '/SOARLogout',
  // POST_USER_SIGN_IN: '/SOARLogin',
  // REAUTH_TOKEN: '/SOARReAuth',

  //instance APIs

  // INCIDENTS APIs
  GET_INCIDENTS_LIST: "/api/uasm/getIncidents",
  POST_INCIDENT: "/api/uasm/addIncident",

  //PLAYBOOKS APIs
  GET_PLAYBOOKS_LIST: "api/uasm/getPlaybookslist",
  POST_PLAYBOOK: "api/uasm/addPlaybook",

  // USER MANAGEMENT APIs
  POST_USER_MANAGEMENT_ADD_USER: "/api/uasm/addUser",
  POST_USER_MANAGEMENT_SUBMIT_EDIT_USER: "/api/uasm/submitEditUser",
  POST_USER_MANAGEMENT_DEL_USER: "/api/uasm/delUser",
  POST_USER_MANAGEMENT_USER_LOGIN: "/api/uasm/userLogin",
  POST_USER_MANAGEMENT_USER_LOGOUT: "/api/uasm/userLogout",
  POST_USER_MANAGEMENT_CHANGE_PASSWORD: "/api/uasm/changePassword",
  GET_USER_MANAGEMENT_USERNAME_LIST: "/api/uasm/getUsernameList",
  // GET_USER_MANAGEMENT_STATION_LIST: "/api/uasm/getStationList",
  // POST_USER_MANAGEMENT_VERIFY_TOKEN: "/api/uasm/verifyToken",

  //RELAY APIs
  GET_STATIC_SIGNAL_RELAY_DATA: "/api/relay/relaySignalInfo",
  GET_STATIC_POINT_RELAY_DATA: "/api/relay/relayPointInfo",
};

export default API_ENDPOINT_URL;
