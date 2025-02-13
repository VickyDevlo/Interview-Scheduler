import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div
          className="inline-block min-h-screen border-r-2 border-gray-300 
        md:w-60 sticky top-0"
        >
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
          ${isActive && "bg-blue-100 border-r-4 border-blue-400 font-semibold"}`
              }
              to={"/dashboard"}
            >
              <MdDashboard size={22} />
              <p className="max-sm:hidden">Dashboard</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
          ${isActive && "bg-blue-100 border-r-4 border-blue-400 font-semibold"}`
              }
              to={"/schedule"}
            >
              <RiCalendarScheduleLine size={22} />
              <p className="max-sm:hidden">Schedule Interview</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-1 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
