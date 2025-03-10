import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

const GroupChart2 = ({ data, title }) => {
  const statistics = [
    {
      title: "Total Revenue",
      count: data.totalRevenue,
      bg: "bg-[#E5F9FF] dark:bg-#E5F9FF-900",
      text: "text-info-500",
      icon: "heroicons:currency-rupee",
    },
    {
      title: "Total Order",
      count: data.totalOrdersCount,
      bg: "bg-[#FFEDE6] dark:bg-#FFEDE6-900",
      text: "text-warning-500",
      icon: "heroicons:inbox-stack",
    },
    {
      title: "Today's Order",
      count: data.todaysOrdersCount,
      bg: "bg-[#FFEDE6] dark:bg-#FFEDE6-900",
      text: "text-warning-500",
      icon: "heroicons:shopping-cart",
    },
    {
      title: "Products sold",
      count: data.paymentDataCount,
      bg: "bg-green-200 dark:bg-green-200",
      text: "text-green-800",
      icon: "fluent-mdl2:product-variant",
    },
    {
      title: "Return Order",
      count: data.returnAndPendingDataCount,
      bg: "bg-[#EAE6FF] dark:bg-#EAE6FF-900",
      text: "text-[#5743BE]",
      icon: "hugeicons:delivery-return-01",
    },
    {
      title: "Pending Order",
      count: data.pendingOrderCount,
      bg: "bg-[#fef9c3] dark:bg-#fef9c3-900",
      text: "text-[#eab308]",
      icon: "heroicons:arrow-trending-up-solid",
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statistics.map((item, i) => (
          <div key={i}>
            <Card bodyClass="pt-4 pb-3 px-4">
              <div className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none">
                  <div className={`${item.bg} ${item.text} h-12 w-12 rounded-full flex items-center justify-center text-2xl`}>
                    <Icon icon={item.icon} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                    {item.title}
                  </div>
                  <div className="text-slate-900 dark:text-white text-lg font-medium">
                    {item.count ? item.count.toLocaleString() : 0}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupChart2;



// import React, { useEffect } from "react";
// import Card from "@/components/ui/Card";
// import Icon from "@/components/ui/Icon";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllBookingData, getPendingOrders } from "../../../../pages/Booking Files/BookingReducer/BookingSlice";
// import { getAllPaymentData } from "../../../../pages/Payment Sheets/PaymentReducer/paymentSlice";
// import { getAllReturnAndPendingData } from "../../../../pages/Return & Pending/ReturnAndPendingReducer/ReturnAndPendingSlice";

// const GroupChart2 = ({ branchName }) => {
//   const dispatch = useDispatch();
//   const bookingData = useSelector((state) => state.bookingdata.bookingdata);
//   const pendingOrder = useSelector((state) => state.bookingdata.pendingOrder);
//   const returnAndPendingData = useSelector((state) => state.returnAndPendingdata.returnAndPendingData);
//   const paymentData = useSelector((state) => state.paymentdata.paymentdata);

//   useEffect(() => {
//     dispatch(getAllBookingData("bookingdata"));
//   }, []);
//   useEffect(() => {
//     dispatch(getAllPaymentData("paymentdata"));
//   }, []);
//   useEffect(() => {
//     dispatch(getAllReturnAndPendingData("returnAndPendingdata"));
//   }, []);
//   useEffect(() => {
//     dispatch(getPendingOrders("pendingOrder"));
//   }, []);

//   const today = new Date();

//   const branchBookingData = bookingData.filter((booking) => booking.branch === branchName);
//   const branchPaymentData = paymentData.filter((payment) => payment.branch === branchName);
//   const branchReturnAndPendingData = returnAndPendingData.filter((data) => data.branch === branchName);
//   const branchPendingOrder = pendingOrder.filter((order) => order.branch === branchName);

//   const totalNetPayable = branchPaymentData.reduce((total, payment) => total + payment.net_payable, 0);
//   const todaysOrdersCount = branchBookingData.filter((booking) => {
//     const bookingDate = new Date(booking.date);
//     return bookingDate.toDateString() === today.toDateString();
//   }).length;

//   const statistics = [
//     {
//       title: "Total revenue",
//       count: totalNetPayable,
//       bg: "bg-[#E5F9FF] dark:bg-#E5F9FF-900",
//       text: "text-info-500",
//       icon: "heroicons:shopping-cart",
//     },
//     {
//       title: "Today's Order",
//       count: todaysOrdersCount,
//       bg: "bg-[#FFEDE6] dark:bg-#FFEDE6-900",
//       text: "text-warning-500",
//       icon: "heroicons:cube",
//     },
//     {
//       title: "Products sold",
//       count: branchPaymentData.length,
//       bg: "bg-[#FFEDE6] dark:bg-#FFEDE6-900",
//       text: "text-warning-500",
//       icon: "heroicons:cube",
//     },
//     {
//       title: "Return Order",
//       count: branchReturnAndPendingData.length,
//       bg: "bg-[#EAE6FF] dark:bg-#EAE6FF-900",
//       text: "text-[#5743BE]",
//       icon: "heroicons:arrow-trending-up-solid",
//     },
//     {
//       title: "Pending Order",
//       count: branchPendingOrder.length,
//       bg: "bg-[#EAE6FF] dark:bg-#EAE6FF-900",
//       text: "text-[#5743BE]",
//       icon: "heroicons:arrow-trending-up-solid",
//     },
//   ];

//   return (
//     <>
//       <h3 className="text-lg font-medium mb-4 uppercase">{branchName}</h3>
//       <div className="flex flex-wrap justify-evenly items-center gap-4">
//         {statistics.map((item, i) => (
//           <div key={i} className="mb-4">
//             <Card bodyClass="pt-4 pb-3 px-4">
//               <div className="flex space-x-3 rtl:space-x-reverse">
//                 <div className="flex-none">
//                   <div className={`${item.bg} ${item.text} h-12 w-12 rounded-full flex items-center justify-center text-2xl`}>
//                     <Icon icon={item.icon} />
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
//                     {item.title}
//                   </div>
//                   <div className="text-slate-900 dark:text-white text-lg font-medium">
//                     {item.count}
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         ))}

//       </div>
//     </>
//   );
// };

// export default GroupChart2;






// import React, { useEffect } from "react";
// import Card from "@/components/ui/Card";
// import Icon from "@/components/ui/Icon";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { getAllBookingData, getPendingOrders } from "../../../../pages/Booking Files/BookingReducer/BookingSlice";
// import { getAllPaymentData } from "../../../../pages/Payment Sheets/PaymentReducer/paymentSlice";
// import { getAllReturnAndPendingData } from "../../../../pages/Return & Pending/ReturnAndPendingReducer/ReturnAndPendingSlice";


// const GroupChart2 = () => {

//   const dispatch = useDispatch();
//   const { pendingOrder, bookingdata } = useSelector((state) => state.bookingdata);
//   const { returnAndPendingData } = useSelector((state) => state.returnAndPendingdata);
//   const { paymentdata } = useSelector((state) => state.paymentdata);

//   useEffect(() => {
//     dispatch(getAllBookingData("bookingdata"));
//   }, []);
//   useEffect(() => {
//     dispatch(getAllPaymentData("paymentdata"));
//   }, []);
//   useEffect(() => {
//     dispatch(getAllReturnAndPendingData("returnAndPendingdata"));
//   }, []);
//   useEffect(() => {
//     dispatch(getPendingOrders("pendingOrder"));
//   }, []);

//   const totalNetPayable = paymentdata.reduce((total, payment) => total + payment.net_payable, 0);
//   // Find today's orders count
//   const today = new Date();
//   const todaysOrdersCount = bookingdata.filter(booking => {
//     const bookingDate = new Date(booking.date);
//     return bookingDate.toDateString() === today.toDateString();
//   }).length;

//   const paymentDataLength = paymentdata.length;
//   const returnAndPendingDataLength = returnAndPendingData.length;
//   const pendingOrderLength = pendingOrder.length;

//   const statistics = [
//     {
//       title: "Totel revenue",
//       count: totalNetPayable,
//       bg: "bg-[#E5F9FF] dark:bg-#E5F9FF-900	",
//       text: "text-info-500",
//       icon: "heroicons:shopping-cart",
//     },
//     {
//       title: "Today's Order",
//       count: todaysOrdersCount,
//       bg: "bg-[#FFEDE6] dark:bg-#FFEDE6-900	",
//       text: "text-warning-500",
//       icon: "heroicons:cube",
//     },
//     {
//       title: "Products sold",
//       count: paymentDataLength,
//       bg: "bg-[#FFEDE6] dark:bg-#FFEDE6-900	",
//       text: "text-warning-500",
//       icon: "heroicons:cube",
//     },
//     {
//       title: "Return Order",
//       count: returnAndPendingDataLength,
//       bg: "bg-[#EAE6FF] dark:bg-#EAE6FF-900	",
//       text: "text-[#5743BE]",
//       icon: "heroicons:arrow-trending-up-solid",
//     },
//     {
//       title: "Pending Order",
//       count: pendingOrderLength,
//       bg: "bg-[#EAE6FF] dark:bg-#EAE6FF-900	",
//       text: "text-[#5743BE]",
//       icon: "heroicons:arrow-trending-up-solid",
//     },
//   ];
//   return (
//     <>
//       {statistics.map((item, i) => (
//         <div key={i}>
//           <Card bodyClass="pt-4 pb-3 px-4">
//             <div className="flex space-x-3 rtl:space-x-reverse">
//               <div className="flex-none">
//                 <div
//                   className={`${item.bg} ${item.text} h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl`}
//                 >
//                   <Icon icon={item.icon} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
//                   {item.title}
//                 </div>
//                 <div className="text-slate-900 dark:text-white text-lg font-medium">
//                   {item.count}
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       ))}
//     </>
//   );
// };

// export default GroupChart2;
