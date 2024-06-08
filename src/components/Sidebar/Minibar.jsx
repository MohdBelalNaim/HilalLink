import React from "react";
import {
  BsBell,
  BsBookmark,
  BsChatDots,
  BsGear,
  BsHouse,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import { PiMosque } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/logo.jpeg";
import { showCreate } from "@/redux/toggleSlice";
import { Link } from "react-router-dom";

const Minibar = ({notifications}) => {
  const my = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();

  return (
    <div className="border-r px-4 py-4 flex flex-col justify-between items-center bg-white h-[100vh]">
      <div>
        <img src={logo} className="size-8 rounded-full" alt="" />
        <div className="flex flex-col items-center gap-y-7 mt-12">
          <Link to="/home"><BsHouse size={22} /></Link>
          <Link to="/explore"><BsSearch size={22} /></Link>
          <BsBell size={22} className="cursor-pointer" onClick={() => notifications()}/>
          <Link to="/messages"><BsChatDots size={22} /></Link>
          <Link to="/saved"><BsBookmark size={22} /></Link>
          <Link to="/islam-section"><PiMosque size={22} /></Link>
          <Link to="/my-profile">
            <img src={my?.profile_url} className="size-8 rounded-full" alt="" />
          </Link>
          <BsPlusCircleFill size={30} onClick={() => dispatch(showCreate())} />
        </div>
      </div>
      <div>
        <Link to="/settings"><BsGear size={20} /></Link>
      </div>
    </div>
  );
};

export default Minibar;


