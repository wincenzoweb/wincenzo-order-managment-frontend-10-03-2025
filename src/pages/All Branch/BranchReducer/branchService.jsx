
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"

const addBranch = async (data) => {
    const res = await axios.post(`${baseUrl}branch`, data, getToken());
    return res.data;
};

const getAllBranch = async () => {
    const res = await axios.get(`${baseUrl}branch`, getToken());
    return res.data;
}
const getBranchById = async (data) => {
    const res = await axios.get(`${baseUrl}branch/${data}`, getToken());
    return res.data;
}

const deleteBranch = async (data) => {
    const res = await axios.delete(`${baseUrl}branch/${data}`, getToken());
    return res.data;
}

const updateBranch = async (data) => {
    const res = await axios.put(`${baseUrl}branch/${data?.id}`, data?.data, getToken());
    return res.data;
}

const BranchService = {
    addBranch,
    getAllBranch,
    getBranchById,
    deleteBranch,
    updateBranch
}

export default BranchService;
