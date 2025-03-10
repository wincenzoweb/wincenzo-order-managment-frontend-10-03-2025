import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';  // Backend API base URL

// Function to call the backend API to track order by AWB
export const trackOrderByAWB = async (awb) => {
  try {
    const response = await axios.post(`${BASE_URL}/shiprocket/track-order`, { awb });
    return response.data;  // Returns the tracking data
  } catch (error) {
    throw error.response ? error.response.data : "Error tracking order";
  }
};
