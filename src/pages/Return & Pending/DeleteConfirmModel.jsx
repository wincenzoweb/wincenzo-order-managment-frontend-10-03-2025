import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import { deleteReturnAndPendingData, deleteReturnAndPendingDataList, getPaginatedReturnData, toggleConfirmModal } from "./ReturnAndPendingReducer/ReturnAndPendingSlice";


const DeleteConfirm = () => {
    const { confirmModel, itemId, currentPage, pageLimit } = useSelector((state) => state.returnAndPendingdata);
    const dispatch = useDispatch();


    const handleDelete = () => {
        if (typeof itemId === 'string') {
            dispatch(deleteReturnAndPendingData(itemId));
        } else if (Array.isArray(itemId)) {
            dispatch(deleteReturnAndPendingDataList(itemId));
        }

        setTimeout(() => {
            dispatch(toggleConfirmModal(false));
            dispatch(
                getPaginatedReturnData({
                    page: currentPage,
                    limit: pageLimit,
                })
            );
        }, 1000);
    };

    return (
        <div>
            <Modal
                title="Confirmation"
                labelclassName="btn-outline-dark"
                activeModal={confirmModel}
                onClose={() => dispatch(toggleConfirmModal(false))}
            >
                <div>
                    <div>
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <Icon className="h-6 w-6 text-red-600" icon="heroicons:exclamation-triangle" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                    Delete Order
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to Delete Order?
                                        All of your data will be permanently
                                        removed. This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            // onClick={() => {
                            //     dispatch(deleteBookingData(itemId))
                            //     setTimeout(() => {
                            //         dispatch(toggleConfirmModal(false))
                            //         dispatch(getAllBookingData("bookingdata"));
                            //     }, 500);
                            // }}
                            onClick={handleDelete}
                        >
                            Delete Order
                        </button>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => dispatch(toggleConfirmModal(false))}
                            data-autofocus
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </Modal >
        </div >
    );
};

export default DeleteConfirm;
