import { LineChart } from "lucide-react";
import React from "react";

const AnalyticsHeading = () => {
  return (
    <div className="bg-gradient-to-tr from-blue-500 to-blue-300 rounded-lg mb-10 flex flex-col gap-2 px-5 py-5 w-full">
      <div className="flex items-center gap-2 ">
        <div className="p-2 rounded-lg text-white  bg-white/30">
          <LineChart className="" size={20} />
        </div>
        <h1 className="text-xl text-white font-semibold">
          Analytics Dashboard
        </h1>
      </div>
      <p className="text-gray-200">
        Complete customer history with advanced filtering
      </p>
    </div>
  );
};

export default AnalyticsHeading;
