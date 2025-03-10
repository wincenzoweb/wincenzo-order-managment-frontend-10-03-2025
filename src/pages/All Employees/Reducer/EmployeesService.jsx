import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

const addEmployee = async (data) => {
    const res = await axios.post(`${baseUrl}employee/addemployee`, data);
    return res.data
};

const employeeLogin = async (data) => {
    const res = await axios.post(`${baseUrl}employee/employeelogin`, data);
    return res.data
}

const getAllEmployee = async () => {
    const res = await axios.get(`${baseUrl}employee/getallemployees`);
    return res.data
}

const deleteEmployee = async (data) => {
    const res = await axios.delete(`${baseUrl}employee/deleteemployee/${data}`);
    return res.data
}

const updateEmployee = async (data) => {
    const res = await axios.put(`${baseUrl}employee/updateemployee/${data?.id}`, data?.data);
    return res.data
}

const EmployeeService = {
    addEmployee,
    employeeLogin,
    getAllEmployee,
    deleteEmployee,
    updateEmployee
}

export default EmployeeService