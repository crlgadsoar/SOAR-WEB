import axios from "axios";

const API_BASE_URL = "http://localhost:5002"
// "; // Ensure backend is running

export const fetchIncidents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incidents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
};

export const fetchPlaybooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/playbooks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching playbooks:", error);
    return [];
  }
};
