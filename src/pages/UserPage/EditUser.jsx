

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@/components/ui/Checkbox";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { getAllUsers, updateUser, toggleEditModal } from "./UserReducer/UserSlice";
import { getAllBranch } from "../All Branch/BranchReducer/branchSlice";

const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "branchAdmin", label: "BranchAdmin" },
    { value: "employee", label: "Employee" },
];

const accessRightOptions = [
    { value: "all", label: "Select All" },
    { value: "orderdashboard", label: "Dashboard" },
    { value: "workdashboard", label: "WorkDashboard" },
    { value: "paymentorders", label: "Payment Order" },
    { value: "bookingorder", label: "Booking Order" },
    { value: "returnorders", label: "Return Order" },
    { value: "allemployee", label: "All Employee" },
    { value: "trackorder", label: "Track Order" },
    { value: "pendingorders", label: "Pending Order" },
    { value: "settings", label: "Settings" },
    { value: "branch", label: "Branches" },
    { value: "paiduser", label: "Paid User Info" },
];

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const EditUser = () => {
    const { editModal, editItem } = useSelector((state) => state.user);
    const { branches } = useSelector((state) => state.branches);
    const dispatch = useDispatch();

    const branchOptions = branches.map(branch => ({
        value: branch.branchName.toLowerCase(),
        label: branch.branchName,
    }));
    const [accessRights, setAccessRights] = useState([]);

    const passwordValidation = yup.string().min(6, "Password must be at least 6 characters");

    const FormValidationSchema = yup.object({
        username: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        mobile: yup.string().required("Mobile number is required"),
        password: yup.string().test(
            "password-test",
            "Password must be at least 6 characters",
            (value) => !value || passwordValidation.isValidSync(value)
        ),
        role: yup.mixed().required("Role is required"),
        branch: yup.mixed().required("Branch is required"),
    }).required();

    const {
        register,
        control,
        reset,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    useEffect(() => {
        dispatch(getAllBranch("branches"));
    }, [])

    useEffect(() => {
        reset({ ...editItem, password: "" }); // Set password field to empty string
        if (editItem?.role) {
            setValue("role", roleOptions.find(option => option.value === editItem.role));
        }
        if (editItem?.branch) {
            setValue("branch", branchOptions.find(option => option.value === editItem.branch));
        }
        setAccessRights(editItem?.accessRights || []);
    }, [editItem]);

   
    const handleAccessRightChange = (accessRight) => {
        if (accessRight === "all") {
            if (accessRights.includes("all")) {
                setAccessRights([]);
            } else {
                setAccessRights(accessRightOptions.map(option => option.value));
            }
        } else {
            const updatedAccessRights = accessRights.includes(accessRight)
                ? accessRights.filter(item => item !== accessRight)
                : [...accessRights, accessRight];

            if (updatedAccessRights.length === accessRightOptions.length - 1 && !accessRights.includes("all")) {
                updatedAccessRights.push("all");
            }

            setAccessRights(updatedAccessRights);
        }
    };

    const onSubmit = (data) => {
        const { role, branch, password, ...userData } = data;

        const user = {
            id: editItem?._id,
            data: {
                ...userData,
                role: role.value,
                branch: branch.value,
                accessRights: accessRights,
            }
        };
        console.log(user)
        if (password) {
            user.data.password = password; // Include password only if it is not empty
        }

        dispatch(updateUser(user));

        setTimeout(() => {
            dispatch(toggleEditModal(false));
            dispatch(getAllUsers("user"));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Edit User"
                labelclassName="btn-outline-dark"
                activeModal={editModal}
                onClose={() => dispatch(toggleEditModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <Textinput
                            name="username"
                            label="name"
                            type="text"
                            placeholder="Enter name"
                            register={register}
                            defaultValue={editItem.username}
                            error={errors.username}
                            className="h-[48px]"
                        />
                        <Textinput
                            name="email"
                            label="email"
                            type="email"
                            placeholder="Enter email"
                            register={register}
                            defaultValue={editItem.email}
                            error={errors.email}
                            className="h-[48px]"
                        />
                    </div>

                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <div>
                            <label htmlFor="role" className="form-label">
                                Select Role
                            </label>
                            <Controller
                                name="role"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        id="role"
                                        className="react-select"
                                        classNamePrefix="select"
                                        options={roleOptions}
                                        {...field}
                                        styles={styles}
                                    />
                                )}
                            />
                            {errors.role && <span className="text-red-500">{errors.role.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="branch" className="form-label">
                                Select Branch
                            </label>
                            <Controller
                                name="branch"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        id="branch"
                                        className="react-select"
                                        classNamePrefix="select"
                                        options={branchOptions}
                                        {...field}
                                        styles={styles}
                                    />
                                )}
                            />
                            {errors.branch && <span className="text-red-500">{errors.branch.message}</span>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <Textinput
                            name="mobile"
                            label="mobile"
                            type="tel"
                            placeholder="Enter mobile no"
                            register={register}
                            defaultValue={editItem.mobile}
                            error={errors.mobile}
                            className="h-[48px]"
                        />

                        <Textinput
                            name="password"
                            label="password"
                            type="password"
                            placeholder="Enter new password"
                            register={register}
                            defaultValue="" // Set password field to empty string
                            error={errors.password}
                            className="h-[48px]"
                        />
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <div className="text-lg font-bold mb-2">Access Right</div>
                        {accessRightOptions.map((option) => (
                            <Checkbox
                                key={option.value}
                                label={option.label}
                                value={accessRights.includes(option.value)}
                                onChange={() => handleAccessRightChange(option.value)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-dark block w-full text-center">
                        Update Employee
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default EditUser;

