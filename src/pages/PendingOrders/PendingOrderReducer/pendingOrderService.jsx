import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"


const getPaginatedPendingOrders = async (page, limit = 10, search = "", startDate = "", endDate = "", filterByDuplicateBarcode  = "") => {
    const res = await axios.get(`${baseUrl}pendingorder/get-pending-orders?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&filterByDuplicateBarcode=${filterByDuplicateBarcode}`, getToken());
    return res.data;
};

const getPendingOrders = async (data) => {
    const res = await axios.get(`${baseUrl}pendingorder/getallpendingorders`, getToken());
    return res.data;
}

const updatePendingOrderById = async (data) => {
    try{
    const res = await axios.put(`${baseUrl}pendingorder/${data?.id}`, data?.data, getToken());
    return res.data;
} catch (error) {
    throw error; // Ensure error is thrown to be caught in the `.rejected` case
}
};

// const updateBookingData = async (data) => {
//     try {
//         const res = await axios.put(`${baseUrl}bookingfile/${data?.id}`, data?.data, getToken());
//         return res.data;
//     } catch (error) {
//         throw error; // Ensure error is thrown to be caught in the `.rejected` case
//     }
// };

const getDuplicateBarcodeNumbers = async () => {
    const res = await axios.get(`${baseUrl}pendingorder/duplicatesbarcodenumber`, getToken());
    return res.data
}
const deletePendingOrderById = async (data) => {
    const res = await axios.delete(`${baseUrl}pendingorder/${data}`, getToken());
    return res.data
}

const deleteMultiplePendingOrder = async (idList) => {
    const res = await axios.delete(`${baseUrl}pendingorder/delete-pendinglist`,
        {
            data: { "ids": idList },
            headers: getToken().headers
        }
    );
    return res.data;
};

// const moveOldOrdersToPending = async () => {
//     const res = await axios.post(`${baseUrl}pendingorder/move-old-orders`, {}, getToken());
//     return res.data;
// };

const pendingOrderService = {
    getPaginatedPendingOrders,
    getPendingOrders,
    updatePendingOrderById,
    deletePendingOrderById,
    getDuplicateBarcodeNumbers,
    // moveOldOrdersToPending,
    deleteMultiplePendingOrder,
}
export default pendingOrderService
