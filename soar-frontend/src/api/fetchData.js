import axios from "axios";

const API_BASE_URL = "http://localhost:5000"
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

// New function to fetch playbook name by ID
export const fetchPlaybookName = async (playbookId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/playbook_name/${playbookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching playbook name for ID ${playbookId}:`, error);
    return null;
  }
};
