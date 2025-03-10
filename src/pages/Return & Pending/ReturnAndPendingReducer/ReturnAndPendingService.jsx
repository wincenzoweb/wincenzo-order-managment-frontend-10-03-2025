import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"


const addNewFile = async (data) => {
    const res = await axios.post(`${baseUrl}returnandpendingfile/addnewreturndata`, data, getToken());
    return res.data
};

const getAllReturnAndPendingData = async () => {
    const res = await axios.get(`${baseUrl}returnandpendingfile/getallreturndata`, getToken());
    return res.data
}

const getReturnAndPendingDataById = async (data) => {
    const res = await axios.get(`${baseUrl}returnandpendingfile/${data}`, getToken());
    return res.data
}

const deleteReturnAndPendingData = async (data) => {
    const res = await axios.delete(`${baseUrl}returnandpendingfile/${data}`, getToken());
    return res.data
}

const deleteReturnAndPendingDataList = async (idList) => {

    const res = await axios.post(`${baseUrl}returnandpendingfile/delete-multiplereturndata`,
        {
            ids: idList
        },
        {
            headers: getToken().headers
        }
    );
    return res.data
}

const updateReturnAndPendingData = async (data) => {
    const res = await axios.put(`${baseUrl}returnandpendingfile/${data?.id}`, data?.data, getToken());
    return res.data
}


const getPaginatedReturnData = async (page, limit = 10, search = "", startDate = "", endDate = "", filterByDuplicateBarcode = "", filterByUnknownBarcode = "") => {
    const res = await axios.get(`${baseUrl}returnandpendingfile/get-return-data?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&filterByDuplicateBarcode=${filterByDuplicateBarcode}&filterByUnknownBarcode=${filterByUnknownBarcode}`, getToken());
    return res.data;
};

const getDuplicateBarcodeNumbers = async () => {
    const res = await axios.get(`${baseUrl}returnandpendingfile/duplicatesbarcodenumber`, getToken());
    return res.data
}

const returnAndPendingService = {
    addNewFile,
    getAllReturnAndPendingData,
    getReturnAndPendingDataById,
    deleteReturnAndPendingData,
    updateReturnAndPendingData,
    deleteReturnAndPendingDataList,
    getPaginatedReturnData,
    getDuplicateBarcodeNumbers,
}

export default returnAndPendingService
