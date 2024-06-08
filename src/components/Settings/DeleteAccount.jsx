import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";

const DeleteAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const base = useSelector((state) => state.userSlice.base_url);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true); 
    fetch(`${base}/user/delete-account`, {
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
          toast.error(data.error);
          navigate("/settings");
        } else {
          localStorage.clear();
          toast.success(data.success);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  return (
    <div className="h-[100dvh] py-12 max-sm:px-4">
      <div className="text-xl font-bold">Delete your account</div>
      <div className="text-gray-600 mt-2">
        If you want a break from HilalLink, you can temporarily deactivate your
        account instead of deleting it. Your profile won't appear on HilalLink
        while you're away.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-y-4">
        <div>
          <div>Why do you want to delete your account?</div>
          <select
            {...register("reason")}
            className="p-2 w-full rounded-md border mt-2"
          >
            <option value="Privacy concerns">Privacy concerns</option>
            <option value="Trouble getting started">
              Trouble getting started
            </option>
            <option value="Want to remove something">
              Want to remove something
            </option>
            <option value="Created a new account">Created a new account</option>
          </select>
        </div>
        <div>
          <div>Re-enter your password</div>
          <input
            type="password"
            {...register("password", { required: true })}
            className="p-2 w-full rounded-md border mt-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-3">
              Please enter your password.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-max bg-red-500 text-sm px-4 py-1.5 mt-4 text-white rounded-full"
          disabled={isLoading} 
        >
          {isLoading ? <TailSpin height={20} width={50} color="white" /> : "Delete my account"} 
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
