import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import HomeBredCurbs from "./HomeBredCurbs";
import Mainuser from "@/assets/images/all-img/main-user.png";
import { useSelector, useDispatch } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";

import { getOrderStatistics } from "../EmployeeWork/statisticsReducer/statisticsSlice";

const Ecommerce = () => {
  const User = useSelector((state) => state.user?.loggedInUser);
  const dispatch = useDispatch();

  const { allOrderStatistics, branchOrderStatistics } = useSelector((state) => state.statistics);
  console.log("first",allOrderStatistics,branchOrderStatistics)

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    dispatch(getOrderStatistics({
      startDate: selectedStartDate ? new Date(selectedStartDate).toISOString() : undefined,
      endDate: selectedEndDate ? new Date(selectedEndDate).toISOString() : undefined,
    }));
  }, [dispatch, selectedStartDate, selectedEndDate]);

  const handleValueChange = (newValue) => {
    setSelectedStartDate(newValue.startDate);
    setSelectedEndDate(newValue.endDate);
  };

  const isBranchAdminOrEmployee = User?.role === 'branchAdmin' || User?.role === 'employee';

  return (
    <div className="space-y-5">
      <HomeBredCurbs title="Dashboard" />
      <Card>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
          <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-20 w-20 rounded-full">
                <img src={Mainuser} alt="" className="w-full h-full" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-medium mb-2">
                <span className="block font-light">Hello,</span>
                <span className="block uppercase">Mr. {User?.username}</span>
              </h4>
              <p className="text-sm dark:text-slate-300">Welcome to Wincenzo</p>
            </div>
          </div>
        </div>
      </Card>
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
      {User?.role === 'admin' && (
        <Card>
          <GroupChart2 data={allOrderStatistics} title="All Branches" />
        </Card>
      )}

      <div className="grid grid-cols-12 gap-5">
        {branchOrderStatistics.map((branch) => {
          if (User?.role === 'admin' || (isBranchAdminOrEmployee && User?.branch === branch.branchName.toLowerCase())) {
            return (
              <div key={branch.branchId} className="2xl:col-span-12 lg:col-span-12 col-span-12">
                <Card>
                  <GroupChart2 data={branch} title={branch.branchName} />
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

export default Ecommerce;

// import React, { useEffect, useState } from "react";
// import Card from "@/components/ui/Card";
// import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
// import HomeBredCurbs from "./HomeBredCurbs";
// import Mainuser from "@/assets/images/all-img/main-user.png";
// import { useSelector, useDispatch } from "react-redux";
// import Datepicker from "react-tailwindcss-datepicker";
// import { getAllBookingData } from "../Booking Files/BookingReducer/BookingSlice";
// import { getAllPaymentData } from "../Payment Sheets/PaymentReducer/paymentSlice";
// import { getAllReturnAndPendingData } from "../Return & Pending/ReturnAndPendingReducer/ReturnAndPendingSlice";
// import { getAllBranch } from "../All Branch/BranchReducer/branchSlice";
// import { getPendingOrders } from "../PendingOrders/PendingOrderReducer/pendingOrderSlice";
// import { getStatistics } from "../EmployeeWork/statisticsReducer/statisticsSlice";

// const Ecommerce = () => {
//   const User = useSelector((state) => state.user?.loggedInUser);
//   const branches = useSelector((state) => state.branches.branches);
//   const dispatch = useDispatch();

//   const bookingData = useSelector((state) => state.bookingdata.bookingdata);
//   const pendingOrder = useSelector((state) => state.pendingorder.pendingOrder);
//   const returnAndPendingData = useSelector((state) => state.returnAndPendingdata.returnAndPendingData);
//   const paymentData = useSelector((state) => state.paymentdata.paymentdata);

//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);

//   useEffect(() => {
//     // dispatch(getAllBranch("branches"));
//     // dispatch(getAllBookingData("bookingdata"));
//     // dispatch(getAllPaymentData("paymentdata"));
//     // dispatch(getAllReturnAndPendingData("returnAndPendingdata"));
//     // dispatch(getPendingOrders("pendingOrder"));
//     dispatch(getStatistics({
//       startDate: selectedStartDate ? new Date(selectedStartDate).toISOString() : undefined,
//       endDate: selectedEndDate ? new Date(selectedEndDate).toISOString() : undefined,
//     }));
//   }, [dispatch]);

//   const handleValueChange = (newValue) => {
//     setSelectedStartDate(newValue.startDate);
//     setSelectedEndDate(newValue.endDate);
//   };

//   const aggregateBranchData = (branchName) => {
//     const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
//     const endDate = selectedEndDate ? new Date(selectedEndDate) : null;
//     const today = new Date(); // Get today's date

//     if (startDate) startDate.setHours(0, 0, 0, 0);
//     if (endDate) endDate.setHours(23, 59, 59, 999);

//     const filterByDate = (data, dateField) => {
//       if (!startDate && !endDate) return true; // No date selected, include all data

//       const dataDate = new Date(data[dateField]);
//       if (startDate && endDate) {
//         if (startDate.getTime() === endDate.getTime()) {
//           // Single date selected
//           return dataDate.getTime() === startDate.getTime();
//         }
//         // Date range selected
//         return dataDate >= startDate && dataDate <= endDate;
//       }
//       return true;
//     };

//     // Function to check if a date matches today's date
//     const isToday = (dataDate) => {
//       return (
//         dataDate.getDate() === today.getDate() &&
//         dataDate.getMonth() === today.getMonth() &&
//         dataDate.getFullYear() === today.getFullYear()
//       );
//     };

//     const branchBookingData = bookingData.filter(
//       (booking) => booking.branch.toLowerCase() === branchName.toLowerCase() && filterByDate(booking, "date")
//     );
//     const branchPaymentData = paymentData.filter(
//       (payment) => payment.branch.toLowerCase() === branchName.toLowerCase() && filterByDate(payment, "payment_date")
//     );
//     const branchReturnAndPendingData = returnAndPendingData.filter(
//       (data) => data.branch.toLowerCase() === branchName.toLowerCase() && filterByDate(data, "date")
//     );
//     const branchPendingOrder = pendingOrder.filter(
//       (order) => order.branch.toLowerCase() === branchName.toLowerCase() && filterByDate(order, "date")
//     );

//     const todaysOrdersCount = branchBookingData.reduce((count, booking) => {
//       const bookingDate = new Date(booking.date);
//       if (isToday(bookingDate)) {
//         return count + 1;
//       }
//       return count;
//     }, 0);
//     console.log("todaysOrdersCount", todaysOrdersCount)

//     return {
//       totalRevenue: branchPaymentData.reduce((total, payment) => total + payment.net_payable, 0),
//       totalOrdersCount: branchBookingData.length,
//       paymentDataCount: branchPaymentData.length,
//       returnAndPendingDataCount: branchReturnAndPendingData.length,
//       pendingOrderCount: branchPendingOrder.length,
//       todaysOrdersCount: todaysOrdersCount,
//     };
//   };


//   const aggregatedData = branches.reduce(
//     (acc, branch) => {
//       const branchData = aggregateBranchData(branch.branchName);
//       acc.totalRevenue += branchData.totalRevenue;
//       acc.totalOrdersCount += branchData.totalOrdersCount;
//       acc.paymentDataCount += branchData.paymentDataCount;
//       acc.returnAndPendingDataCount += branchData.returnAndPendingDataCount;
//       acc.pendingOrderCount += branchData.pendingOrderCount;
//       acc.todaysOrdersCount += branchData.todaysOrdersCount;
//       return acc;
//     },
//     {
//       totalRevenue: 0,
//       totalOrdersCount: 0,
//       paymentDataCount: 0,
//       returnAndPendingDataCount: 0,
//       pendingOrderCount: 0,
//       todaysOrdersCount: 0,
//     }
//   );

//   const isBranchAdminOrEmployee = User?.role === 'branchAdmin' || User?.role === 'employee';

//   return (
//     <div className="space-y-5">
//       <HomeBredCurbs title="Dashboard" />
//       <Card>
//         <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
//           <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
//             <div className="flex-none">
//               <div className="h-20 w-20 rounded-full">
//                 <img src={Mainuser} alt="" className="w-full h-full" />
//               </div>
//             </div>
//             <div className="flex-1">
//               <h4 className="text-xl font-medium mb-2">
//                 <span className="block font-light">Hello,</span>
//                 <span className="block uppercase">Mr. {User?.username}</span>
//               </h4>
//               <p className="text-sm dark:text-slate-300">Welcome to Wincenzo</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//       <div className="flex justify-end mb-4">
//         <div className="w-96">
//           <h6 className="text-sm mb-2">Filter by Date</h6>
//           <Datepicker
//             value={{ startDate: selectedStartDate, endDate: selectedEndDate }}
//             onChange={handleValueChange}
//             displayFormat={"DD/MM/YYYY"}
//           />
//         </div>
//       </div>
//       {User?.role === 'admin' && (
//         <Card>
//           <GroupChart2 data={aggregatedData} title="All Branches" />
//         </Card>
//       )}

//       <div className="grid grid-cols-12 gap-5">
//         {branches.map((branch) => {
//           if (User?.role === 'admin' || (isBranchAdminOrEmployee && User?.branch === branch.branchName.toLowerCase())) {
//             return (
//               <div key={branch.branchName.toLowerCase()} className="2xl:col-span-12 lg:col-span-12 col-span-12">
//                 <Card>
//                   <GroupChart2 branchName={branch.branchName.toLowerCase()} data={aggregateBranchData(branch.branchName)} title={branch.branchName} />
//                 </Card>
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Ecommerce;



