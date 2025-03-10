
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";
import { getAllReceiverMails, getAllsettings, toggleAddModal } from "../SettingReducer/settingSlice";
import SettingGrid from "./SettingGrid";
import AddSetting from "./AddSetting";
import EditSetting from "./EditSetting";
import ReceiverMailTable from "../ReciverMailSet/ReceiverMailList";
import { getShiprocketCredentials } from "../../ShiprocketSettings/ShiprocketReducers/shiprocketSlice";
import ShiprocketGrid from "../../ShiprocketSettings/ShiprocketGrid"
import EditShiprocket from "../../ShiprocketSettings/EditShiprocket";
// import E from "../../ShiprocketSettings/EditShiprocket";



const SettingPage = () => {
    const [filler, setFiller] = useState("grid");
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);

    const { settings, receiverMails } = useSelector((state) => state.setting);
    const { credentials } = useSelector((state)=> state.shiprocket);


    const role = useSelector((state) => state.user?.loggedInUser?.role);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllsettings("setting"));
        dispatch(getShiprocketCredentials("shiprocket"));

    }, []);
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
            <ToastContainer />
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                    Settings
                </h4>

                <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                >

                    {role && role === "admin" &&
                        <Button
                            icon="heroicons-outline:plus"
                            text="Add Settings"
                            className="btn-dark dark:bg-slate-800 h-min text-sm font-normal"
                            iconClass=" text-lg"
                            onClick={() => dispatch(toggleAddModal(true))}
                        />
                    }
                </div>
            </div>

            {isLoaded && filler === "grid" && (
                <TableLoading count={receiverMails?.length} />
            )}

            {filler === "grid" && !isLoaded && (

                <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <ReceiverMailTable mails={receiverMails} />
                    </div>
                    <div>
                        <SettingGrid set={settings} />
                        <br />
                        <div>
                        <ShiprocketGrid set={credentials} />
                    </div>
                    </div>
                </div>
            )}
            <AddSetting />
            <EditSetting />
            <EditShiprocket />


        </div>
    );
};

export default SettingPage;



