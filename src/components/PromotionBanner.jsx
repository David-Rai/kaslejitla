import React from "react";
import { Link } from "react-router";

const PromotionBanner = () => {
  return (
    <Link
      to="/promotion"
      className="group flex flex-col border-red-600 items-center justify-center w-full h-[100px] bg-white border border-gray-100 rounded-xl hover:border-red-500 transition-all duration-300"
    >
      {/* Centered Content */}
      <span className="text-gray-900 font-bold tracking-tight group-hover:text-red-600 transition-colors">
        Add Promotion Here
      </span>
      
      <span className="text-gray-400 text-xs mt-1 font-medium group-hover:text-red-400 transition-colors">
        10,000+ users daily
      </span>
    </Link>
  );
};

export default PromotionBanner;