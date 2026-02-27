import React from "react";
import { Link } from "react-router";

const PromotionBanner = () => {
  return (
    <Link
      to="/promotion"
      className="group flex flex-col items-center justify-center w-full h-[100px] bg-white border border-gray-100 rounded-xl hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {/* Primary Label */}
      <span className="text-gray-900 font-medium tracking-tight group-hover:text-blue-600 transition-colors">
        Add Promotion Here
      </span>
      
      {/* Sub-label */}
      <span className="text-gray-400 text-xs mt-1 font-light">
        10,000+ users daily
      </span>
    </Link>
  );
};

export default PromotionBanner;