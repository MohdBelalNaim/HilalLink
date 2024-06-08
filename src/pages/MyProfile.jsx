import React, { useState, useEffect } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CompactSidebar from "@/components/CompactSidebar";
import All from "../components/MyProfile/All";
import Images from "../components/MyProfile/Images";
import Videos from "../components/MyProfile/Videos";
import Activities from "../components/MyProfile/Activities";
import EditProfile from "../components/MyProfile/EditProfile";
import avatar from "../assets/images/avatar.png";
import { TailSpin } from "react-loader-spinner";
import { FaShare, FaUserEdit } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { RWebShare } from "react-web-share";

const MyProfile = () => {
  const [edit, setEdit] = useState(false);
  const [count, setCount] = useState(0);
  const [load, setLoad] = useState(false);
  const [current, setCurrent] = useState("Home");
  const user = useSelector((state) => state.userSlice.user);
  const base = useSelector((state) => state.userSlice.base_url);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${base}/post/my-post-count`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCount(data);
        setLoad(true);
      })
      .catch((error) => {
        console.error("Error fetching post count:", error);
      });
  }, [base]);

  const menu = {
    Home: <All />,
    Images: <Images />,
    Videos: <Videos />,
    Activities: <Activities />,
  };

  const handleEditProfile = () => {
    setEdit(true);
  };

  return (
    <div className="flex ">
      
      {edit && <EditProfile handler={setEdit} />}
      {load ? (
        <div className="w-[min(560px,100%)] mx-auto bg-blue">
          <div className="relative">
            <img
              src={user?.profile_url || avatar}
              className="size-[120px] max-sm:size-[100px] max-sm:-bottom-12 absolute rounded-full -bottom-14 left-[50%] -translate-x-[50%]"
              alt=""
            />
            <img
              src={user?.cover_url || "https://picsum.photos/800"}
              className="h-[250px] w-full object-cover"
              alt=""
            />
          </div>
          <div className="pt-16 max-sm:pt-14 pb-5 border-b bg-white">
            <div
              className="text-2xl text-center max-sm:text-lg"
              style={{ fontWeight: "bold" }}
            >
              {user?.name}
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-1 max-sm:text-xs">
              <FaLocationPin className="text-xs" />{" "}
              {`${user?.city}, ${user?.state}, ${user?.country}`}
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-1 max-sm:text-xs">
              <TbCategoryFilled /> {user?.category}
            </div>
            {user?.bio && (
              <div className="text-sm px-8 mt-5 max-sm:px-4 max-sm:text-xs">
                {user?.bio}
              </div>
            )}
            <div className="flex justify-center gap-12 mt-6 max-sm:gap-8">
              <Link to={`/followers/${user?._id}`}>
                <div className="text-center">
                  <div className="text-sm max-sm:text-xs font-bold">
                    {user?.followers?.length}
                  </div>
                  <div className="text-sm max-sm:text-xs text-gray-600">
                    Followers
                  </div>
                </div>
              </Link>
              <Link to={`/followings/${user?._id}`}>
                <div className="text-center">
                  <div className="text-sm max-sm:text-xs font-bold">
                    {user?.following?.length}
                  </div>
                  <div className="text-sm max-sm:text-xs text-gray-600">
                    Following
                  </div>
                </div>
              </Link>
              <div className="text-center">
                <div className="text-sm max-sm:text-xs font-bold">{count}</div>
                <div className="text-sm max-sm:text-xs text-gray-600">
                  Posts
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm max-sm:text-xs font-bold">0</div>
                <div className="text-sm max-sm:text-xs text-gray-600">
                  Likes
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-12 mt-6 max-sm:gap-2 relative">
              <button
                onClick={handleEditProfile}
                className="max-sm:text-xs max-sm:px-4 max-sm:py-2 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
                style={{ borderRadius: "6px" }}
              >
                <FaUserEdit className="text-[18px]" /> Edit profile
              </button>
              <button
                className="max-sm:text-xs max-sm:px-4 max-sm:py-2 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
                style={{ borderRadius: "6px" }}
                onClick={() => navigate("/verification/home")}
              >
                <MdVerified className="text-[18px]" /> Get verified
              </button>

              <RWebShare
                data={{
                  text: `Visit ${user?.name}'s profile`,
                  url: `https://hilal-xi.vercel.app/profile/${user?._id}`,
                  title: "Share your profile",
                }}
              >
                <button
                  className="max-sm:text-xs max-sm:px-3 max-sm:py-2.5 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2.5 text-sm"
                  style={{ borderRadius: "6px" }}
                >
                  <FaShare />
                </button>
              </RWebShare>
            </div>
          </div>
          <div className="border-t bg-white flex justify-evenly mb-3">
            {Object.keys(menu).map((item, index) => (
              <div
                key={index}
                onClick={() => setCurrent(item)}
                className={`cursor-pointer text-sm max-sm:text-xs max-sm:p-2.5 p-3.5 ${
                  current === item && "active-menu"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div>{menu[current]}</div>
        </div>
      ) : (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
