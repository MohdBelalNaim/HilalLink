import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.jpeg";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const { handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const base = useSelector((state) => state.userSlice.base_url);
  const accessId = localStorage.getItem("accessId");
  const [timer, setTimer] = useState(15);

  const EmailVerification = (data) =>{
    fetch(`${base}/signup/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("OTP sent on your registered email for verification");
          OtpVerififcationTime()
          localStorage.setItem("hashedOTP", data.hash);
        } else {
          toast.error("Error sending OTP");
          setOtpSent(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const OtpVerififcationTime = () => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    setTimer(15)
    localStorage.removeItem("hashedOTP");

  }

  const SignupEmail = (data) => {

    fetch(`${base}/signup/signup-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("hashedOTP", data.hash);
        } else {
          toast.error("Error sending OTP");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if(!accessId){
      navigate("/signup");
    }
    else if (accessId) {
      EmailVerification({ to: accessId });
    } 
    else {
      console.log("Something went wrong");
    }
  }, []);

  const onSubmit = (data) => {
    const accessId = localStorage.getItem("accessId");
    setLoading(true);
    data.otp=otp;
    const hashedOtp = localStorage.getItem("hashedOTP");
    fetch(`${base}/signup/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({otp, hashedOtp, accessId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from backend:", data);
        setLoading(false);
        if (data.success) {
          localStorage.setItem("verification","1")
          navigate("/signup/address");
          SignupEmail({ to: accessId })
        } 
        else {
          toast.error("OTP verification failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to verify OTP");
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
    <div className="max-sm:p-2 h-[100dvh]">
      <div className="flex flex-col items-center justify-center py-8">
        <img src={logo} className="size-10 rounded-full" alt="" />
      </div>
      <div className="text-center pt-8 max-sm:text-sm">
        Discover, Connect, and Grow with HilalLink - Your Muslim Social Network.
      </div>
      <div className="w-[min(400px,98%)] grid gap-y-4 p-6 mt-10 bg-white border rounded-md mx-auto max-sm:bg-transparent max-sm:border-hidden max-sm:py-2 max-sm:px-2">
        <div className="font-medium text-center text-2xl max-sm:text-lg">
          Security verification
        </div>
        <div className="text-center text-sm">
          Six digit one time OTP sent on your registered email. <span className="primary">Edit</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <OtpInput
            name="otp"
            value={otp}
            onChange={setOtp} 
            numInputs={6}
            separator={<span>&nbsp;</span>}
            containerStyle={{ justifyContent: "center" }}
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

          {errors.otp && <span className="text-red-500">This field is required</span>}
          <button
              disabled={loading}
              className={`py-2.5 my-7 text-sm rounded-full ${
                loading ? "bg-blue-200" : "bg-primary"
              } grid place-items-center w-full disabled:cursor-not-allowed`}
            >
              {loading ? (
                <TailSpin height={20} width={20} color="white" />
              ) : (
                "Submit and Continue"
              )}
          </button>
          <div className="text-md text-center text-gray-500 mb-5 mt-5 ml-2">
            Not received your code? 
          {timer > 0 ? 
            <span className="ml-1 text-gray-600">{timer}s </span> 
          : 
            <span onClick={() => EmailVerification({ to: accessId })} className="primary ml-1">Resend</span>
          }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;














































