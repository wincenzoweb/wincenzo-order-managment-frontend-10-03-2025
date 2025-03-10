import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"


const getAllsettings = async () => {
    const res = await axios.get(`${baseUrl}setting/get-setting`, getToken());
    return res.data;
};

const AddSettings = async (data) => {
    const res = await axios.post(`${baseUrl}setting/add-setting`, data, getToken());
    return res.data;
};

const updateSettings = async (data) => {
    const res = await axios.put(`${baseUrl}setting/update-setting`, data, getToken());
    return res.data;
};
const deleteSettings = async (id) => {
    const res = await axios.delete(`${baseUrl}setting/delete-setting${id}`, getToken());
    return res.data;
};


// ReceiverMail

const getAllReceiverMails = async () => {
    const res = await axios.get(`${baseUrl}setting/get-receiverMail`, getToken());
    return res.data;
};

const addReceiverMail = async (data) => {
    const res = await axios.post(`${baseUrl}setting/add-receiverMail`, data, getToken());
    return res.data;
};

const updateReceiverMail = async (id, data) => {
    const res = await axios.put(`${baseUrl}setting/update-receiverMail/${id}`, data, getToken());
    return res.data;
};

const deleteReceiverMail = async (id) => {
    const res = await axios.delete(`${baseUrl}setting/delete-receiverMail/${id}`, getToken());
    return res.data;
};

const settingService = {
    getAllsettings,
    updateSettings,
    AddSettings,
    deleteSettings,
    getAllReceiverMails,
    addReceiverMail,
    updateReceiverMail,
    deleteReceiverMail,
}

export default settingService;