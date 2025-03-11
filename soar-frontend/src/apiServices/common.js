import API_ENDPOINT_URL from "./API_ENDPOINT_URL";
import { instance } from "util/connection/axios";

/**
 * A service object that provides methods for retrieving line data.
 * @throws {Error} If an error occurs during the API request.
 */
const CommonService = {
  getStationList: async function (reqParam = "") {
    try {
      const result = await instance.get(
        `${API_ENDPOINT_URL.GET_USER_MANAGEMENT_STATION_LIST}${reqParam}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default CommonService;
