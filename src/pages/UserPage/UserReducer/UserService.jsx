import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"


const addUser = async (data) => {
    const res = await axios.post(`${baseUrl}user/add`, data, getToken());
    return res.data
};

const userLogin = async (data) => {
    const res = await axios.post(`${baseUrl}user/login`, data);
    return res.data
}

const getAllUsers = async () => {
    const res = await axios.get(`${baseUrl}user/all`, getToken());
    return res.data
}

const getUserById = async (data) => {
    const res = await axios.get(`${baseUrl}user/${data}`, getToken());
    return res.data
}

const deleteUser = async (data) => {
    const res = await axios.delete(`${baseUrl}user/${data}`, getToken());
    return res.data
}

const updateUser = async (data) => {
    const res = await axios.put(`${baseUrl}user/${data?.id}`, data?.data, getToken());
    return res.data
}

const UserService = {
    addUser,
    userLogin,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
}

export default UserService
