import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"


const addNewFile = async (data) => {
    const res = await axios.post(`${baseUrl}paymentfile/addnewpaymentdata`, data, getToken());
    return res.data
};

const getAllPaymentData = async () => {
    const res = await axios.get(`${baseUrl}paymentfile/getallpaymentdata`, getToken());
    return res.data
}
const getDuplicateArticleNumbers = async () => {
    const res = await axios.get(`${baseUrl}paymentfile/duplicatesarticalnumber`, getToken());
    return res.data
}

const getPaymentDataById = async (data) => {
    const res = await axios.get(`${baseUrl}paymentfile/${data}`, getToken());
    return res.data
}

const deletePaymentData = async (data) => {
    const res = await axios.delete(`${baseUrl}paymentfile/${data}`, getToken());
    return res.data
}

const deletePaymentDataList = async (idList) => {
    const res = await axios.post(
        `${baseUrl}paymentfile/delete-multiplepaymentdata`,
        {
            ids: idList
        },
        {
            headers: getToken().headers
        }
    );
    return res.data;
};


const updatePaymentData = async (data) => {
    const res = await axios.put(`${baseUrl}paymentfile/${data?.id}`, data?.data, getToken());
    return res.data
}

const getPaginatedPaymentData = async (page, limit = 10, search = "", startDate = "", endDate = "", filterByDuplicateArticalNumber = "") => {
    const res = await axios.get(`${baseUrl}paymentfile/payment-data?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&filterByDuplicateArticalNumber=${filterByDuplicateArticalNumber}`, getToken());
    return res.data;
};


const paymentService = {
    addNewFile,
    getAllPaymentData,
    getPaymentDataById,
    deletePaymentData,
    updatePaymentData,
    deletePaymentDataList,
    getPaginatedPaymentData,
    getDuplicateArticleNumbers,
}
export default paymentService
