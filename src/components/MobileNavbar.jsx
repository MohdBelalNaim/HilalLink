import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.jpeg";
import { AiOutlineMessage } from "react-icons/ai";
import MobileSidebar from "./MobileSidebar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import avatar from "../assets/images/avatar.jpeg";
import { loginUser } from "@/redux/userSlice";
const MobileNavbar = () => {
  const [sidebar, setSideBar] = useState(false);
  const [show, setShow] = useState(false);
  const [bottom, setBottom] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const create = useSelector((state) => state.toggleSlice.createPost);
  const user = useSelector((state) => state.userSlice.user);
  useEffect(() => {
    if (
      pathname == "/" ||
      pathname == "/login" ||
      pathname == "/signup/address" ||
      pathname == "/signup/verification" ||
      pathname == "/signup/basic-details" ||
      pathname == "/signup" ||
      pathname == "/signup/bio" ||
      pathname == "/signup/photo" ||
      pathname == "/signup/final" ||
      pathname == "/explore" ||
      pathname == "/my-profile" ||
      pathname == "/profile"
    ) {
      setShow(false);
    } else {
      setShow(true);
    }

    if (
      pathname == "/" ||
      pathname == "/login" ||
      pathname == "/signup/address" ||
      pathname == "/signup/verification" ||
      pathname == "/signup/basic-details" ||
      pathname == "/signup" ||
      pathname == "/signup/bio" ||
      pathname == "/signup/photo" ||
      pathname == "/signup/final"
    ) {
      setBottom(false);
    } else {
      setBottom(true);
    }
  }, [pathname]);
  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(loginUser());
  }, []);
  return (
    <>
      {create && <CreatePost />}
      <div>
        {sidebar && <MobileSidebar controller={setSideBar} />}
        <div
          className={`flex border-b justify-between items-center bg-white px-4 py-2  ${
            show ? "block" : "hidden"
          }`}
        >
          <img
            src={user?.profile_url ? user?.profile_url : avatar}
            className="size-7 rounded-full"
            alt=""
            onClick={() => setSideBar(true)}
          />
          {/* <BsPerson onClick={() => setSideBar(true)} className="text-xl" /> */}
          <Link to="/home">
            <img src={logo} className="size-8 rounded-full" alt="" />
          </Link>
          <Link to="/messages">
            <AiOutlineMessage className="text-xl" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
