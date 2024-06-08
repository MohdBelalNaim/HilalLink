import React, { useState,useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
import { hideAddress } from "@/redux/toggleSlice";
import userCategories from "../../utils/userCategories";

const Address = () => {
  const {register,handleSubmit,formState: { errors },} = useForm();
  const base = useSelector((state) => state.userSlice.base_url);
 const [loading, setLoading] = useState(false);
 const dispatch = useDispatch()

  const categoryOptions = useMemo(() => userCategories.map((item, index) => (
    <option key={index} value={item}>{item}</option>
  )), []);

  const onSubmit = (data) => {
    setLoading(true)
    const { category, gender, state, country, city } = data;
    fetch(`${base}/signup/gmail/address`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false)
          dispatch(hideAddress(false));
          toast.success(data.success)
        }
        else{
          setLoading(false)
          toast.error(data.error)
        }
      })
  };

  return (
    <div className="inset-0 fixed glass grid place-items-center z-50">
      <div className=" w-[min(400px,98%)] grid gap-y-4 p-6  bg-white border mx-auto " style={{ borderRadius: 10 + "px" }}>
                  <h2 className="font-bold">Please fill your address details</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                 <label className="text-sm">
            Category / Profession <span className="text-red-500">*</span>
            <select {...register("category", { required: true })} className="w-full border rounded p-2 mt-1">
              {categoryOptions}
            </select>
            {errors.category && <span className="text-red-500">This field is required</span>}
          </label>
          <label className="text-sm">
            Gender <span className="text-red-500">*</span>
            <select
              {...register("gender", { required: true })}
              className="w-full border rounded p-2 mt-1"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">This field is required</span>
            )}
          </label>
          <label className="text-sm">
            Country / Region <span className="text-red-500">*</span>
            <input
              {...register("country")}
              type="text"
              className="w-full border rounded p-2 mt-1"
              required
            />
          </label>
          <label className="text-sm">
            State <span className="text-red-500">*</span>
            <input
              {...register("state")}
              type="text"
              className="w-full border rounded p-2 mt-1"
              required
            />
          </label>
          <label className="text-sm">
            City / District <span className="text-red-500">*</span>
            <input
              {...register("city", { required: true })}
              type="text"
              className="w-full border rounded p-2 mt-1"
            />
            {errors.city && (
              <span className="text-red-500">This field is required</span>
            )}
          </label>
          <button
            disabled={loading}
            className={`py-2.5 text-sm rounded-full mt-5 ${
              loading ? "bg-blue-200" : "bg-primary"
            } grid place-items-center w-full disabled:cursor-not-allowed`}
          >
            {loading ? (
              <TailSpin height={20} width={20} color="white" />
            ) : (
              "Continue"
            )}
          </button>
        </form>
        </div>
    </div>
  );
};

export default Address;