import { showCreate } from "@/redux/toggleSlice";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpeg";
import {
  BsBell,
  BsBookmark,
  BsChatDots,
  BsGear,
  BsHouse,
  BsPlusCircle,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import { PiMosque } from "react-icons/pi";
const Home = ({ notifications }) => {
  const dispatch = useDispatch();
  const my = useSelector((state) => state.userSlice.user);
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
    <div className="h-[100dvh] bg-white py-6 pl-4 pr-16 flex flex-col justify-between">
      <div>
        <Link to='/home'>
        <div className="flex items-center gap-3 mb-12">
          <img src={logo} className="size-9 rounded-full" alt="" />
          <span className="font-bold">HilalLink</span>
        </div>
        </Link>
        <div className="">
          <Link to='/home'> 
          <div
            className="flex gap-4 px-2  items-center py-2 mb-4 hover:bg-gray-200 cursor-pointer w-[100%]"
            style={{ borderRadius: 6 + "px" }}
          >
            <BsHouse size={22} /> Home
          </div>
          </Link>
          
          <Link to='/explore'> 
          <div
            className="flex gap-4 px-2  items-center py-2 mb-4 hover:bg-gray-200 cursor-pointer w-[100%]"
            style={{ borderRadius: 6 + "px" }}
          >
            <BsSearch size={22} /> Explore
          </div>
          </Link>

          <div className="relative flex gap-4 px-2 items-center py-2 mb-4 hover:bg-gray-200 cursor-pointer w-[100%]" onClick={notifications}>
            <div className="relative" >
              <BsBell size={20} className="cursor-pointer" />
                {unreadCount > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {unreadCount}
                </span>
                )}
            </div>
            <span>Notifications</span>
          </div>

          
          <Link to='/messages'>
          <div
            className="flex gap-4 px-2  items-center py-2 mb-4 hover:bg-gray-200 cursor-pointer w-[100%]"
            style={{ borderRadius: 6 + "px" }}
          >
            <BsChatDots size={22} /> Messages
          </div>
          </Link>
          
          <Link to='/saved'>
          <div
            className="flex gap-4 px-2  items-center py-2 mb-4 hover:bg-gray-200 cursor-pointer w-[100%]"
            style={{ borderRadius: 6 + "px" }}
          >
            <BsBookmark size={22} /> Saved Posts
          </div>
          </Link>
          
          <Link to='/islam-section'>
          <div
            className="flex gap-4 px-2  items-center py-2 mb-4 hover:bg-gray-200 cursor-pointer w-[100%]"
            style={{ borderRadius: 6 + "px" }}
          >
            <PiMosque size={22} /> My Islam
          </div>
          </Link>
          
          <Link  to='/my-profile'>
          <div
            className="flex gap-4 px-2  items-center py-2 mb-4 hover:bg-gray-200 cursor-pointer w-[100%]"
            style={{ borderRadius: 6 + "px" }}
          >
            <img src={my?.profile_url} alt="" className="size-8 rounded-full" />{" "}
            Profile
          </div>
          </Link>
          
          <div
            className="flex gap-4 px-2  items-center py-2 mb-4 hover:bg-gray-200 cursor-pointer w-[100%]"
            style={{ borderRadius: 6 + "px" }}
            onClick={() => dispatch(showCreate())}
          >
            <BsPlusCircleFill size={30} />
            Create Post
          </div>
        </div>
      </div>
      <Link to='/settings'>
      <div>
        <BsGear size={22} className="cursor-pointer ml-2" />
      </div>
      </Link>
      
    </div>
  );
};

export default Home;
