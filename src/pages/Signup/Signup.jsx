import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "@/redux/userSlice";

const Signup = () => {
  localStorage.clear();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const base = useSelector((state) => state.userSlice.base_url);
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const detail = jwtDecode(credentialResponse.credential);
    const name = detail.given_name + " " + detail.family_name;
    const accessId = detail.email;
    const photo = detail.picture;
    fetch(`${base}/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, accessId, photo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          navigate("/signup");
        } else {
          localStorage.setItem("token", data.token);
          dispatch(loginUser());
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  const signup = (data) => {
    setLoading(true);
    fetch(`${base}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
          navigate("/signup");
        } else {
          localStorage.setItem("accessId", data.accessId);
          localStorage.setItem("name", data.name);
          localStorage.setItem("token", data.token);
          navigate("/signup/verification");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="max-sm:p-2 h-[120dvh] ">
      <div className="flex flex-col items-center justify-center py-8">
        <img src={logo} className="size-10 rounded-full" alt="" />
      </div>
      <div className="text-center pt-8 max-sm:p-3 max-sm:text-sm">
        "Discover, Connect, and Grow with HilalLink - Your Muslim Social
        Network."
      </div>
      <form onSubmit={handleSubmit(signup)}>
        <div className="w-[min(400px,98%)] grid gap-y-4 p-6 mt-10 max-sm:mt-4 bg-white border rounded-md mx-auto  max-sm:bg-transparent max-sm:border-hidden max-sm:py-2 max-sm:px-2">
          <label htmlFor="" className="text-sm">
            Enter Full Name <span className="text-red-500">*</span>
            <input
              {...register("name", { required: true })}
              type="text"
              className="w-full border rounded p-2 mt-1"
              required
            />
          </label>
          <label htmlFor="" className="text-sm">
            Enter Email address or Phone number{" "}
            <span className="text-red-500">*</span>
            <input
              {...register("accessId")}
              type="text"
              className="w-full border rounded p-2 mt-1"
              required
            />
          </label>
          <label htmlFor="" className="text-sm">
            Choose password <span className="text-red-500">*</span>
            <div className="border rounded flex items-center overflow-hidden">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full outline-none p-2"
                required
              />
              <div
                className="primary px-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </div>
            </div>
          </label>
          <label htmlFor="" className="text-sm">
            Confirm password <span className="text-red-500">*</span>
            <div className="border rounded flex items-center overflow-hidden">
              <input
                {...register("confirmpassword")}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full outline-none p-2"
              />
              <div
                className="primary px-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </div>
            </div>
          </label>

          <label
            htmlFor=""
            className="text-sm flex items-center gap-2 text-gray-500"
          >
            <input type="checkbox" name="" id="" /> Save password
          </label>
          <div className="text-center text-xs">
            By clicking Agree & Join or Continue, you agree to the HilalLink
            User
            <span className="primary underline">Agreement</span>,{" "}
            <span className="primary underline">Privacy Policy</span>, and{" "}
            <span className="primary underline">Cookie Policy</span>.
          </div>

          <button
            disabled={loading}
            className={`py-2.5 text-sm rounded-full ${
              loading ? "bg-blue-200" : "bg-primary"
            } grid place-items-center w-full disabled:cursor-not-allowed`}
          >
            {loading ? (
              <TailSpin height={20} width={20} color="white" />
            ) : (
              "Agree and Join"
            )}
          </button>

          <div className="flex  items-center gap-3">
            <div className="w-full h-[0.7px] bg-gray-300"></div>
            <div>or</div>
            <div className="w-full h-[0.7px] bg-gray-300"></div>
          </div>
          <div className="py-2.5 gap-2 text-sm rounded-full flex items-center justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          {/* <button className="max-sm:bg-white py-2.5 gap-2 text-sm rounded-full flex items-center justify-center bg-gray-100 w-full">
            <FcGoogle size={22} /> Continue with google
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Signup;
