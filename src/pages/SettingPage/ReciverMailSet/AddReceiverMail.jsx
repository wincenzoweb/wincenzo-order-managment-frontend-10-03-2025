
import React from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import { addReceiverMail, getAllReceiverMails, toggleAddMailModal } from "../SettingReducer/settingSlice";


const AddReceiverMail = () => {
    const { addMailModel } = useSelector((state) => state.setting);
    const dispatch = useDispatch();

    const FormValidationSchema = yup.object({
        receiverMail: yup.string().email("Invalid email").required("Email is required"),

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

        const newMail = {
            receiverMail: data.receiverMail,
        };

        dispatch(addReceiverMail(newMail));
        setTimeout(() => {
            dispatch(toggleAddMailModal(false));
            dispatch(getAllReceiverMails("setting"));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Add New Mail"
                labelclassName="btn-outline-dark"
                activeModal={addMailModel}
                onClose={() => dispatch(toggleAddMailModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                    <div className="grid gap-4">
                        <Textinput
                            name="receiverMail"
                            label="Receiver Mail Id"
                            type="email"
                            placeholder="Receiver Mail Id"
                            register={register}
                            error={errors.receiverMail?.message}
                            className="h-[48px]"
                        />
                        <button type="submit" className="btn btn-sm btn-dark block w-fit text-center">
                            Add Mail
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddReceiverMail;