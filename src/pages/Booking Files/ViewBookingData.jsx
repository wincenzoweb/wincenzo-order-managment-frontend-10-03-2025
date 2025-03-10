import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import FormGroup from "@/components/ui/FormGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toggleDetailModal } from "./BookingReducer/BookingSlice";

const ViewBookingData = () => {
    const { detailModal, detailItem } = useSelector((state) => state.bookingdata);
    const dispatch = useDispatch();

    const FormValidationSchema = yup.object({}).required();

    const {
        register,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    useEffect(() => {
        reset(detailItem);
    }, [detailItem, reset]);

    return (
        <div>
            <Modal
                title="View Booking Data"
                labelclassName="btn-outline-dark"
                activeModal={detailModal}
                className="max-w-5xl"
                onClose={() => dispatch(toggleDetailModal(false))}
            >
                <form className="space-y-5">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
                        <Textinput
                            name="sl"
                            label="SL"
                            type="number"
                            placeholder="Enter SL"
                            register={register}
                            defaultValue={detailItem?.sl}
                            error={errors.sl}
                            disabled
                        />
                        <Textinput
                            name="barcode"
                            label="Barcode"
                            type="text"
                            placeholder="Enter barcode"
                            register={register}
                            defaultValue={detailItem?.barcode}
                            error={errors.barcode}
                            disabled
                        />
                        <Textinput
                            name="ref"
                            label="Reference"
                            type="text"
                            placeholder="Enter reference"
                            register={register}
                            defaultValue={detailItem?.ref}
                            error={errors.ref}
                            disabled
                        />
                        <Textinput
                            name="city"
                            label="City"
                            type="text"
                            placeholder="Enter city"
                            register={register}
                            defaultValue={detailItem?.city}
                            error={errors.city}
                            disabled
                        />
                        <Textinput
                            name="pincode"
                            label="Pincode"
                            type="text"
                            placeholder="Enter pincode"
                            register={register}
                            defaultValue={detailItem?.pincode}
                            error={errors.pincode}
                            disabled
                        />
                        <Textinput
                            name="name"
                            label="Name"
                            type="text"
                            placeholder="Enter name"
                            register={register}
                            defaultValue={detailItem?.name}
                            error={errors.name}
                            disabled
                        />
                        <Textinput
                            name="add1"
                            label="Address Line 1"
                            type="text"
                            placeholder="Enter address line 1"
                            register={register}
                            defaultValue={detailItem?.add1}
                            error={errors.add1}
                            disabled
                        />
                        <Textinput
                            name="add2"
                            label="Address Line 2"
                            type="text"
                            placeholder="Enter address line 2"
                            register={register}
                            defaultValue={detailItem?.add2}
                            error={errors.add2}
                            disabled
                        />
                        <Textinput
                            name="add3"
                            label="Address Line 3"
                            type="text"
                            placeholder="Enter address line 3"
                            register={register}
                            defaultValue={detailItem?.add3}
                            error={errors.add3}
                            disabled
                        />
                        <Textinput
                            name="addremail"
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                            register={register}
                            defaultValue={detailItem?.addremail}
                            error={errors.addremail}
                            disabled
                        />
                        <Textinput
                            name="addrmobile"
                            label="Mobile"
                            type="text"
                            placeholder="Enter mobile"
                            register={register}
                            defaultValue={detailItem?.addrmobile}
                            error={errors.addrmobile}
                            disabled
                        />
                        <Textinput
                            name="sendermobile"
                            label="Sender Mobile"
                            type="text"
                            placeholder="Enter sender mobile"
                            register={register}
                            defaultValue={detailItem?.sendermobile}
                            error={errors.sendermobile}
                            disabled
                        />
                        <Textinput
                            name="weight"
                            label="Weight"
                            type="number"
                            placeholder="Enter weight"
                            register={register}
                            defaultValue={detailItem?.weight}
                            error={errors.weight}
                            disabled
                        />
                        <Textinput
                            name="cod"
                            label="COD"
                            type="number"
                            placeholder="Enter COD"
                            register={register}
                            defaultValue={detailItem?.cod}
                            error={errors.cod}
                            disabled
                        />
                        <Textinput
                            name="insval"
                            label="Insurance Value"
                            type="text"
                            placeholder="Enter insurance value"
                            register={register}
                            defaultValue={detailItem?.insval}
                            error={errors.insval}
                            disabled
                        />
                        <Textinput
                            name="vpp"
                            label="VPP"
                            type="text"
                            placeholder="Enter VPP"
                            register={register}
                            defaultValue={detailItem?.vpp}
                            error={errors.vpp}
                            disabled
                        />
                        <Textinput
                            name="l"
                            label="Length"
                            type="text"
                            placeholder="Enter length"
                            register={register}
                            defaultValue={detailItem?.l}
                            error={errors.l}
                            disabled
                        />
                        <Textinput
                            name="b"
                            label="Breadth"
                            type="text"
                            placeholder="Enter breadth"
                            register={register}
                            defaultValue={detailItem?.b}
                            error={errors.b}
                            disabled
                        />
                        <Textinput
                            name="h"
                            label="Height"
                            type="text"
                            placeholder="Enter height"
                            register={register}
                            defaultValue={detailItem?.h}
                            error={errors.h}
                            disabled
                        />
                        <Textinput
                            name="contenttype"
                            label="Content Type"
                            type="text"
                            placeholder="Enter content type"
                            register={register}
                            defaultValue={detailItem?.contenttype}
                            error={errors.contenttype}
                            disabled
                        />
                        <Textinput
                            name="priority"
                            label="Priority"
                            type="text"
                            placeholder="Enter priority"
                            register={register}
                            defaultValue={detailItem?.priority}
                            error={errors.priority}
                            disabled
                        />
                        <Textinput
                            name="product"
                            label="Product"
                            type="text"
                            placeholder="Enter product"
                            register={register}
                            defaultValue={detailItem?.product}
                            error={errors.product}
                            disabled
                        />
                        <Textinput
                            name="altmobile"
                            label="Alternate Mobile"
                            type="text"
                            placeholder="Enter alternate mobile"
                            register={register}
                            defaultValue={detailItem?.altmobile}
                            error={errors.altmobile}
                            disabled
                        />
                        <Textinput
                            name="cr"
                            label="CR"
                            type="text"
                            placeholder="Enter CR"
                            register={register}
                            defaultValue={detailItem?.cr}
                            error={errors.cr}
                            disabled
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
                                        disabled
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
                            defaultValue={detailItem?.typing}
                            error={errors.typing}
                            disabled
                        />
                        <Textinput
                            name="branch"
                            label="Branch"
                            type="text"
                            placeholder="Enter branch"
                            register={register}
                            defaultValue={detailItem?.branch}
                            error={errors.branch}
                            disabled
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ViewBookingData;
