import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";
import PendingOrderList from "./PendingOrderList.jsx";
import EditPendingOrder from "./EditPendingOrder.jsx";
import ViewPendingOrder from "./ViewPendingOrder.jsx";
import ComposeEmail from "./MailPage.jsx";
import { getAllReceiverMails } from "../SettingPage/SettingReducer/settingSlice.jsx";

const PendingOrderPage = () => {
    const [filler, setFiller] = useState("list");
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);

    const { pendingOrder } = useSelector((state) => state.pendingorder);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReceiverMails("setting"));
    }, []);


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
                    Pending Orders List
                </h4>

                {/* <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                >
                    
                </div> */}
            </div>

            {isLoaded && filler === "list" && (
                <TableLoading count={pendingOrder?.length} />
            )}

            {filler === "list" && !isLoaded && (
                <div>
                    <PendingOrderList />
                </div>
            )}
            <EditPendingOrder />
            <ViewPendingOrder />
            <ComposeEmail />
        </div>
    );
};

export default PendingOrderPage;


