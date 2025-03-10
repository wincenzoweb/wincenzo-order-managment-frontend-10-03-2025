import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"


    const addNewFile = async (data) => {
        const res = await axios.post(`${baseUrl}bookingfile/addbooking`, data, getToken());
        return res.data
    };

const getAllBookingData = async () => {
    const res = await axios.get(`${baseUrl}bookingfile/allbooking`, getToken());
    return res.data
}

const getDuplicateBookingBarcodeNumbers = async () => {
    const res = await axios.get(`${baseUrl}bookingfile/duplicatebookingsbarcodenumber`, getToken());
    return res.data;
};

const getBookingDataById = async (data) => {
    const res = await axios.get(`${baseUrl}bookingfile/${data}`, getToken());
    return res.data
}

const deleteBookingData = async (data) => {
    const res = await axios.delete(`${baseUrl}bookingfile/${data}`, getToken());
    return res.data
}

const deleteBookingDataList = async (idList) => {
    const res = await axios.delete(`${baseUrl}bookingfile/delete-bookinglist`, {
        data: { "ids": idList },
        headers: getToken().headers
    }
    );
    return res.data;
};

const getPaginatedBookingData = async (page, limit = 10, search = "", startDate = "", endDate = "", filterByDuplicateBarcode = "") => {
    const res = await axios.get(`${baseUrl}bookingfile/bookings?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&filterByDuplicateBarcode=${filterByDuplicateBarcode}`, getToken());
    return res.data;
};


// const updateBookingData = async (data) => {
//     const res = await axios.put(`${baseUrl}bookingfile/${data?.id}`, data?.data, getToken());
//     return res.data
// };

const updateBookingData = async (data) => {
    try {
        const res = await axios.put(`${baseUrl}bookingfile/${data?.id}`, data?.data, getToken());
        return res.data;
    } catch (error) {
        throw error; // Ensure error is thrown to be caught in the `.rejected` case
    }
};
const BookingService = {
    addNewFile,
    getAllBookingData,
    getBookingDataById,
    deleteBookingData,
    updateBookingData,
    deleteBookingDataList,
    getDuplicateBookingBarcodeNumbers,
    getPaginatedBookingData,

}

export default BookingService
