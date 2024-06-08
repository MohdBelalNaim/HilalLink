import CompactSidebar from "@/components/CompactSidebar";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const VerificationOtp = () => {

  const [otp, setOtp] = useState("");
  return (
    <div>
      <CompactSidebar />
      <div className="mt-12">
        <div className="w-[min(390px,96%)] mx-auto">
          <div className="font-medium text-center mb-4 text-2xl max-sm:text-lg">
            Phone verification
          </div>
          <div className="text-center text-sm mb-4">
            Four digit one time OTP sent on +91 6386164836{" "}
            <span className="primary">Edit</span>
          </div>
          <form onSubmit={handleSubmit(verify)}>
          <div className="px-5 py-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{
                display: "flex",
                gap: 10 + "px",
              }}
              inputStyle={{
                border: "1px solid black",
                padding: 10 + "px",
                borderRadius: 6 + "px",
                width: 100 + "%",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          </form>
          
        </div>
      </div>
      <div>
        <div className="w-[min(400px,96%)] mx-auto mt-12">
          <div className="font-medium text-center text-2xl max-sm:text-lg mb-4">
            Email verification
          </div>
          <div className="text-center text-sm">
            Four digit one time OTP sent on sajadkhaki.jk@gmail.com.{" "}
            <span className="primary">Edit</span>
          </div>
          <div className="px-5 py-4 mt-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{
                display: "flex",
                gap: 10 + "px",
              }}
              inputStyle={{
                border: "1px solid black",
                padding: 10 + "px",
                borderRadius: 6 + "px",
                width: 100 + "%",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <Link to="/verification/confirmation">
            <button className="bg-primary w-full py-2 rounded-full mt-12">
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationOtp;
