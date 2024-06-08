import { showCreate } from "@/redux/toggleSlice";
import React, { useEffect, useState } from "react";
import { BsBell, BsHouse, BsPlusCircleFill, BsSearch } from "react-icons/bs";
import { PiMosque } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const MobileBottomNavbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const base = useSelector((state) => state.userSlice.base_url);

  const fetchUnreadCount = () => {
    fetch(`${base}/notification/count`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Unread notifications count:", data);
        setUnreadCount(data.data.length);
      })
      .catch((err) => {
        console.error("Failed to fetch unread notifications count:", err);
      });
  };

  const NotificationRead = () => {
    fetch(`${base}/notification/uncount`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("All notification read");
        setUnreadCount(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchUnreadCount();
    if (
      pathname == "/forgotPassword" ||
      pathname == "/signup" ||
      pathname == "/signup/verification" ||
      pathname == "/signup/address" ||
      pathname == "/signup/bio" ||
      pathname == "/signup/photo" ||
      pathname == "/signup/final" ||
      pathname == "/" ||
      pathname.includes("/post-details/") ||
      pathname.includes("/chat/")
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname]);
  return (
    <>
      {show && (
        <div className="mt-12">
          <div
            className={`fixed py-3 shadow border-t justify-around bottom-0 z-30 bg-white w-full hidden max-sm:flex`}
          >
            <Link to="/home">
              <BsHouse size={20} />
            </Link>
            <Link to="/explore">
              <BsSearch size={20} />
            </Link>
            <BsPlusCircleFill
              size={26}
              onClick={() => dispatch(showCreate())}
            />
            <Link to="/islam-section">
              <PiMosque size={20} />
            </Link>
            <Link to="/notifications">
              <div className="relative">
                <BsBell
                  onClick={NotificationRead}
                  size={20}
                  className="cursor-pointer"
                />
                {unreadCount > 0 && (
                  <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {unreadCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomNavbar;
