import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../../configs/axiosConfig"

const sendMail = async (data) => {
    console.log("firstsssssss", data)

    const res = await axios.post(`${baseUrl}mail/sendmail`, { data }, getToken());
    return res.data
};

const emailService = {
    sendMail
}

export default emailService