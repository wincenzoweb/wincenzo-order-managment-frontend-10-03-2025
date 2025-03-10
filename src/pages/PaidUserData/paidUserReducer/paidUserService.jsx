import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"

//####################### Payment Data with Userdata ####################//

const getAllUserPaymentInfo = async () => {
    const res = await axios.get(`${baseUrl}paymentinfo/get-user-payment-info`, getToken());
    return res.data
}

const deleteUserPaymentInfo = async (data) => {
    const res = await axios.delete(`${baseUrl}user-payment-data/completed/delete-multiple-bookings/${data}`, getToken());
    return res.data
}

const deleteUserPaymentInfoList = async (idList) => {
    const res = await axios.delete(
        `${baseUrl}user-payment-data/completed/delete-multiple-bookings`,
        {
            data: { "ids": idList },
        headers: getToken().headers
        }
    );
    return res.data;
};

const getPaginatedPaidUserInfos = async (page, limit = 10, search = "", startDate = "", endDate = "", filterByDuplicateBarcode = "") => {
    const res = await axios.get(`${baseUrl}user-payment-data/completed/paginated-with-filters?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&filterByDuplicateBarcode=${filterByDuplicateBarcode}`, getToken());
    return res.data;
};

const getDuplicateBarcodesData = async () => {
    const res = await axios.get(`${baseUrl}user-payment-data/completed/duplicates`, getToken());
    return res.data
}


const paidUserService = {

    getAllUserPaymentInfo,
    deleteUserPaymentInfo,
    deleteUserPaymentInfoList,
    getPaginatedPaidUserInfos,
    getDuplicateBarcodesData,
}

export default paidUserService
