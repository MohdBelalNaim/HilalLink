import CompactSidebar from "@/components/CompactSidebar";
import React from "react";
import { Link } from "react-router-dom";

const VerificationDetails = () => {
  return (
    <div>
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto py-8">
        <div className="text-xl font-bold">Fill out the form</div>
        <div className="mt-6 grid gap-y-5">
          <label htmlFor="" className="text-sm">
            Profile type
            <select
              className="w-full border p-3 mt-1"
              style={{ borderRadius: 6 + "px" }}
              name=""
              id=""
            >
              <option value="">Individual</option>
              <option value="">Organisation</option>
            </select>
          </label>

          <label htmlFor="" className="text-sm">
            Select profession
            <select
              className="w-full border p-3 mt-1"
              style={{ borderRadius: 6 + "px" }}
              name=""
              id=""
            >
              <option value="">Accountant</option>
              <option value="">Engineer</option>
            </select>
          </label>

          <label htmlFor="" className="text-sm">
            Enter mobile number linked to your HilalLink account
            <div className="flex gap-1 mt-1.5">
              <div
                style={{ borderRadius: 4 + "px" }}
                className="bg-white text-sm px-2 border grid place-items-center"
              >
                +91
              </div>
              <input
                type="text"
                className="w-full border p-3"
                style={{ borderRadius: 4 + "px" }}
              />
            </div>
          </label>

          <label htmlFor="" className="text-sm">
            Enter Email linked to your HilalL linked to your HilalLink account
            <input
              type="text"
              className="w-full border p-3 mt-1.5"
              style={{ borderRadius: 4 + "px" }}
            />
          </label>

          <label htmlFor="" className="text-sm">
            Include up to 5 articles, social media handles, and other relevant
            links to demonstrate that your profile is of public interest. Avoid
            using paid or promotional content. *
            <div className="mt-5">
              {"abcde".split("").map((item, index) => {
                return (
                  <>
                    <label htmlFor="" className="mb-1.5">
                      Link {index + 1}
                    </label>
                    <input
                      type="text"
                      className="w-full border p-3 mt-1.5 mb-3"
                      style={{ borderRadius: 4 + "px" }}
                    />
                  </>
                );
              })}
            </div>
          </label>
        </div>
        <Link to="/verification/otp">
          <div className="cursor-pointer mb-12 bg-primary text-center py-2 rounded-full mt-10">
            Submit and next
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VerificationDetails;
