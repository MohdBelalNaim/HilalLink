import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpeg";
const BasicDetails = () => {
  return (
    <div className="max-sm:p-2 h-[100dvh]">
      <div className="flex flex-col items-center justify-center py-8">
        <img src={logo} className="size-10 rounded-full" alt="" />

      </div>
      <div className="text-center pt-12 max-sm:text-sm">
        "Discover, Connect, and Grow with HilalLink - Your Muslim Social
        Network."
      </div>
      <div className="w-[min(400px,98%)] grid gap-y-4 p-6 mt-10 bg-white border rounded-md mx-auto max-sm:bg-transparent max-sm:border-hidden max-sm:py-2 max-sm:px-2">
        <label htmlFor="" className="text-sm">
          First name
          <input type="text" className="w-full border rounded p-2 mt-1" />
        </label>
        <label htmlFor="" className="text-sm">
          Last name
          <input type="text" className="w-full border rounded p-2 mt-1" />
        </label>
        <label htmlFor="" className="text-sm">
          Date of birth
          <input type="date" className="w-full border rounded p-2 mt-1" />
          <div className="text-xs mt-2">
            This won't be a part of your public profile
          </div>
        </label>

        <Link to="/signup/verification">
          <button className="py-2.5 text-sm rounded-full bg-primary w-full">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BasicDetails;
