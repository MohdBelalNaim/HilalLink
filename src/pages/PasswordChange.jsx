import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const PasswordChange = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const base = useSelector((state) => state.userSlice.base_url);

  const onSubmitPassword = async (data) => {
    setLoading(true);
    const accessId = localStorage.getItem("accessId");
    fetch(`${base}/auth/password-change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, accessId }), 
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.success);
          Login();
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const Login = () => {
    const accessId = localStorage.getItem("accessId");
    fetch(`${base}/auth/final/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ accessId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          setLoading(false);
        } else {
          localStorage.clear();
          localStorage.setItem("token", data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/forgotPassword")
      });
  };
  
  return (
    <div className="max-sm:p-2 h-[120dvh] ">
      <form onSubmit={handleSubmit(onSubmitPassword)}> 
        <div className="w-[min(400px,98%)] grid gap-y-4 p-6 mt-10 max-sm:mt-4 bg-white border rounded-md mx-auto max-sm:bg-transparent max-sm:border-hidden max-sm:py-2 max-sm:px-2">
          <label htmlFor="" className="text-sm my-3">
              Change Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-3 border rounded-md"
            placeholder="New password"
          />
          <input
            type="password"
            {...register("confirmpassword", { required: true })}
            className="w-full p-3 border rounded-md"
            placeholder="Repeat new password"
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
              "Change Password"
            )}
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default PasswordChange;
