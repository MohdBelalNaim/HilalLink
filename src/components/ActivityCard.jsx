import React, { useState, useEffect, useRef } from "react";
import {
  BsBookmark,
  BsChat,
  BsExclamationCircle,
  BsEye,
  BsHeart,
  BsLink,
  BsPerson,
  BsShare,
  BsThreeDots,
  BsHeartFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import avatar from "../assets/images/avatar.jpeg";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import { MdBlock } from "react-icons/md";
import { BsX } from "react-icons/bs";
import moment from "moment";

const ActivityCard = ({ index, data, text }) => {
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [options, setOptions] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeVal, setLikeVal] = useState(data?.likes?.length);
  const [lightbox, setLightBox] = useState(false);
  const [date, setDate] = useState(moment(data?.date).fromNow());
  const [hide, setHide] = useState(false);
  const [reposted, setReposted] = useState(data?.reposted?.includes(my?._id));
  const [repostedNow, setRepostedNow] = useState(false);
  const [repostCount, setRepostCount] = useState(data?.reposted?.length);

  useEffect(() => {
  const hasLiked = data?.likes.some(like => like._id === my?._id);
  setLiked(hasLiked); 

  setLikeVal(data?.likes?.length || 0);
  }, [data, my]);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const addLike = () => {
    setLikeVal(likeVal + 1);
    setLiked(true);
    fetch(`${base}/post/add-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(() => {
        notify(data?.user?._id, "Like", data?._id, base);
      });
  };

  const removeLike = () => {
    setLikeVal(likeVal - 1);
    setLiked(false);
    fetch(`${base}/post/remove-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(() => {
        console.log("unlike");
      });
  };

  const savePost = () => {
    fetch(`${base}/post-save/save/${data?._id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Post saved successfully");
        setOptions(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  };

  const copyToClipboard = async () => {
    const textToCopy = `${base}/post-details/${data?._id}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    setDate(moment(data?.date).fromNow());
  }, []);

  return (
    <div
      className={`mb-2 bg-white relative ${hide && "hidden"}`}
      style={{ borderRadius: "10px" }}
    >
      <div className="rounded-md mb-5 relative" style={{ borderRadius: "10px" }}>
        {lightbox && (
        <div className="inset-0 fixed glass z-[999] grid place-items-center">
          <div
            onClick={() => setLightBox(false)}
            className="cursor-pointer absolute top-5 right-5 bg-gray-600 text-white rounded-full"
          >
            <BsX size={22} />
          </div>
          <img
            src={data?.asset_url}
            alt=""
            className="h-[500px] w-[500px] max-sm:h-[250px] max-sm:w-[250px] "
          />
        </div>
        )}
        {options && (
          <div
            ref={menuRef}
            className="bg-white overflow-hidden z-[99] absolute text-sm border shadow rounded-md right-2 top-14"
            style={{ borderRadius: "10px" }}
          >
            {data?.user?._id === my?._id ? (
              <>
                <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                  <BsShare /> Share post
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={savePost}
                  className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                >
                  <BsBookmark /> Save post
                </div>
                <div
                  onClick={copyToClipboard}
                  className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                >
                  <BsLink /> Copy link
                </div>
                <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                  <BsExclamationCircle /> Report
                </div>
                <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                  <MdBlock /> Block user
                </div>
                <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                  <BsPerson /> Follow user
                </div>
              </>
            )}
            <div
                onClick={() => setOptions(!options)}
                className="py-1.5 max-sm:text-xs px-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
              >
                <BsX /> Close
              </div>
          </div>
        )}
        <div className="flex justify-between bg-white p-3">
          <Link to={`/profile/${data?.user?._id}`}>
            <div className="flex gap-3">
              <img
                src={data?.user?.profile_url ? data?.user?.profile_url : avatar}
                className="size-12 max-sm:size-10 rounded-full"
                alt=""
              />
              <div>
                <div className="text-sm max-sm:text-xs font-bold">
                  {data.user.name}
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  {data.user.city}, {data.user.state}, {data.user.country}
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  {data.user.category}
                </div>
              </div>
            </div>
          </Link>

          <div className="flex text-xs items-center gap-3 text-gray-500">
            <span className="font-normal text-gray-600 text-xs absolute right-3 top-2.5">{date}</span>
            <button ref={buttonRef}>
              <BsThreeDots onClick={() => setOptions(!options)} className="cursor-pointer max-sm:text-xs" />
            </button>
          </div>
        </div>

          <Link to={`/post-details/${data?._id}`}>
          {data.text && (
            <div className="bg-white text-sm pb-2 px-4">
              <Markdown remarkPlugins={[remarkGfm]}>{data?.text}</Markdown>
            </div>
          )}
          </Link>

          {data?.asset_url && (
            <img onClick={() => setLightBox(true)} src={data?.asset_url} className="w-full h-[500px] cursor-pointer" alt="Post asset" />
          )}
        

        <div className="bg-white p-3 card-bottom">
          <div className="grid grid-cols-[1fr,1fr,1fr,1fr] gap-3 max-sm:gap-1 ">
            {liked ? (
              <div
                onClick={removeLike}
                className="bg-[#f4f6fc] rounded-full justify-center px-4 py-1.5 flex text-sm text-gray-500 items-center gap-2 max-sm:gap-1"
              >
                <BsHeartFill size={18} className="text-red-500" />
                <div className="text-xs max-sm:text-[11px]">{likeVal}</div>
              </div>
            ) : (
              <div
                onClick={addLike}
                className="bg-[#f4f6fc] rounded-full px-4 py-1.5 flex  justify-center text-sm text-gray-500 items-center gap-2 max-sm:gap-1"
              >
                <BsHeart size={18} />
                <div className="text-xs max-sm:text-[11px]">{likeVal}</div>
              </div>
            )}

            <Link to={`/post-details/${data?._id}`}>
              <div className="flex rounded-full justify-center  text-sm bg-[#f4f6fc] px-4 py-1.5 text-gray-500 items-center gap-2 max-sm:gap-1">
                <BsChat size={18} />
                <div className="text-xs max-sm:text-[10px]">
                  {data?.comments?.length}
                </div>
              </div>
            </Link>

            <div className="flex rounded-full justify-center bg-[#f4f6fc] px-4 text-sm text-gray-500 items-center gap-2 max-sm:gap-1">
              <BsEye size={18} />
              <div className="text-xs max-sm:text-[11px]">{data?.views}</div>
            </div>

            <div className="bg-[#f4f6fc] rounded-full px-2 py-1.5 flex justify-center items-center">
              <RWebShare
                data={{
                  text: "Check this post on HilalLink",
                  url: `${base}/post-details/${data?._id}`,
                  title: "Share this post",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <BsShare className="cursor-pointer max-sm:text-xs" />
              </RWebShare>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;




