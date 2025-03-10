import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";

import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAllReceiverMails, toggleEditMailModal, updateReceiverMail } from "../SettingReducer/settingSlice";


const EditMail = () => {
    const { editMailModel, editItem } = useSelector((state) => state.setting);
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
        const { receiverMail } = data

        const updatedMail = {
            id: editItem?._id,
            receiverMail: receiverMail
        };

        dispatch(updateReceiverMail(updatedMail));

        setTimeout(() => {
            dispatch(toggleEditMailModal(false));
            dispatch(getAllReceiverMails("setting"));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Edit Mail"
                labelclassName="btn-outline-dark"
                activeModal={editMailModel}
                onClose={() => dispatch(toggleEditMailModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                    <div className="grid gap-4">
                        <Textinput
                            name="receiverMail"
                            label="Receiver Mail Id"
                            type="email"
                            placeholder="Receiver Mail Id"
                            register={register}
                            defaultValue={editItem.receiverMail}
                            error={errors.receiverMail?.message}
                            className="h-[48px]"
                        />
                        <button className="btn btn-sm btn-dark block w-fit text-center">
                            Update Mail
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EditMail;
