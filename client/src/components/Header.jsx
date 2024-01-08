import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";

import { logout, reset } from "../redux/slices/userSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header className="w-full h-auto bg-gray-300 p-4 flex justify-between">
      <NavLink to="/">
        {/* <h1 className="text-2xl font-black">TaskFlow </h1> */}
        <img className="w-[110px]" src="/images/logo.png" alt="logo" />
      </NavLink>
      <ul className="flex justify-end items-center gap-6">
        {user?.token ? (
          <>
            <li>
              <NavLink to="/todo">Todo</NavLink>
            </li>
            <li>
              <button
                className="flex items-center gap-2 border-2 border-[#5B80EB] py-1 px-2 bg-[#5B80EB] text-white font-bold hover:bg-[#2ED3D5] hover:border-[#2ED3D5]"
                onClick={handleLogout}
                type="button"
              >
                <RiLogoutBoxLine />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
