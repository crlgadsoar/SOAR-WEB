import axios from "axios";

const API_BASE_URL = "http://localhost:5002"; // Backend base URL

// export const axios = axios.create({
//   baseURL: "http://localhost:5002", // Backend base URL
//   withCredentials: true, // Send cookies with requests
// });

export const fetchIncidents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incidents`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
};

export const fetchPlaybooks = async () => {
  try {
    const response = await axios.get(API_BASE_URL+"/playbooks", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching playbooks:", error);
    return [];
  }
};

export const login = async (creds) => {
  try {
    const response = await axios.post(API_BASE_URL + "/login", creds, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export const fetchAttackCount = async (attackId) => {
  try {
    const response = await axios.get(API_BASE_URL+`/attack_id_count?attack_id=${attackId}`, {
      withCredentials: true,
    });
    return response.data.count;
  } catch (error) {
    console.error(`Error fetching count for ${attackId}:`, error);
    return null;
  }
};

export const updateIncidentStatusComment = async (incidentId, comment) => {
  try {
    axios.post(API_BASE_URL+"/update_incident_status_comment", {
      incidentid: incidentId,
      status_comment: comment,
    }, {
      withCredentials: true,
    })
  } catch (error) {
    console.error("Error updating incident status:", error);
    return null;
  }
}

export const predictFromChat = async (message) => {
  try {
    const response = await axios.post(API_BASE_URL+"/predict_from_chat", {
      message: message
    }, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error predicting from chat:", error);
    return null;
  }
}