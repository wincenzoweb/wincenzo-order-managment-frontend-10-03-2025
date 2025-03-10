import React, { useEffect } from "react";
import Icon from "@/components/ui/Icon";

import shade1 from "@/assets/images/all-img/shade-1.png";
import shade2 from "@/assets/images/all-img/shade-2.png";
import shade3 from "@/assets/images/all-img/shade-3.png";
import shade4 from "@/assets/images/all-img/shade-4.png";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const GroupChart3 = () => {

  const dispatch = useDispatch();
  const { bookingdata } = useSelector((state) => state.bookingdata);
  const { returnAndPendingData } = useSelector((state) => state.returnAndPendingdata);
  const { paymentdata } = useSelector((state) => state.paymentdata);

  const totalNetPayable = paymentdata.reduce((total, payment) => total + payment.net_payable, 0);
  // Find today's orders count
  const today = new Date();
  const todaysOrdersCount = bookingdata.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate.toDateString() === today.toDateString();
  }).length;

  const paymentDataLength = paymentdata.length;
  const returnAndPendingDataLength = returnAndPendingData.length;
  const pendingOrderLength = pendingOrder.length;

  const statistics = [
    {
      title: "Totel revenue",
      count: totalNetPayable,
      bg: "bg-warning-500",
      text: "text-primary-500",
      percent: "25.67% ",
      icon: "heroicons:arrow-trending-up",
      img: shade1,
      percentClass: "text-primary-500",
    },
    {
      title: "Today's Order",
      count: todaysOrdersCount,

      bg: "bg-info-500",
      text: "text-primary-500",
      percent: "8.67%",
      icon: "heroicons:arrow-trending-up",
      img: shade2,
      percentClass: "text-primary-500",
    },
    {
      title: "Products sold",
      count: paymentDataLength,
      bg: "bg-primary-500",
      text: "text-danger-500",
      percent: "1.67%  ",
      icon: "heroicons:arrow-trending-down",
      img: shade3,
      percentClass: "text-danger-500",
    },
    {
      title: "Return Order",
      count: returnAndPendingDataLength,
      bg: "bg-success-500",
      text: "text-primary-500",
      percent: "11.67%  ",
      icon: "heroicons:arrow-trending-up",
      img: shade4,
      percentClass: "text-primary-500",
    },
    {
      title: "Pending Order",
      count: pendingOrderLength,
      bg: "bg-success-500",
      text: "text-primary-500",
      percent: "11.67%  ",
      icon: "heroicons:arrow-trending-up",
      img: shade4,
      percentClass: "text-primary-500",
    },
  ];
  return (
    <>
      {statistics.map((item, i) => (
        <div
          key={i}
          className={`${item.bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
        >
          <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
            <img
              src={item.img}
              alt=""
              draggable="false"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
            {item.title}
          </span>
          <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
            {item.count}
          </span>
        </div>
      ))}
    </>
  );
};

export default GroupChart3;
