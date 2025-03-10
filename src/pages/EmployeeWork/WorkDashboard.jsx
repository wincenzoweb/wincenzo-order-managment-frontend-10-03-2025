import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "./HomeBredCurbs";
import Datepicker from "react-tailwindcss-datepicker";
import WorkDetail from "./WorkDetail";
import { useSelector } from "react-redux";
import { getEmployeeStatistics } from "./statisticsReducer/statisticsSlice";
import { useDispatch } from "react-redux";


const WorkDashboard = () => {
    const User = useSelector((state) => state.user?.loggedInUser);
    const { allEmployeeOrderStatistics, employeeOrderStatistics } = useSelector((state) => state.statistics);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployeeStatistics({
            startDate: selectedStartDate ? new Date(selectedStartDate).toISOString() : undefined,
            endDate: selectedEndDate ? new Date(selectedEndDate).toISOString() : undefined,
        }));
    }, [selectedStartDate, selectedEndDate]);

    const handleValueChange = (newValue) => {
        setSelectedStartDate(newValue.startDate);
        setSelectedEndDate(newValue.endDate);
    };

    return (
        <div className="space-y-5">
            <HomeBredCurbs title="Work Dashboard" />

            <div className="flex justify-end mb-4">
                <div className="w-96">
                    <h6 className="text-sm mb-2">Filter by Date</h6>
                    <Datepicker
                        value={{ startDate: selectedStartDate, endDate: selectedEndDate }}
                        onChange={handleValueChange}
                        displayFormat={"DD/MM/YYYY"}
                    />
                </div>
            </div>
            {User.role === 'admin' && (
                <Card>
                    <WorkDetail data={employeeOrderStatistics} title="All Employees" />
                </Card>
            )}

            <div className="grid grid-cols-12 gap-5">
                {allEmployeeOrderStatistics?.map((employeeData) => {
                    if (User.role === 'admin' || (User.role === 'employee' && User.username === employeeData.username)) {
                        return (
                            <div key={employeeData.username} className="2xl:col-span-12 lg:col-span-12 col-span-12">
                                <Card>
                                    <WorkDetail username={employeeData.username} data={employeeData} title={employeeData.username} />
                                </Card>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default WorkDashboard;




// import React, { useEffect, useState } from "react";
// import Card from "@/components/ui/Card";
// import HomeBredCurbs from "./HomeBredCurbs";
// import Mainuser from "@/assets/images/all-img/main-user.png";
// import { useSelector, useDispatch } from "react-redux";
// import Datepicker from "react-tailwindcss-datepicker";
// import { getAllBookingData } from "../Booking Files/BookingReducer/BookingSlice";
// import { getAllPaymentData} from "../Payment Sheets/PaymentReducer/paymentSlice";
// import { getAllReturnAndPendingData } from "../Return & Pending/ReturnAndPendingReducer/ReturnAndPendingSlice";
// import { getAllBranch } from "../All Branch/BranchReducer/branchSlice";
// import WorkDetail from "./WorkDetail";
// import { getAllUsers } from "../UserPage/UserReducer/UserSlice";
// import { getAllPaymentInfo } from "../PaidUserData/paidUserReducer/paidUserSlice";
// import { getPendingOrders } from "../PendingOrders/PendingOrderReducer/pendingOrderSlice";

// const WorkDashboard = () => {
//     const User = useSelector((state) => state.user?.loggedInUser);
//     const { users } = useSelector((state) => state.user);
//     const dispatch = useDispatch();

//     const bookingData = useSelector((state) => state.bookingdata.bookingdata);
//     const pendingOrder = useSelector((state) => state.pendingorder.pendingOrder);
//     const returnAndPendingData = useSelector((state) => state.returnAndPendingdata.returnAndPendingData);
//     const { paidUserInfos } = useSelector((state) => state.paiduserdata);

//     const [selectedStartDate, setSelectedStartDate] = useState(null);
//     const [selectedEndDate, setSelectedEndDate] = useState(null);

//     useEffect(() => {
//         dispatch(getAllBranch("branches"));
//         dispatch(getAllBookingData("bookingdata"));
//         dispatch(getAllPaymentData("paymentdata"));
//         dispatch(getAllPaymentInfo("paidUserInfos"));
//         dispatch(getAllReturnAndPendingData("returnAndPendingdata"));
//         dispatch(getPendingOrders("pendingOrder"));
//         dispatch(getAllUsers("user"));
//     }, [dispatch]);

//     const handleValueChange = (newValue) => {
//         setSelectedStartDate(newValue.startDate);
//         setSelectedEndDate(newValue.endDate);
//     };

//     const filterByDate = (data, dateField) => {
//         const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
//         const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

//         if (startDate) startDate.setHours(0, 0, 0, 0);
//         if (endDate) endDate.setHours(23, 59, 59, 999);

//         if (!startDate && !endDate) return true;

//         const dataDate = new Date(data[dateField]);
//         if (startDate && endDate) {
//             if (startDate.getTime() === endDate.getTime()) {
//                 return dataDate.getTime() === startDate.getTime();
//             }
//             return dataDate >= startDate && dataDate <= endDate;
//         }
//         return true;
//     };

//     const aggregateEmployeeData = (username) => {
//         const employeeBookingData = bookingData.filter(
//             (booking) => booking.cr === username && filterByDate(booking, "date")
//         );
//         const employeePaymentData = paidUserInfos.filter(
//             (payment) => payment.cr === username && filterByDate(payment, "date")
//         );
//         const employeeReturnAndPendingData = returnAndPendingData.filter(
//             (data) => data.cr === username && filterByDate(data, "date")
//         );
//         const employeePendingOrder = pendingOrder.filter(
//             (order) => order.cr === username && filterByDate(order, "date")
//         );

//         return {
//             totalRevenue: employeePaymentData.reduce((total, payment) => total + payment.cod, 0),
//             todaysOrdersCount: employeeBookingData.length,
//             paymentDataCount: employeePaymentData.length,
//             returnAndPendingDataCount: employeeReturnAndPendingData.length,
//             pendingOrderCount: employeePendingOrder.length,
//         };
//     };

//     const employeeUsernames = users
//         .filter(user => user.role === 'employee')
//         .map(user => user.username);

//     const aggregatedData = employeeUsernames.reduce(
//         (acc, username) => {
//             const employeeData = aggregateEmployeeData(username);
//             acc.totalRevenue += employeeData.totalRevenue;
//             acc.todaysOrdersCount += employeeData.todaysOrdersCount;
//             acc.paymentDataCount += employeeData.paymentDataCount;
//             acc.returnAndPendingDataCount += employeeData.returnAndPendingDataCount;
//             acc.pendingOrderCount += employeeData.pendingOrderCount;
//             return acc;
//         },
//         {
//             totalRevenue: 0,
//             todaysOrdersCount: 0,
//             paymentDataCount: 0,
//             returnAndPendingDataCount: 0,
//             pendingOrderCount: 0,
//         }
//     );

//     return (
//         <div className="space-y-5">
//             <HomeBredCurbs title="Work Dashboard" />

//             <div className="flex justify-end mb-4">
//                 <div className="w-96">
//                     <h6 className="text-sm mb-2">Filter by Date</h6>
//                     <Datepicker
//                         value={{ startDate: selectedStartDate, endDate: selectedEndDate }}
//                         onChange={handleValueChange}
//                         displayFormat={"DD/MM/YYYY"}
//                     />
//                 </div>
//             </div>
//             {User.role === 'admin' && (
//                 <Card>
//                     <WorkDetail data={aggregatedData} title="All Employees" />
//                 </Card>
//             )}

//             <div className="grid grid-cols-12 gap-5">
//                 {employeeUsernames.map((username) => {
//                     if (User.role === 'admin' || (User.role === 'employee' && User.username === username)) {
//                         return (
//                             <div key={username} className="2xl:col-span-12 lg:col-span-12 col-span-12">
//                                 <Card>
//                                     <WorkDetail username={username} data={aggregateEmployeeData(username)} title={username} />
//                                 </Card>
//                             </div>
//                         );
//                     }
//                     return null;
//                 })}
//             </div>
//         </div>
//     );
// };

// export default WorkDashboard;