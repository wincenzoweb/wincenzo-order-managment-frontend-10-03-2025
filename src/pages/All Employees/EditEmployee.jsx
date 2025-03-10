import React from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployee, toggleEditModal, updateEmployee } from "./Reducer/EmployeesSlice";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const EditEmployee = () => {
    const { editModal, editItem } = useSelector((state) => state.employees);
    const dispatch = useDispatch();

    const FormValidationSchema = yup.object({
        username: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        mobile: yup.string().required("Mobile number is required"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    }).required();

    const {
        register,
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const onSubmit = (data) => {

        const Employee = {
            id: editItem?._id,
            data
        };


        dispatch(updateEmployee(Employee));

        setTimeout(() => {
            dispatch(toggleEditModal(false));
            dispatch(getAllEmployee("employees"));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Edit Employee"
                labelclassName="btn-outline-dark"
                activeModal={editModal}
                onClose={() => dispatch(toggleEditModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                    <Textinput
                        name="username"
                        label="name"
                        type="text"
                        placeholder="Enter name"
                        register={register}
                        defaultValue={editItem.username}
                        error={errors.name}
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
                        placeholder="Enter password"
                        register={register}
                        defaultValue={editItem.password}
                        error={errors.password}
                        className="h-[48px]"
                    />

                    <button className="btn btn-dark block w-full text-center">
                        Update Employee
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default EditEmployee;
