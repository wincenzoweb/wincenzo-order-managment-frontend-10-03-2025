import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";
import { getAllUsers, toggleAddModal } from "./UserReducer/UserSlice";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import UserList from "./UserList";
import DeleteConfirm from "./DeleteConfirmModel";

const AllUserPage = () => {
    const [filler, setfiller] = useState("list");
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);

    const { users } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers("user"));
    }, [])

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
                    Users
                </h4>
                <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                >
                    <Button
                        icon="heroicons-outline:plus"
                        text="Add User"
                        className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                        iconClass=" text-lg"
                        onClick={() => dispatch(toggleAddModal(true))}
                    />
                </div>
            </div>

            {isLoaded && filler === "list" && (
                <TableLoading count={users?.length} />
            )}


            {filler === "list" && !isLoaded && (
                <div>
                    <UserList users={users} />
                </div>
            )}
            <AddUser />
            <EditUser />
            <DeleteConfirm />
        </div>
    );
};

export default AllUserPage;
