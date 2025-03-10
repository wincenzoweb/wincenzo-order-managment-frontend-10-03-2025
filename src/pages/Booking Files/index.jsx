import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import TableLoading from "@/components/skeleton/Table";
import { toggleAddModal, toggleInfoModal } from "./BookingReducer/BookingSlice";
import BookingList from "./BookingList";
import AddBookingFile from "./AddBookingFile";
import EditBookingData from "./EditBookingData";
import ViewBookingData from "./ViewBookingData";
import InfoPage from "./Info";
import Icon from "@/components/ui/Icon";



const AllBookingPage = () => {
    const [filler, setFiller] = useState("list");
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);

    const { bookingdata } = useSelector((state) => state.bookingdata);

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
                    Bookings List
                </h4>
                <div className="flex items-center space-x-2">
                    {(role && role === "admin" && <Tooltip
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
                    <div className={`${width < breakpoints.md ? "space-x-rb" : ""} md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}>

                        {role && role === "admin" && (
                            <Button
                                icon="heroicons-outline:plus"
                                text="Add Booking"
                                className="btn-dark dark:bg-slate-800 h-min text-sm font-normal"
                                iconClass=" text-lg"
                                onClick={() => dispatch(toggleAddModal(true))}
                            />
                        )}
                    </div>
                </div>
            </div>

            {isLoaded && filler === "list" && (
                <TableLoading count={bookingdata?.length} />
            )}

            {filler === "list" && !isLoaded && (
                <div>
                    <BookingList />
                </div>
            )}
            <AddBookingFile />
            <EditBookingData />
            <ViewBookingData />
            <InfoPage />
        </div>
    );
};

export default AllBookingPage;

