import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import FormGroup from "@/components/ui/FormGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getPaginatedReturnData, toggleEditModal, updateReturnAndPendingData } from "./ReturnAndPendingReducer/ReturnAndPendingSlice";

const EditReturnAndPendingData = () => {
    const { editModal, editItem, currentPage, pageLimit } = useSelector((state) => state.returnAndPendingdata);
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
        const user = {
            id: editItem?._id,
            data
        };

        dispatch(updateReturnAndPendingData(user));
        console.log("edit",user);

        setTimeout(() => {
            dispatch(toggleEditModal(false));
            dispatch(
                getPaginatedReturnData({
                    page: currentPage,
                    limit: pageLimit,
                })
            );
            reset();
        }, 1000);
    };



    return (
        <div>
            <Modal
                title="Edit Return Data"
                labelclassName="btn-outline-dark"
                activeModal={editModal}
                className="max-w-5xl"
                onClose={() => dispatch(toggleEditModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid lg:grid-cols-5 md:grid-cols-5 gap-4 grid-cols-1">
                        <Textinput
                            name="sl"
                            label="SL"
                            type="number"
                            placeholder="Enter SL"
                            register={register}
                            defaultValue={editItem?.sl}
                            error={errors.sl}
                        />
                        <Textinput
                            name="barcode"
                            label="Barcode"
                            type="text"
                            placeholder="Enter barcode"
                            register={register}
                            defaultValue={editItem?.barcode}
                            error={errors.barcode}
                        />
                        <Textinput
                            name="ref"
                            label="Reference"
                            type="text"
                            placeholder="Enter reference"
                            register={register}
                            defaultValue={editItem?.ref}
                            error={errors.ref}
                        />
                        <Textinput
                            name="city"
                            label="City"
                            type="text"
                            placeholder="Enter city"
                            register={register}
                            defaultValue={editItem?.city}
                            error={errors.city}
                        />
                        <Textinput
                            name="pincode"
                            label="Pincode"
                            type="text"
                            placeholder="Enter pincode"
                            register={register}
                            defaultValue={editItem?.pincode}
                            error={errors.pincode}
                        />
                        <Textinput
                            name="name"
                            label="Name"
                            type="text"
                            placeholder="Enter name"
                            register={register}
                            defaultValue={editItem?.name}
                            error={errors.name}
                        />
                        <Textinput
                            name="add1"
                            label="Address Line 1"
                            type="text"
                            placeholder="Enter address line 1"
                            register={register}
                            defaultValue={editItem?.add1}
                            error={errors.add1}
                        />
                        <Textinput
                            name="add2"
                            label="Address Line 2"
                            type="text"
                            placeholder="Enter address line 2"
                            register={register}
                            defaultValue={editItem?.add2}
                            error={errors.add2}
                        />
                        <Textinput
                            name="add3"
                            label="Address Line 3"
                            type="text"
                            placeholder="Enter address line 3"
                            register={register}
                            defaultValue={editItem?.add3}
                            error={errors.add3}
                        />
                        <Textinput
                            name="addremail"
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                            register={register}
                            defaultValue={editItem?.addremail}
                            error={errors.addremail}
                        />
                        <Textinput
                            name="addrmobile"
                            label="Mobile"
                            type="text"
                            placeholder="Enter mobile"
                            register={register}
                            defaultValue={editItem?.addrmobile}
                            error={errors.addrmobile}
                        />
                        <Textinput
                            name="sendermobile"
                            label="Sender Mobile"
                            type="text"
                            placeholder="Enter sender mobile"
                            register={register}
                            defaultValue={editItem?.sendermobile}
                            error={errors.sendermobile}
                        />
                        <Textinput
                            name="weight"
                            label="Weight"
                            type="number"
                            placeholder="Enter weight"
                            register={register}
                            defaultValue={editItem?.weight}
                            error={errors.weight}
                        />
                        <Textinput
                            name="cod"
                            label="COD"
                            type="number"
                            placeholder="Enter COD"
                            register={register}
                            defaultValue={editItem?.cod}
                            error={errors.cod}
                        />
                        <Textinput
                            name="insval"
                            label="Insurance Value"
                            type="text"
                            placeholder="Enter insurance value"
                            register={register}
                            defaultValue={editItem?.insval}
                            error={errors.insval}
                        />
                        <Textinput
                            name="vpp"
                            label="VPP"
                            type="text"
                            placeholder="Enter VPP"
                            register={register}
                            defaultValue={editItem?.vpp}
                            error={errors.vpp}
                        />
                        <Textinput
                            name="l"
                            label="Length"
                            type="text"
                            placeholder="Enter length"
                            register={register}
                            defaultValue={editItem?.l}
                            error={errors.l}
                        />
                        <Textinput
                            name="b"
                            label="Breadth"
                            type="text"
                            placeholder="Enter breadth"
                            register={register}
                            defaultValue={editItem?.b}
                            error={errors.b}
                        />
                        <Textinput
                            name="h"
                            label="Height"
                            type="text"
                            placeholder="Enter height"
                            register={register}
                            defaultValue={editItem?.h}
                            error={errors.h}
                        />
                        <Textinput
                            name="contenttype"
                            label="Content Type"
                            type="text"
                            placeholder="Enter content type"
                            register={register}
                            defaultValue={editItem?.contenttype}
                            error={errors.contenttype}
                        />
                        <Textinput
                            name="priority"
                            label="Priority"
                            type="text"
                            placeholder="Enter priority"
                            register={register}
                            defaultValue={editItem?.priority}
                            error={errors.priority}
                        />
                        <Textinput
                            name="product"
                            label="Product"
                            type="text"
                            placeholder="Enter product"
                            register={register}
                            defaultValue={editItem?.product}
                            error={errors.product}
                        />
                        <Textinput
                            name="altmobile"
                            label="Alternate Mobile"
                            type="text"
                            placeholder="Enter alternate mobile"
                            register={register}
                            defaultValue={editItem?.altmobile}
                            error={errors.altmobile}
                        />
                        <Textinput
                            name="cr"
                            label="CR"
                            type="text"
                            placeholder="Enter CR"
                            register={register}
                            defaultValue={editItem?.cr}
                            error={errors.cr}
                        />
                        <FormGroup
                            label="Date"
                            id="default-picker2"
                            error={errors.date}
                        >
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        className="form-control py-2"
                                        id="default-picker2"
                                        placeholder="yyyy, dd M"
                                        value={field.value}
                                        onChange={(date) => {
                                            field.onChange(date);
                                        }}
                                        options={{
                                            altInput: true,
                                            altFormat: "F j, Y",
                                            dateFormat: "Y-m-d",
                                        }}
                                    />
                                )}
                            />
                        </FormGroup>
                        <Textinput
                            name="typing"
                            label="Typing"
                            type="text"
                            placeholder="Enter typing"
                            register={register}
                            defaultValue={editItem?.typing}
                            error={errors.typing}
                        />
                        <Textinput
                            name="branch"
                            label="Branch"
                            type="text"
                            placeholder="Enter branch"
                            register={register}
                            defaultValue={editItem?.branch}
                            error={errors.branch}
                        />
                    </div>
                    <button className="btn btn-dark block w-full text-center">Update ReturnAndPending</button>
                </form>
            </Modal>
        </div>
    );
};

export default EditReturnAndPendingData;
