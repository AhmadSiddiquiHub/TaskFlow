import React from "react";
import { NavLink } from "react-router-dom";
import { RiTodoFill } from "react-icons/ri";
import { PiMonitorFill } from "react-icons/pi";

const UserSidebar = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <NavLink to="/todo">
          <div className="section hover:bg-slate-500 p-4 cursor-pointer font-bold flex items-center gap-2 text-[#5B80EB]">
            <RiTodoFill />
            TODO
          </div>
        </NavLink>
        <NavLink to="/dashboard">
          <div className="section-2 hover:bg-slate-500 p-4 cursor-pointer font-bold flex items-center gap-2 text-[#5B80EB]">
            <PiMonitorFill />
            DASHBOARD
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default UserSidebar;
