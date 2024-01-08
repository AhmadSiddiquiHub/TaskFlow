import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 ">
        <div className="loader-container animate-blink w-full flex justify-center items-center h-[80vh] ">
          <img src="/images/logo.png" alt="Logo" className="logo w-[200px]" />
        </div>
      </div>
    </>
  );
};

export default Loader;
