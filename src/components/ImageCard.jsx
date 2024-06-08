import React from "react";
import { BsX } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { hideImageDetails } from "@/redux/toggleSlice";

const ImageCard = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div className="inset-0 fixed glass object-fit grid place-items-center">
        <img src={data?.asset_url} alt="" />
        <BsX
          onClick={() => dispatch(hideImageDetails())}
          className="absolute cursor-pointer text-white right-5 top-5"
          size={40}
        />
      </div>
    </div>
  );
};

export default ImageCard;
