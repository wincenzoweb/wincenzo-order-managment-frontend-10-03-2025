import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig";

const getOrderStatistics = async (startDate = "", endDate = "") => {
    const res = await axios.get(`${baseUrl}statistics/get-order-statistics?startDate=${startDate}&endDate=${endDate}`, getToken());
    return res.data;
};
const getEmployeeStatistics = async (startDate = "", endDate = "") => {
    const res = await axios.get(`${baseUrl}statistics/get-employee-statistics?startDate=${startDate}&endDate=${endDate}`, getToken());
    return res.data;
};

const getMatchCounts = async () => {
    const res = await axios.get(`${baseUrl}statistics/match-counts`, getToken());
    return res.data;
};


const statisticsService = {
    getOrderStatistics, getEmployeeStatistics, getMatchCounts
};

export default statisticsService;