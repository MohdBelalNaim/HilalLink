import { useLockBodyScroll } from "@uidotdev/usehooks";
import React from "react";
import { BsGear, BsPerson, BsPersonAdd, BsPower, BsX } from "react-icons/bs";
import { RiMedalLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
const MobileSidebar = ({ controller }) => {
  const navigate = useNavigate();

  useLockBodyScroll();
  const user = useSelector((state) => state.userSlice.user);

  function handleLink(path) {
    controller(false);
    navigate(path);
  }

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="fixed z-50">
      <div
        onClick={() => controller(false)}
        className="h-full w-full fixed z-50 bg-black opacity-40"
      ></div>
      <div className="fixed w-[88%] animate__animated animate__slideInLeft shadow bg-white h-[100%] z-50 p-4">
        <div className="flex justify-between">
          <img
            src={user?.profile_url ? user?.profile_url : avatar}
            className="size-12 rounded-full"
            alt=""
          />
          <BsX size={22} onClick={() => controller(false)} />
        </div>
        <div onClick={() => handleLink("/my-profile")}>
          <div className="text-sm font-bold mt-4">{user?.name}</div>
          <div className="text-xs text-gray-600 mt-1">
            {user?.city}, {user?.state}, {user?.country}
          </div>
          <div className="text-xs text-gray-600 mt-1">{user?.category}</div>
        </div>

        <div className="text-xs flex gap-4 items-center mt-7">
          <div>
            <span className="font-bold">{user?.followers?.length}</span>{" "}
            Followers
          </div>
          <div>
            <span className="font-bold">{user?.following?.length}</span>{" "}
            Following
          </div>
        </div>
        <div className="h-[1px] mt-5 bg-gray-200 w-full"></div>
        <div className="flex flex-col  justify-between h-[70%] ">
          <div className="text-sm grid gap-y-6 mt-10">
            <div
              className="flex items-center gap-2"
              onClick={() => handleLink("/my-profile")}
            >
              <BsPerson size={22} /> Profile
            </div>
            <div className="flex items-center gap-2">
              <BsPersonAdd size={22} /> Invite friends
            </div>
            <div className="flex items-center gap-2">
              <RiMedalLine size={22} /> Analytics and rewards
            </div>
          </div>

          <div>
            <div
              className="flex gap-2 items-center text-sm mb-5"
              onClick={() => handleLink("/mobile-settings")}
            >
              <BsGear /> Privacy and settings
            </div>
            <div
              className="flex gap-2 items-center text-sm mb-5"
              onClick={logout}
            >
              <BsPower /> Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
