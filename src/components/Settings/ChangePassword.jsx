import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const base = useSelector((state) => state.userSlice.base_url);
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const EmailVerification = async () => {

      fetch(`${base}/user/change-password-email-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"), 
        },
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.success)
        } else {
          toast.error(data.error)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const onSubmitOTP = (data) => {
  //   setLoad(true);
  //   data.otp = otp;
  //   const hashedOtp = localStorage.getItem("hashedOTP");
  //   fetch(`${base}/signup/verify-otp`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ otp, hashedOtp }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Response from backend:", data);
  //       if (data.success) {
  //         setShowOtpForm(false);
  //         setShowPasswordForm(true);
  //       } else {
  //         setLoad(false);
  //         alert("OTP verification failed");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       alert("Failed to verify OTP");
  //     });
  // };
  
  // const renderInput = (inputProps, index) => {
  //   return (
  //     <input
  //       key={`otp-${index}`}
  //       {...inputProps}
  //       className="w-12 h-12 rounded-md border text-center"
  //       style={{
  //         border: "1px solid black",
  //         padding: "10px",
  //         borderRadius: "6px",
  //         width: "40px",
  //         height: "40px",
  //         margin: "0 5px",
  //         fontSize: "18px",
  //       }}
  //     />
  //   );
  // };

  const onSubmitPassword = async (data) => {
    setLoading(true);
    const { password, confirmpassword} = data
    fetch(`${base}/auth/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"), 
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        setLoading(false);
        alert(data.error);
        navigate("/settings");
      } else {
        EmailVerification()
        navigate("/home");
        
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div className="h-[100dvh] py-12 max-sm:px-4">
      {/* {showOtpForm && (
        <div>
          <div className="font-medium text-2xl max-sm:text-lg">
            Security verification
          </div>
          <div className=" text-sm">
            Six digit one time OTP sent on your registered email.
          </div>
          <div className="text-xl font-bold mt-5">Enter OTP</div>
          <form onSubmit={handleSubmit(onSubmitOTP)} className="mt-6 grid gap-y-4">
          <OtpInput
            name="otp"
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
            {errors.otp && <p className="text-red-500">OTP is required.</p>}
            <button
              disabled={load}
              className={`w-max px-4 py-2 text-white rounded-full ${
                load ? "bg-gray-500" : "bg-black"
              } grid place-items-center w-full disabled:cursor-not-allowed`}
            >
              {load ? (
                <TailSpin height={20} width={50} color="white" />
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        </div>
      )} */}

      {/* {showPasswordForm && ( */}
        <div>
          <div className="text-xl font-bold">Change password</div>
          <div className="text-gray-600 mt-2">
            You’ll be logged out of all sessions except this one to protect your
            account if anyone is trying to gain access.
          </div>
          <div className="text-gray-600 mt-4">
            Your password must be at least 6 characters and should include a
            combination of numbers, letters and special characters (!$@%).
          </div>

          <form onSubmit={handleSubmit(onSubmitPassword)} className="mt-6 grid gap-y-4">

            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full p-3 border rounded-md"
              placeholder="New password"
            />
            {errors.password && <p className="text-red-500">New password is required.</p>}

            <input
              type="password"
              {...register("confirmpassword", { required: true })}
              className="w-full p-3 border rounded-md"
              placeholder="Repeat new password"
            />
            {errors.confirmpassword && <p className="text-red-500">Confirm password is required.</p>}

            <button
              disabled={loading}
              className={`w-max px-4 py-2 text-white rounded-full ${
                loading ? "bg-gray-500" : "bg-black"
              } grid place-items-center w-full disabled:cursor-not-allowed`}
            >
              {loading ? (
                <TailSpin height={20} width={50} color="white" />
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      {/* )} */}
    </div>
  );
};

export default ChangePassword;

