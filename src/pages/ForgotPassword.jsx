import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { toast } from "sonner";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false); 
  const [otp, setOtp] = useState(""); 
  const base = useSelector((state) => state.userSlice.base_url);

  const sendOtp = (data) => {
    setLoading(true);
    const formData = {
      to: data.accessId
    };
    fetch(`${base}/signup/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData) 
    })
    .then((res) => res.json())
    .then((data) => {
      console.log()
      if (data.success) {
        localStorage.clear()
        toast.success("OTP sent on your registered email for verification");
        localStorage.setItem("accessId", formData.to); 
        localStorage.setItem("hashedOTP", data.hash);
        setOtpSent(true); 
      } else {
        toast.error("Error sending OTP");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const verifyOtp = (data) => {
    data.otp = otp;
    setLoading(true);
    const accessId = localStorage.getItem("accessId");
    const hashedOtp = localStorage.getItem("hashedOTP");
    fetch(`${base}/signup/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, hashedOtp, accessId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from backend:", data);
        if (data.success) {
          toast.success("OTP verified successfully");
          navigate("/change-password")
        } else {
          toast.error("OTP verification failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to verify OTP");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  const renderInput = (inputProps, index) => {
    return (
      <input
        key={`otp-${index}`}
        {...inputProps}
        className="w-12 h-12 rounded-md border text-center"
        style={{
          border: "1px solid black",
          padding: "10px",
          borderRadius: "6px",
          width: "40px",
          height: "40px",
          margin: "0 5px",
          fontSize: "18px",
        }}
      />
    );
  };

  return (
    <div className="max-sm:p-2 h-[120dvh]">
      <div className="text-center pt-5 font-medium text-4xl max-sm:text-2xl max-sm:mt-5">
        Welcome to <span className="primary">HilalLink</span>
      </div>
      {!otpSent ? ( 
        <form onSubmit={handleSubmit(sendOtp)}>
          <div className="w-[min(400px,98%)] grid gap-y-4 p-6 mt-10 max-sm:mt-4 bg-white border rounded-md mx-auto max-sm:bg-transparent max-sm:border-hidden max-sm:py-2 max-sm:px-2">
            <label htmlFor="" className="text-sm mb-1">
              Enter Email address or Phone number <span className="text-red-500">*</span></label>
              <input
                {...register("accessId")}
                placeholder="Enter your email"
                type="text"
                className="w-full border rounded p-2 mt-1"
                required
              />
            
            <button
              disabled={loading}
              className={`py-2.5 text-sm rounded-full ${
                loading ? "bg-blue-200" : "bg-primary"
              } grid place-items-center w-full disabled:cursor-not-allowed`}
            >
              {loading ? (
                <TailSpin height={20} width={20} color="white" />
              ) : (
                "Send OTP"
              )}
            </button>
            <div className="flex  items-center gap-3 ">
        <div className="w-full h-[0.7px] bg-gray-300"></div>
        <div>or</div>
        <div className="w-full h-[0.7px] bg-gray-300"></div>
      </div>
      <div className="flex flex-col w-full items-center">
      <Link to="/">
        <button className=" max-sm:bg-white py-2.5  gap-2 text-sm rounded-full flex items-center justify-center bg-gray-100 px-5">
          Move to login
        </button>
      </Link>
      <Link to="/signup">
        <button className="mt-4 max-sm:bg-white py-2.5 gap-2 text-sm rounded-full flex items-center justify-center bg-gray-100 px-5">
          Create new account
        </button>
      </Link>
      </div>
      
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(verifyOtp)}>
          <div className="w-[min(400px,98%)] grid gap-y-4 p-6 mt-10 max-sm:mt-4 bg-white border rounded-md mx-auto max-sm:bg-transparent max-sm:border-hidden max-sm:py-2 max-sm:px-2">
            <label htmlFor="" className="text-sm my-3">
              Enter OTP <span className="text-red-500">*</span></label>
              <OtpInput
                value={otp}
                onChange={setOtp} 
                numInputs={6}
                separator={<span>&nbsp;</span>}
                inputStyle={{
                  width: "40px",
                  height: "40px",
                  margin: "0 5px",
                  fontSize: "18px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                isInputNum
                autoFocus
                renderInput={renderInput}
              />
            
            <button
              disabled={loading}
              className={`py-2.5 text-sm rounded-full ${
                loading ? "bg-blue-200" : "bg-primary"
              } grid place-items-center w-full disabled:cursor-not-allowed`}
            >
              {loading ? (
                <TailSpin height={20} width={20} color="white" />
              ) : (
                "Verify OTP"
              )}
            </button>
            <div className="flex  items-center gap-3 ">
        <div className="w-full h-[0.7px] bg-gray-300"></div>
        <div>or</div>
        <div className="w-full h-[0.7px] bg-gray-300"></div>
      </div>
      <div className="flex flex-col w-full items-center">
      <Link to="/">
        <button className=" max-sm:bg-white py-2.5  gap-2 text-sm rounded-full flex items-center justify-center bg-gray-100 px-5">
          Move to login
        </button>
      </Link>
      <Link to="/signup">
        <button className="mt-4 max-sm:bg-white py-2.5 gap-2 text-sm rounded-full flex items-center justify-center bg-gray-100 px-5">
          Create new account
        </button>
      </Link>
      </div>
          </div>
          
        </form>
      )}
      
      
      
    </div>
  );
};

export default ForgotPassword;

