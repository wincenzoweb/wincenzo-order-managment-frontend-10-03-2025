import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { addNewUser, getAllUsers, toggleAddModal } from "./UserReducer/UserSlice";
import { getAllBranch } from "../All Branch/BranchReducer/branchSlice";


const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "branchAdmin", label: "BranchAdmin" },
    { value: "employee", label: "Employee" },
];

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const AddUser = () => {
    const { addModel } = useSelector((state) => state.user);
    const { branches } = useSelector((state) => state.branches);
    const dispatch = useDispatch();

    const branchOptions = branches.map(branch => ({
        value: branch.branchName.toLowerCase(),
        label: branch.branchName,
    }));

    useEffect(() => {
        dispatch(getAllBranch("branches"));
    }, [])

    const FormValidationSchema = yup.object({
        username: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        mobile: yup.string().required("Mobile number is required"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        role: yup.mixed().required("Role is required"),
        branch: yup.mixed().required("Branch is required"),
    }).required();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const onSubmit = (data) => {

        const user = {
            username: data.username,
            email: data.email,
            mobile: data.mobile,
            password: data.password,
            role: data.role.value,
            branch: data.branch.value,
        };

        dispatch(addNewUser(user));
        setTimeout(() => {
            dispatch(toggleAddModal(false));
            dispatch(getAllUsers("user"));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Add New User"
                labelclassName="btn-outline-dark"
                activeModal={addModel}
                onClose={() => dispatch(toggleAddModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <Textinput
                            name="username"
                            label="name"
                            type="text"
                            placeholder="Enter name"
                            register={register}
                            error={errors.username}
                            className="h-[48px]"
                        />
                        <Textinput
                            name="email"
                            label="email"
                            type="email"
                            placeholder="Enter email"
                            register={register}
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
                                defaultValue={null}
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
                            {errors.role && <span className="text-danger-500 block text-sm">{errors.role.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="branch" className="form-label">
                                Select Branch
                            </label>
                            <Controller
                                name="branch"
                                control={control}
                                defaultValue={null}
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
                            {errors.branch && <span className="text-danger-500 block text-sm">{errors.branch.message}</span>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <Textinput
                            name="mobile"
                            label="mobile"
                            type="tel"
                            placeholder="Enter mobile no"
                            register={register}
                            error={errors.mobile}
                            className="h-[48px]"
                        />
                        <Textinput
                            name="password"
                            label="password"
                            type="password"
                            placeholder="Enter password"
                            register={register}
                            error={errors.password}
                            className="h-[48px]"
                        />
                    </div>

                    <button type="submit" className="btn btn-dark block w-full text-center">
                        Create an account
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default AddUser;
