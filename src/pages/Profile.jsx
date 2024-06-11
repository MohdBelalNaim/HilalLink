import CompactSidebar from "@/components/CompactSidebar";
import React, { useState, useEffect } from "react";
import {
  BsChat,
  BsLock,
  BsPersonAdd,
  BsPersonCheck,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import All from "../components/Profile/All";
import Images from "../components/Profile/Images";
import Articles from "../components/Profile/Videos";
import Activities from "../components/Profile/Activities";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/images/avatar.png";
import { TailSpin } from "react-loader-spinner";
import { loginUser } from "@/redux/userSlice";
import { toast } from "sonner";
import notify from "../../utils/sendNotification";
import ConfirmationModal from "../modal/ConfirmationModal";
import { RWebShare } from "react-web-share";

const Profile = () => {
  const menu = {
    Home: <All />,
    Images: <Images />,
    Videos: <Articles />,
    Activities: <Activities />,
  };

  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [current, setCurrent] = useState("Home");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [count, setCount] = useState(0);
  const [buttonload, setButtonLoad] = useState(false);
  const [options, setOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id === my?._id) {
      navigate(`/my-profile`);
    } else {
      getDetails();
    }
  }, [id, my]);

  useEffect(() => {
    if (my?.following?.includes(id)) {
      setStatus("following");
      setIsFollowing(true);
    } else if (user?.followRequests?.includes(my?._id)) {
      setStatus("requested");
      setIsFollowing(false);
    } else {
      setStatus("");
      setIsFollowing(false);
    }
    setIsPrivate(user?.isPrivate || false);
  }, [my, user]);

  const getDetails = () => {
    fetch(`${base}/user/by-id/${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoad(true);
      })
      .catch((err) => alert(err));
  };

  const follow = () => {
    setButtonLoad(true);
    fetch(`${base}/user/privateId-request/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
          return;
        }
        if (result.private) {
          setStatus("requested");
          setButtonLoad(false);
          setStatus("requested");
          notify(id, "requested", my?._id, base);
        } else {
          setStatus("following");
          setIsFollowing(true);
          setButtonLoad(false);
          notify(id, "following", my?._id, base);
        }
      })
      .catch((e) => {
        toast.error("An error occurred while sending follow request");
        console.log(e);
      })
      .finally(() => {
        dispatch(loginUser());
        getDetails();
      });
  };

  const cancelRequest = () => {
    fetch(`${base}/user/cancel-request/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
        } else {
          setStatus("");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const unfollow = () => {
    setButtonLoad(true);
    fetch(`${base}/user/unfollow-user/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to unfollow user");
        }
      })
      .then(() => {
        setStatus("");
        setIsFollowing(false);
        setButtonLoad(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        dispatch(loginUser());
        getDetails();
      });
  };

  const gotochat = () => {
    navigate(`/chat/${id}`);
  };

  const confirmUnfollow = () => {
    setIsModalOpen(true);
  };

  const handleUnfollowConfirm = () => {
    setIsModalOpen(false);
    unfollow();
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(`${base}/post/user-post-count/${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data));
  }, [id]);

  const renderFollowButton = () => {
    switch (status) {
      case "following":
        return (
          <>
            {buttonload ? (
              <button
                style={{ borderRadius: "6px" }}
                className="max-sm:text-xs max-sm:px-2 max-sm:py-1.5 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
                disabled
              >
                <TailSpin height={20} width={80} color="white" />
              </button>
            ) : (
              <button
                onClick={confirmUnfollow}
                style={{ borderRadius: "6px" }}
                className="max-sm:text-xs max-sm:px-2 max-sm:py-1.5 flex items-center bg-[#2196f3] text-white px-4 py-2 text-sm hover:bg-red-500 hover:text-white hover:border-red-500"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <BsPersonCheck className="text-lg" />
                <span className="ml-1">
                  {isHovered ? "Unfollow" : "Following"}
                </span>
              </button>
            )}
          </>
        );
      case "requested":
        return (
          <>
            {buttonload ? (
              <button
                style={{ borderRadius: "6px" }}
                className="max-sm:text-xs max-sm:px-2 max-sm:py-1.5 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
                disabled
              >
                <TailSpin height={20} width={80} color="white" />
              </button>
            ) : (
              <button
                onClick={cancelRequest}
                style={{ borderRadius: "6px" }}
                className="max-sm:text-xs max-sm:px-2 max-sm:py-1.5 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
              >
                <BsPersonCheck className="text-xl" />
                <span className="ml-1">Requested</span>
              </button>
            )}
          </>
        );
      default:
        return (
          <>
            {buttonload ? (
              <button
                style={{ borderRadius: "6px" }}
                className="max-sm:text-xs max-sm:px-2 max-sm:py-2 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
                disabled
              >
                <TailSpin height={20} width={80} color="white" />
              </button>
            ) : (
              <button
                onClick={follow}
                style={{ borderRadius: "6px" }}
                className="max-sm:text-xs max-sm:px-2 max-sm:py-2 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
              >
                <BsPersonCheck className="text-xl" />
                <span className="ml-1">Follow</span>
              </button>
            )}
          </>
        );
    }
  };

  return (
    <div className="flex">
      
      {load ? (
        <div className="w-[min(560px,100%)] mx-auto bg-blue">
          <div className="relative">
            <img
              src={user?.profile_url ? user?.profile_url : avatar}
              className="size-[120px] max-sm:size-[100px] max-sm:-bottom-12 absolute rounded-full -bottom-14 left-[50%] -translate-x-[50%]"
              alt=""
            />
            <img
              src={
                user?.cover_url ? user?.cover_url : "https://picsum.photos/800"
              }
              className="h-[250px] w-full object-cover"
              alt=""
            />
          </div>
          <div className="pt-16 max-sm:pt-14 pb-5 border-b bg-white">
            <div className="text-2xl text-center max-sm:text-lg font-bold">
              {user?.name}
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-1 max-sm:text-xs">
              <FaLocationPin className="text-xs" /> {user?.city}
              {", " + user?.state}
              {", " + user?.country}
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-1 max-sm:text-xs">
              {user?.category}
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
                    {" "}
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
            <div className="flex justify-center items-center gap-12 mt-6 max-sm:gap-6 relative">
              {options && (
                <div
                  className="border shadow-2xl text-sm absolute bg-white right-12 -bottom-[106px] z-10" 
                  style={{ borderRadius: "4px" }}
                >
                  <div className="cursor-pointer hover:bg-gray-200 px-8 py-1.5 border-b">
                    Block
                  </div>
                  <div className="cursor-pointer hover:bg-gray-200 px-8 py-1.5 border-b">
                    Report
                  </div>
                  <RWebShare
                    data={{
                      title: "Share this profile",
                      text: `Visit ${user?.name}'s profile on HilalLink`,
                      url: `https://hilal-xi.vercel.app/profile/${id}`,
                    }}
                  >
                    <div className="cursor-pointer hover:bg-gray-200 px-8 py-1.5">
                      Share
                    </div>
                  </RWebShare>
                </div>
              )}
              {renderFollowButton()}
              <button
                onClick={gotochat}
                className="max-sm:text-xs max-sm:px-2 max-sm:py-2 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
                style={{ borderRadius: "6px" }}
              >
                <BsChat /> Message
              </button>
              <button
                onClick={() => setOptions(!options)}
                className="max-sm:text-xs max-sm:px-2 max-sm:py-2.5 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2.5 text-sm"
                style={{ borderRadius: "6px" }}
              >
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>
          {!isPrivate || isFollowing ? (
            <>
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
            </>
          ) : (
            <div className="h-[100px] grid place-items-center text-gray-500 mt-10">
              <div>
                <div className="border-2 border-gray-5 p-2 border-gray-500 rounded-full">
                  <BsLock className="text-2xl" />
                </div>
              </div>
              <div className="font-bold text-xl mt-4">
                This account is private.
              </div>
              <div className="text-sm">
                Follow this account to see their posts.
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleUnfollowConfirm}
        onCancel={handleModalCancel}
        user={user}
      />
    </div>
  );
};

export default Profile;