import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import FormGroup from "@/components/ui/FormGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getPaginatedPaymentData, toggleEditModal, updatePaymentData } from "./PaymentReducer/PaymentSlice";

const EditPaymentData = () => {
    const { editModal, editItem, currentPage, pageLimit } = useSelector((state) => state.paymentdata);
    const dispatch = useDispatch();

    const FormValidationSchema = yup.object({}).required();

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

        dispatch(updatePaymentData(user));

        setTimeout(() => {
            dispatch(toggleEditModal(false));
            dispatch(
                getPaginatedPaymentData({
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
                title="Edit Payment Data"
                labelclassName="btn-outline-dark"
                activeModal={editModal}
                className="max-w-5xl"
                onClose={() => dispatch(toggleEditModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid lg:grid-cols-5 md:grid-cols-5 gap-4 grid-cols-1">
                        {/* Previous Textinput components */}
                        <Textinput
                            name="article_number"
                            label="Article Number"
                            type="text"
                            placeholder="Enter Article Number"
                            register={register}
                            defaultValue={editItem?.article_number}
                            error={errors.article_number}
                        />
                        <Textinput
                            name="article_type"
                            label="Article Type"
                            type="text"
                            placeholder="Enter Article Type"
                            register={register}
                            defaultValue={editItem?.article_type}
                            error={errors.article_type}
                        />

                        <Textinput
                            name="booking_office_id"
                            label="Booking Office ID"
                            type="text"
                            placeholder="Enter Booking Office ID"
                            register={register}
                            defaultValue={editItem?.booking_office_id}
                            error={errors.booking_office_id}
                        />
                        <Textinput
                            name="booking_office_name"
                            label="Booking Office Name"
                            type="text"
                            placeholder="Enter Booking Office Name"
                            register={register}
                            defaultValue={editItem?.booking_office_name}
                            error={errors.booking_office_name}
                        />
                        <Textinput
                            name="booking_office_pin"
                            label="Booking Office Pin"
                            type="text"
                            placeholder="Enter Booking Office Pin"
                            register={register}
                            defaultValue={editItem?.Payment_office_pin}
                            error={errors.Payment_office_pin}
                        />
                        <FormGroup
                            label="Booking Date"
                            id="Booking date"
                            error={errors.date}
                        >
                            <Controller
                                name="booking_date"
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        className="form-control py-2"
                                        id="Booking date"
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
                            name="booking_time"
                            label="Booking Time"
                            type="time"
                            placeholder="Enter Booking Time"
                            register={register}
                            defaultValue={editItem?.booking_time}
                            error={errors.booking_time}
                        />

                        <Textinput
                            name="delivery_office_id"
                            label="Delivery Office ID"
                            type="text"
                            placeholder="Enter Delivery Office ID"
                            register={register}
                            defaultValue={editItem?.delivery_office_id}
                            error={errors.delivery_office_id}
                        />
                        <Textinput
                            name="delivery_office_name"
                            label="Delivery Office Name"
                            type="text"
                            placeholder="Enter Delivery Office Name"
                            register={register}
                            defaultValue={editItem?.delivery_office_name}
                            error={errors.delivery_office_name}
                        />
                        <Textinput
                            name="delivery_office_pin"
                            label="Delivery Office Pin"
                            type="text"
                            placeholder="Enter Delivery Office Pin"
                            register={register}
                            defaultValue={editItem?.delivery_office_pin}
                            error={errors.delivery_office_pin}
                        />
                        <FormGroup
                            label="Delivery Date"
                            id="delivery_date"
                            error={errors.date}
                        >
                            <Controller
                                name="delivery_date"
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        className="form-control py-2"
                                        id="delivery_date"
                                        placeholder="yyyy, dd, M"
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
                            name="rts"
                            label="RTS"
                            type="text"
                            placeholder="Enter RTS"
                            register={register}
                            defaultValue={editItem?.rts}
                            error={errors.rts}
                        />
                        <Textinput
                            name="gross_amount"
                            label="Gross Amount"
                            type="number"
                            placeholder="Enter Gross Amount"
                            register={register}
                            defaultValue={editItem?.gross_amount}
                            error={errors.gross_amount}
                        />
                        <Textinput
                            name="commission"
                            label="Commission"
                            type="number"
                            placeholder="Enter Commission"
                            register={register}
                            defaultValue={editItem?.commission}
                            error={errors.commission}
                        />
                        <Textinput
                            name="amount_lc_1"
                            label="Amount LC1"
                            type="number"
                            placeholder="Enter Amount LC1"
                            register={register}
                            defaultValue={editItem?.amount_lc_1}
                            error={errors.amount_lc_1}
                        />
                        <Textinput
                            name="amount_lc_2"
                            label="Amount LC2"
                            type="number"
                            placeholder="Enter Amount LC2"
                            register={register}
                            defaultValue={editItem?.amount_lc_2}
                            error={errors.amount_lc_2}
                        />
                        <Textinput
                            name="round_off_amount"
                            label="Round Off Amount"
                            type="number"
                            placeholder="Enter Round Off Amount"
                            register={register}
                            defaultValue={editItem?.round_off_amount}
                            error={errors.round_off_amount}
                        />
                        <Textinput
                            name="net_payable"
                            label="Net Payable"
                            type="number"
                            placeholder="Enter Net Payable"
                            register={register}
                            defaultValue={editItem?.net_payable}
                            error={errors.net_payable}
                        />
                        <FormGroup
                            label="Payment Date"
                            id="PaymentDate"
                            error={errors.date}
                        >
                            <Controller
                                name="payment_date"
                                control={control}
                                render={({ field }) => (
                                    <Flatpickr
                                        className="form-control py-2"
                                        id="PaymentDate"
                                        placeholder="yyyy, dd, M"
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
                            name="payment_office_id"
                            label="Payment Office ID"
                            type="text"
                            placeholder="Enter Payment Office ID"
                            register={register}
                            defaultValue={editItem?.payment_office_id}
                            error={errors.payment_office_id}
                        />
                        <Textinput
                            name="payment_office_name"
                            label="Payment Office Name"
                            type="text"
                            placeholder="Enter Payment Office Name"
                            register={register}
                            defaultValue={editItem?.payment_office_name}
                            error={errors.payment_office_name}
                        />
                        <Textinput
                            name="payment_document_no"
                            label="Payment Document No"
                            type="text"
                            placeholder="Enter Payment Document No"
                            register={register}
                            defaultValue={editItem?.payment_document_no}
                            error={errors.payment_document_no}
                        />
                        <Textinput
                            name="payment_cheque_no"
                            label="Payment Cheque No"
                            type="text"
                            placeholder="Enter Payment Cheque No"
                            register={register}
                            defaultValue={editItem?.payment_cheque_no}
                            error={errors.payment_cheque_no}
                        />
                        <Textinput
                            name="liability_document"
                            label="Liability Document"
                            type="text"
                            placeholder="Enter Liability Document"
                            register={register}
                            defaultValue={editItem?.liability_document}
                            error={errors.liability_document}
                        />
                        <Textinput
                            name="system_postings"
                            label="System Postings"
                            type="text"
                            placeholder="Enter System Postings"
                            register={register}
                            defaultValue={editItem?.system_postings}
                            error={errors.system_postings}
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
                        <Textinput
                            name="status"
                            label="Status"
                            type="text"
                            placeholder="Enter Status"
                            register={register}
                            defaultValue={editItem?.status}
                            error={errors.status}
                        />
                    </div>
                    <button className="btn btn-dark block w-full text-center">Update Payment</button>
                </form>
            </Modal>
        </div>
    );
};

export default EditPaymentData;
