import { faBoxOpen, faPlugCirclePlus, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Dashboard() {
  return (
    <div className="w-full mt-3 md:w-full flex flex-wrap items-center justify-center gap-3 text-[18px]">
      {[
        {
          icon: faReceipt,
          label: "Orders",
          Link: "/admin/order-history",
        },
        {
          icon: faBoxOpen,
          label: "Products",
          Link: "/admin/manage-product",
        },
        {
          icon: faPlugCirclePlus,
          label: "Categories",
          Link: "/admin/manage-category",
        }
      ].map((item, idx) => (
        <div
          onClick={() => (window.location.href = `${item.Link}`)}
          key={idx}
          className="bg-black w-full md:w-1/3 rounded-lg flex flex-col items-center justify-center p-4 h-36 shadow cursor-pointer"
        >
          <div className="flex flex-row items-center gap-2 text-white text-lg">
            <FontAwesomeIcon icon={item.icon} />
            <p>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
