import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { register, reset } from "../redux/slices/userSlice";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, message, isSuccess, isError, loading } = useSelector(
    (state) => state.auth
  );

  // Functions
  const handleInputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(inputData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      navigate("/login");
    }

    if (user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, message, isError, isSuccess, navigate, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-[83vh] md:h-[80vh] bg-gray-100 ">
          <div className="form container w-full max-w-[1000px] m-auto p-4">
            <h1 className="text-center text-2xl font-bold py-10 text-[#5B80EB]">
              Register Form
            </h1>
            <form
              className="flex flex-col justify-center gap-4"
              onSubmit={handleSubmit}
            >
              <input
                className="p-4 border-2 border-[#2ED3D5] outline-none"
                name="name"
                type="text"
                placeholder="User Name"
                value={inputData.name}
                onChange={handleInputData}
              />
              <input
                className="p-4 border-2 border-[#2ED3D5] outline-none"
                name="email"
                type="email"
                placeholder="Email"
                value={inputData.email}
                onChange={handleInputData}
              />

              <input
                className="p-4 border-2 border-[#2ED3D5] outline-none"
                name="password"
                type="password"
                placeholder="Password"
                value={inputData.password}
                onChange={handleInputData}
              />
              <input
                className="p-4 border-2 border-[#2ED3D5] outline-none"
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                value={inputData.phoneNumber}
                onChange={handleInputData}
              />
              <button
                className="w-full text-center m-auto border-2 font-black text-xl py-3 text-white hover:text-white bg-[#2ED3D5] hover:bg-[#5B80EB]"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
