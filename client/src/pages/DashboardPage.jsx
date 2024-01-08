import React from "react";
import UserSidebar from "../components/UserSidebar";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-page">
        <div className="container w-full grid grid-cols-1 md:grid-cols-6 h-[83vh] md:h-[80vh]">
          <div className="left-side bg-slate-200  h-[15vh] md:h-auto">
            <UserSidebar />
          </div>
          <div className="right-side md:col-span-5  h-[68vh] md:h-auto">
            Dashboard Section
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
