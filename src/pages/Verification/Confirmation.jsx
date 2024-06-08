import CompactSidebar from "@/components/CompactSidebar";
import React from "react";
import { BsArrowLeft, BsCheck, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div>
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto flex justify-center items-center flex-col">
        <div className="bg-primary p-5 rounded-full w-max mt-[120px]">
          <BsCheck className="text-5xl" />
        </div>
        <div className="mt-12">
          Thank you for submitting the verification form. We will review your
          request and get back to you shortly. Hope you are enjoying the
          HilalLink! If you have any thing to ask please Write to us
        </div>
        <Link to="/home" className="mt-12">
          <div className="primary flex items-center gap-2">
            <BsArrowLeft /> Return to homepage
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
