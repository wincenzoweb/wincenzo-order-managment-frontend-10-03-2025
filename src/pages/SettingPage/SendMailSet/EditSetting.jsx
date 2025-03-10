import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";

import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAllsettings, toggleEditModal, updateSettings } from "../SettingReducer/settingSlice";


const EditSetting = () => {
    const { editModal, editItem } = useSelector((state) => state.setting);
    const dispatch = useDispatch();


    const FormValidationSchema = yup.object({

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
        reset(editItem);
    }, [editItem]);



    const onSubmit = (data) => {

        const editSet = {
            SenderMail: data.SenderMail,
            SenderEmailPassword: data.SenderEmailPassword,
            MaxPendingDelay: data.MaxPendingDelay,
        };

        dispatch(updateSettings(editSet));

        setTimeout(() => {
            dispatch(toggleEditModal(false));
            dispatch(getAllsettings("setting"));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Edit Setting"
                labelclassName="btn-outline-dark"
                activeModal={editModal}
                onClose={() => dispatch(toggleEditModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <Textinput
                            name="SenderMail"
                            label="Sender Mail Id"
                            type="email"
                            placeholder="Sender Mail Id"
                            register={register}
                            defaultValue={editItem.SenderMail}
                            error={errors.SenderMail?.message}
                            className="h-[48px]"
                        />
                        <Textinput
                            name="SenderEmailPassword"
                            label="Sender Email Password"
                            type="text"
                            placeholder="Sender Email Password"
                            register={register}
                            defaultValue={editItem.SenderEmailPassword}
                            error={errors.SenderEmailPassword?.message}
                            className="h-[48px]"
                        />

                        <Textinput
                            name="MaxPendingDelay"
                            label="Max Pending Day"
                            type="number"
                            placeholder="Max Pending Day"
                            register={register}
                            defaultValue={editItem.MaxPendingDelay}
                            error={errors.MaxPendingDelay?.message}
                            className="h-[48px]"
                        />
                    </div>
                    <button className="btn btn-dark block w-full text-center">
                        Update Setting
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default EditSetting;
