import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router";
import { Megaphone } from "lucide-react";

const SidePanel = ({ side }) => {

  return (
    <div
      className={`hidden lg:flex fixed top-0 h-full px-5 items-center z-40 ${side === "left" ? "left-0" : "right-0"}`}
    style={{ width: "calc((100% - 640px) / 2)" }}
    >
      <Link
        to="/promotion"
        className={`group flex flex-col items-center
           justify-center gap-2 bg-white border-2 
           border-red-100 hover:bg-red-600
            hover:border-red-600 rounded-lg
             shadow-md transition-all duration-200 cursor-pointer w-full text-center`}
        style={{ padding: "12px 0" }}
      >
        <Megaphone
          size={18}
          className="text-red-500 group-hover:text-white transition-colors"
        />
        <p className="text-gray-800 group-hover:text-white font-semibold text-md transition-colors">
          Get Promote Here!
        </p>
      </Link>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 relative flex justify-center">
        <SidePanel side="left" />

        {/* Main content */}
        <div className="w-full max-w-[640px]">
          <Outlet />
        </div>

        <SidePanel side="right" />
      </div>
    </div>
  );
};

export default Layout;
