import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";
import { getAllPaymentData, toggleAddModal, toggleInfoModal } from "./PaymentReducer/PaymentSlice";
import PaymentList from "./PaymentList";
import AddPaymentFile from "./AddPaymentData";
import EditPaymentData from "./EditPaymentData";
import Datepicker from "react-tailwindcss-datepicker";
import ViewPaymentData from "./ViewPaymentData";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import InfoPage from "./Info";

const AllPaymentPage = () => {
    const [filler, setFiller] = useState("list");
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);

    const { paymentdata } = useSelector((state) => state.paymentdata);
    const role = useSelector((state) => state.user?.loggedInUser?.role);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoaded(true);
        setTimeout(() => {
            setIsLoaded(false);
        }, 1500);
    }, [filler]);


    return (
        <div>
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                    Payments List
                </h4>
                <div className="flex items-center space-x-2">
                    {role && role === "admin" && (<Tooltip
                        content="Info click Here"
                        placement="top"
                        arrow
                        theme="danger"
                        animation="shift-away"
                    >
                        <button
                            className="btn-danger p-2 rounded-full dark:bg-danger text-sm font-normal flex items-center justify-center"
                            onClick={() => dispatch(toggleInfoModal(true))}
                        >
                            <Icon icon="heroicons-outline:information-circle" />
                        </button>
                    </Tooltip>)}
                    <div
                        className={`${width < breakpoints.md ? "space-x-rb" : ""
                            } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                    >

                        {role && role === "admin" && (
                            <Button
                                icon="heroicons-outline:plus"
                                text="Add Payment"
                                className="btn-dark dark:bg-slate-800 h-min text-sm font-normal"
                                iconClass=" text-lg"
                                onClick={() => dispatch(toggleAddModal(true))}
                            />
                        )}

                    </div>
                </div>
            </div>

            {isLoaded && filler === "list" && (
                <TableLoading count={paymentdata?.length} />
            )}

            {filler === "list" && !isLoaded && (
                <div>
                    <PaymentList />
                </div>
            )}
            <AddPaymentFile />
            <EditPaymentData />
            <ViewPaymentData />
            <InfoPage />
        </div>
    );
};

export default AllPaymentPage;


