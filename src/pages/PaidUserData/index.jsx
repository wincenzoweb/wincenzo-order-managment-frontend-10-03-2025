import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import TableLoading from "@/components/skeleton/Table";
import PaidUsersList from "./UserPaymentDataList";
import ViewUserPaymentData from "./ViewUserPaymentData";

const PaidUsersPage = () => {
    const [filler, setFiller] = useState("list");
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);

    const { paidUserInfos } = useSelector((state) => state.paiduserdata);
    const { bookingdata } = useSelector((state) => state.bookingdata);

    const role = useSelector((state) => state.user?.loggedInUser?.role);


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
                    Paid Users Detail
                </h4>

            </div>

            {isLoaded && filler === "list" && (
                <TableLoading count={bookingdata?.length} />
            )}

            {filler === "list" && !isLoaded && (
                <div>
                    <PaidUsersList />
                </div>
            )}
            <ViewUserPaymentData />
        </div>
    );
};

export default PaidUsersPage;


