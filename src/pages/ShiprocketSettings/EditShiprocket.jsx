import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    getShiprocketCredentials,
    toggleEditModal,
    updateShiprocketCredentials,
} from "../ShiprocketSettings/ShiprocketReducers/shiprocketSlice";

const EditShiprocket = () => {
    const { editModal, editItem } = useSelector((state) => state.shiprocket); // Access the state for shiprocket
    const dispatch = useDispatch();

    // Define form validation schema
    const FormValidationSchema = yup.object({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required"),
    }).required();

    // Initialize react-hook-form
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    // Reset form with editItem data when it changes
    useEffect(() => {
        reset(editItem);
    }, [editItem, reset]);

    // Handle form submission
    const onSubmit = (data) => {
        const updatedCredentials = {
            email: data.email,
            password: data.password,
        };

        // Dispatch update action
        dispatch(updateShiprocketCredentials(updatedCredentials));

        setTimeout(() => {
            dispatch(toggleEditModal(false));
            dispatch(getShiprocketCredentials()); // Fetch updated credentials
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Edit Shiprocket Credentials"
                labelclassName="btn-outline-dark"
                activeModal={editModal}
                onClose={() => dispatch(toggleEditModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <Textinput
                            name="email"
                            label="Shiprocket Mail Id"
                            type="email"
                            placeholder="Shiprocket Mail Id"
                            register={register}
                            defaultValue={editItem?.email}
                            error={errors.email?.message}
                            className="h-[48px]"
                        />
                        <Textinput
                            name="password"
                            label="Shiprocket Mail Password"
                            type="text"
                            placeholder="Shiprocket Mail Password"
                            register={register}
                            defaultValue={editItem?.password}
                            error={errors.password?.message}
                            className="h-[48px]"
                        />
                    </div>
                    <button className="btn btn-dark block w-full text-center">
                        Update Credentials
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default EditShiprocket;
