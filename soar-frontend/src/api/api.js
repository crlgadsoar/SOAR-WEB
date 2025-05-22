import axios from "axios";

export const API_BASE_URL = "http://10.229.40.42:5000"; 


export const signUp = async (values) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, message: "Registration successful! Please log in." };
    } else {
      return { success: false, message: data.message || "Registration failed" };
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
    return { success: false, message: "Server error. Please try again." };
  }
};

export const fetchIncidents = async (params = {}) => {
  try {
    // Construct query parameters if provided
    const query = new URLSearchParams(params).toString();
    const url = query ? `${API_BASE_URL}/incidents?${query}` : `${API_BASE_URL}/incidents`;

    const response = await axios.get(url, {
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
    const response = await axios.get(API_BASE_URL + "/playbooks", {
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
    const response = await axios.get(API_BASE_URL + `/attack_id_count?attack_id=${attackId}`, {
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
    axios.post(API_BASE_URL + "/update_incident_status_comment", {
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
    const response = await axios.post(API_BASE_URL + "/predict_from_chat", {
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

export const mitigateUsingAI = async (message) => {
  try {
    const response = await axios.post(API_BASE_URL + "/mitigate_using_ai", {
      incident_id: message
    }, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error predicting from chat:", error);
    return null;
  }
}

export const fetchPlaybookDetails = async (playbookId) => {
  try {
    const response = await axios.get(API_BASE_URL + `/playbook/details/${playbookId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching playbook details:", error);
    return null;
  }
}

export const fetchApps = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/integrations/getApps`);
    return response.data;
  } catch (error) {
    console.error("Error fetching apps:", error);
    throw error;
  }
};

export const fetchAppsWithActions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/integrations/getAppsWithActions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching apps with actions:", error);
    throw error;
  }
};

export const fetchAppActions = async (appId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/integrations/getAppActions`, {
      params: { appId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching app actions:", error);
    throw error;
  }
};

export const importAppsToDatabase = async (apps) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/integrations/import_apps`, apps, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to import apps to the database:", error);
    throw error;
  }
};

export const deleteApp = async (appId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/integrations/delete_app/${appId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete app:", error);
    throw error;
  }
};

export const createApp = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/integrations/create_app`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to create app:", error);
    throw error;
  }
};

export const updateApp = async (appId, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/integrations/updateApp/${appId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to update app:", error);
    throw error;
  }
};

export const addAppAction = async (appId, actionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/integrations/${appId}/addAction/`, actionData);
    return response;
  } catch (error) {
    console.error("Failed to add action:", error);
    throw error;
  }
};

export const updateAppAction = async (appId, actionId, actionData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/integrations/${appId}/editAction/${actionId}`, actionData);
    return response;
  } catch (error) {
    console.error("Failed to update action:", error);
    throw error;
  }
};

export const deleteAppAction = async (appId, actionId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/integrations/${appId}/${actionId}/deleteAction`);
    return response;
  } catch (error) {
    console.error("Failed to delete action:", error);
    throw error;
  }
};

/* Add new playbook API */
export const addPlaybook = async (playbookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/add_playbook`, playbookData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding playbook:", error.response?.data || error.message);
    return null;
  }
};

/* Delete playbook API */
export const deletePlaybook = async (playbookId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/delete_playbook`, {
      playbook_id: playbookId
    }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting playbook:", error.response?.data || error.message);
    return null;
  }
};

export const fetchActions = async (utility) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/actions?utility=${utility}`);
    return response.data.actions; // Returns the actions list
  } catch (error) {
    console.error("Error fetching actions:", error);
    return []; // Return an empty list in case of an error
  }
};

// Delete mapping when a playbook is deleted
export const deleteMitrePlaybookMapping = async (playbookId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/delete_mitre_playbook_mapping`,
      {
        data: { playbook_id: playbookId },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to delete MITRE mapping:", error);
    throw error;
  }
};


export const markIncidentAsOld = async (incidentid) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/incidents/mark_old`, { incidentid });
    return response.data; // Return the response data for further use
  } catch (error) {
    console.error("Error updating isnew status:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Fetch all utilities name while adding a new playbook
export const fetchUtilities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/apps/titles`, {
      withCredentials: true,
    });
    return response.data.map(item => item.title); // extract titles
  } catch (error) {
    console.error("Failed to fetch utilities:", error);
    return [];
  }
};

// Generate a unique Playbook Id
export const fetchPlaybookId = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/generate_playbook_id`, {
      withCredentials: true,
    });
    return response.data.playbook_id;
  } catch (error) {
    console.error("Failed to fetch Playbook ID:", error);
    return null;
  }
};

export const saveWorkflow = async (workflow) => {
  try {
    // If workflow has an id, update; else, create
    const url = workflow.id
      ? `${API_BASE_URL}/api/editWorkflow/${workflow.id}`
      : `${API_BASE_URL}/api/addWorkflows`;
    const method = workflow.id ? "put" : "post";
    const response = await axios({
      url,
      method,
      data: workflow,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to save workflow:", error);
    throw error;
  }
};

export const getWorkflows = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/getWorkflows`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch workflows:", error);
    throw error;
  }
};

export const deleteWorkflow = async (workflowId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/deleteWorkflow/${workflowId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete workflow:", error);
    throw error;
  }
};

export const fetchIncidentsByAttackName = async (attackName, attack_map) => {
  const found = attack_map.find((entry) => entry.attack === attackName);
  if (!found) return { success: false, message: "Attack not found in map." };

  try {
    const response = await axios.get(
      `${API_BASE_URL}/incidents/attack_id?attack_id=${found.mitreid}`,
      { withCredentials: true }
    );
    return {
      success: true,
      data: response.data,
      title: `${attackName} (${found.mitreid})`,
    };
  } catch (error) {
    console.error("Error fetching incidents by attack name:", error);
    return { success: false, message: "Failed to fetch incidents." };
  }
};

export const fetchWorkflowRuns = async (runId = null) => {
  try {
    const config = {
      url: `${API_BASE_URL}/api/getWorkflowRuns`,
      method: "get",
      withCredentials: true,
    };
    if (runId) {
      config.params = { run_id: runId };
    }
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(
      runId
        ? "Failed to fetch workflow run by id:"
        : "Failed to fetch workflow runs:",
      error
    );
    return runId ? null : [];
  }
};

export const editPlaybook = async (playbookId, playbookData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/edit_playbook/${playbookId}`,
      playbookData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error editing playbook:", error.response?.data || error.message);
    return null;
  }
};