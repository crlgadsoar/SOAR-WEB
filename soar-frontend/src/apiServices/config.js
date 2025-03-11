import API_ENDPOINT_URL from "./API_ENDPOINT_URL";
import { localUIServerInstance, instance } from "util/connection/axios";

const ConfigService = {
  /**
   * Retrieves the theme configuration data from local storage.
   */
  getThemeConfigData: async function () {
    return {
      displayMode: localStorage.getItem("displayMode") || "LIGHT",
      language: localStorage.getItem("language") || "en",
    };
  },
  updateDisplayMode: async function (mode) {
    mode && localStorage.setItem("displayMode", mode);
    return mode;
  },
  updateLanguage: async function (language) {
    language && localStorage.setItem("language", language);
    return language;
  },

  /**
   * Retrieves the initial configuration data from the server.
   * @throws {Error} If an error occurs during the API request.
   */
  getInitConfigData: async function (
    reqParam1 = "",
    reqParam2 = "",
    reqParam3 = ""
  ) {
    let returnObj = {
      stationData: [],
      staticPointData: [],
      staticSignalData: [],
    };
    try {
      const result = await localUIServerInstance.get(
        `${API_ENDPOINT_URL.GET_STATION_DATA_LIST}${reqParam1}`
      );
      returnObj.stationData = result?.data?.stationList || [];
    } catch (error) {
      console.log(error);
      throw error;
    }

    try {
      const result = await instance.get(
        `${API_ENDPOINT_URL.GET_STATIC_SIGNAL_RELAY_DATA}${reqParam2}`
      );
      returnObj.staticSignalData = result?.data?.resource || [];
    } catch (error) {
      console.log(error);
      throw error;
    }

    try {
      const result = await instance.get(
        `${API_ENDPOINT_URL.GET_STATIC_POINT_RELAY_DATA}${reqParam3}`
      );
      returnObj.staticPointData = result?.data?.resource || [];
    } catch (error) {
      console.log(error);
      throw error;
    }

    return returnObj;
  },
  /**
   * Sends a POST request to the server to post station data.
   * @throws {Error} If an error occurs during the request.
   */
  postStationData: async function (body) {
    try {
      const result = await localUIServerInstance.post(
        `${API_ENDPOINT_URL.POST_STATION_DATA_LIST}`,
        body
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default ConfigService;
