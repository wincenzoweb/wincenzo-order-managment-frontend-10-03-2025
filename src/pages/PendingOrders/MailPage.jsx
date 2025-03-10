import React, { useState } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";

import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendMail, toggleEmailModal } from "./sendMailReducer/emailSlice";

const FormValidationSchema = yup
    .object({
        subject: yup.string().required("Subject is required"),
        sendTo: yup.mixed().required("Select Mail Id is required"),
        description: yup.mixed().required("Description is required"),
    })
    .required();

const styles = {
    multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
    },
    multiValueLabel: (base, state) => {
        return state.data.isFixed
            ? { ...base, color: "#626262", paddingRight: 6 }
            : base;
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: "none" } : base;
    },
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};


const ComposeEmail = () => {
    const { emailModal, emailItem } = useSelector((state) => state.sendEmail);
    const { receiverMails } = useSelector((state) => state.setting);
    const dispatch = useDispatch();

    const receiverMailsOptions = receiverMails.map(mailId => ({
        value: mailId.receiverMail.toLowerCase(),
        label: mailId.receiverMail,
    }));

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const onSubmit = (data) => {

        const mailInfo = {
            subject: data.subject,
            sendTo: data.sendTo.value,
            description: data.description,
            orderDetail: emailItem
        }
        console.log(mailInfo)
        dispatch(
            sendMail(mailInfo)
        );
        setTimeout(() => {
            dispatch(toggleEmailModal(false));
            reset();
        }, 500);
    };
    return (
        <div>
            <Modal
                title="Compose Eamil"
                activeModal={emailModal}
                onClose={() => dispatch(toggleEmailModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <div className={errors.assign ? "has-error" : ""}>
                        <label className="form-label" htmlFor="mailId">
                            To
                        </label>
                        <Controller
                            name="sendTo"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={receiverMailsOptions}
                                    styles={styles}
                                    // isMulti
                                    className="react-select"
                                    classNamePrefix="select"
                                    id="mailId"
                                />
                            )}
                        />
                        {errors.assign && (
                            <div className=" mt-2  text-danger-500 block text-sm">
                                {errors.assign?.message || errors.assign?.label.message}
                            </div>
                        )}
                    </div>
                    <Textinput
                        name="subject"
                        label="Subject"
                        type="text"
                        placeholder="Enter title"
                        register={register}
                        error={errors.subject}
                    />
                    <Textarea
                        name="description"
                        label="Description"
                        placeholder="Description"
                        register={register}
                    />

                    <div className="ltr:text-right rtl:text-left">
                        <button className="btn btn-dark text-center">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ComposeEmail;
