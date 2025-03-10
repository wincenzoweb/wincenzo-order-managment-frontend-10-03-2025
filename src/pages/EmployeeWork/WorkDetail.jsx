import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

const WorkDetail = ({ data, title }) => {
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
            <h3 className="text-xl font-medium mb-4 uppercase">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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

export default WorkDetail;