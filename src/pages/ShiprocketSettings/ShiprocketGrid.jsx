import React, { useEffect } from "react";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
// import menu form headless ui
import { Menu } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import { editShiprocketData } from "../ShiprocketSettings/ShiprocketReducers/shiprocketSlice";
// import { getShiprocketCredentials } from "../ShiprocketSettings/ShiprocketReducers/shiprocketSlice"; // Import the thunk

const ShiprocketGrid = ({ set }) => {
    const dispatch = useDispatch();

    

    // Display loading state if credentials are being fetched
  

    return (
        <Card className="h-fit">
            {/* header */}
            <header className="flex justify-between items-end">
                <div className="flex space-x-4 items-center rtl:space-x-reverse">
                    <div className="flex-none h-8 w-8 rounded-full bg-slate-800 dark:bg-slate-700 text-slate-300 flex flex-col items-center justify-center text-lg">
                        <Icon icon="heroicons:envelope" />
                    </div>
                    <div className="flex-1 text-base text-slate-900 dark:text-white font-medium">
                        Shiprocket Settings
                    </div>
                </div>
                <div>
                    <Dropdown
                        classMenuItems="w-[130px]"
                        label={
                            <span className="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400">
                                <Icon icon="heroicons-outline:dots-vertical" />
                            </span>
                        }
                    >
                        <div>
                            <Menu.Item onClick={() => dispatch(editShiprocketData(set))}>
                                <div
                                    className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm dark:text-slate-300 last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center capitalize rtl:space-x-reverse"
                                >
                                    <span className="text-base">
                                        <Icon icon="heroicons-outline:pencil-alt" />
                                    </span>
                                    <span>Edit</span>
                                </div>
                            </Menu.Item>
                        </div>
                    </Dropdown>
                </div>
            </header>
            {/* description */}
            <div className="text-slate-900 dark:text-white text-sm pt-4">
                <p>Shiprocket Mail Id :<span className="text-blue-600"> {set?.email}</span></p>
            </div>
            <div className="text-slate-900 dark:text-white text-sm pt-4">
                <p>Shiprocket Mail Password :<span className="text-blue-600"> {set?.password}</span></p>
            </div>
        </Card>
    );
};

export default ShiprocketGrid;
