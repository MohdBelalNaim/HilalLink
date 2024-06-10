import React, {useState, useEffect} from "react";
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


  useEffect(() => {
    fetchUnreadCount();
  },[])

  return (
    <div className="border-r px-4 py-4 flex flex-col justify-between items-center bg-white h-[100vh]">
      <div>
        <Link to="/home"><img src={logo} className="size-8 rounded-full" alt="" /></Link>
        <div className="flex flex-col items-center gap-y-7 mt-12">
          <Link to="/home"><BsHouse size={22} /></Link>
          <Link to="/explore"><BsSearch size={22} /></Link>
          <div className="relative"  onClick={notifications}>
              <BsBell size={20} className="cursor-pointer" />
                {unreadCount > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {unreadCount}
                </span>
                )}
            </div>
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


