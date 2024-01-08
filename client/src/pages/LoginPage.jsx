import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { login, reset } from "../redux/slices/userSlice";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, message, isError, isSuccess, loading } = useSelector(
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
      await dispatch(login(inputData));
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
      navigate("/");
    }

    if (user?.token) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, message, isError, isSuccess, navigate, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-[83vh] md:h-[80vh] bg-gray-100">
          <div className="form container w-full max-w-[1000px] m-auto px-4">
            <h1 className="text-center text-2xl font-bold py-10 text-[#5B80EB]">
              Login Form
            </h1>
            <form
              className="flex flex-col justify-center gap-4"
              onSubmit={handleSubmit}
            >
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

              <button
                className="w-full text-center m-auto border-2 font-black text-xl py-3 text-white hover:text-white bg-[#2ED3D5] hover:bg-[#5B80EB]"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
