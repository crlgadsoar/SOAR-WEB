import axios from "axios";

const API_BASE_URL = "http://localhost:5002"; // Backend base URL

// export const axios = axios.create({
//   baseURL: "http://localhost:5002", // Backend base URL
//   withCredentials: true, // Send cookies with requests
// });

export const fetchIncidents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incidents`, {
      withCredentials: true, // Ensures cookies (including session token) are sent
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
};

export const fetchPlaybooks = async () => {
  try {
    const response = await axios.get(API_BASE_URL+"/playbooks");
    return response.data;
  } catch (error) {
    console.error("Error fetching playbooks:", error);
    return [];
  }
};

export const login = async (creds) => {
  try {
    const response = await axios.post(API_BASE_URL + "/login", creds, {
      withCredentials: true, // Ensures cookies (including session token) are sent
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};
