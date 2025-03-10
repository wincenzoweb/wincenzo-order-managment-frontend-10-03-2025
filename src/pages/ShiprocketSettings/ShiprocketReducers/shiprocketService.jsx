import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
// import { config } from "@/configs/axiosConfig";
import { getToken } from "../../../configs/axiosConfig"


// Get Shiprocket credentials
const getCredentials = async () => {
    const res = await axios.get(`${baseUrl}shiprocket/getcredentials`, getToken);
    return res.data;
};

// Update Shiprocket credentials
const updateCredentials = async (data) => {
    const res = await axios.put(`${baseUrl}shiprocket/updatecredentials`, data, getToken);
    return res.data;
};

const shiprocketService = {
    getCredentials,
    updateCredentials,
};

export default shiprocketService;
