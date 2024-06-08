import React, { useState, useEffect } from "react";
import {
  BsBookmark,
  BsChat,
  BsExclamation,
  BsExclamationCircle,
  BsEye,
  BsHeart,
  BsLink,
  BsPerson,
  BsRepeat,
  BsShare,
  BsThreeDots,
  BsX,
  BsPen,
  BsTrash,
  BsHeartFill
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import avatar from "../assets/images/avatar.jpeg";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import { MdBlock } from "react-icons/md";

const ActivityCard = ({ index, data, text }) => {
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [options, setOptions] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeVal, setLikeVal] = useState(data?.likes?.length);
  const [hide, setHide] = useState(false);
  const [reposted, setReposted] = useState(data?.reposted?.includes(my?._id));
  const [repostedNow, setRepostedNow] = useState(false);
  const [repostCount, setRepostCount] = useState(data?.reposted?.length);
  const [repostOptions, setRepostOptions] = useState(false);
  const [undoOptions, setUndoOptions] = useState(false);


  useEffect(() => {
    if (data?.reposted?.includes(localStorage.getItem("id"))) {
      setReposted(true);
    } else {
      setReposted(false);
    }
  }, []);

  const removeRepost = (id) => {
    setReposted(false);
    setRepostedNow(false);
    setRepostCount(repostCount - 1);
    fetch(`${base}/repost/delete/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
    setUndoOptions(false);
  };

  const repost = (id) => {
    setReposted(true);
    setRepostedNow(true);
    setRepostCount(repostCount + 1);
    fetch(`${base}/repost/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        toast.error(error);
      });
    setRepostOptions(false);
  };

  function addLike() {
    setLiked(true);
    fetch(`${base}/post/add-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(true);
      });
  }

  function removeLike() {
    setLiked(false);
    fetch(`${base}/post/remove-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(false);
      });
  }

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

  return (
    <>
    <div
        className={`mb-2 bg-white relative ${hide && "hidden"}`}
        style={{ borderRadius: "10px" }}
      >
      <div className="rounded-md mb-5 relative" style={{ borderRadius: 10 + "px" }}>
        <div className="bg-white px-4 py-3 border-b text-[12px] text-gray-500">
          You reposted this post
        </div>
        {options && (
            <div
              className="bg-white overflow-hidden z-[99] absolute text-sm border shadow rounded-md right-2 top-14"
              style={{ borderRadius: 10 + "px" }}
            >
              {data?.user?._id == my?._id ? (
                <>
                  <div
                    className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                    onClick={() => removeRepost(data?.original_postId)}
                  >
                    <BsTrash /> Undo repost
                  </div>
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
            </div>
          )}
        <div className="flex justify-between bg-white p-3">
          <Link to={`/profile/${data?.original_user?._id}`}>
          <div className="flex gap-3">
              <img
                src={data?.original_user?.profile_url ? data?.original_user?.profile_url : avatar}
                className="size-12 max-sm:size-10 rounded-full"
                alt=""
              />
              <div>
                <div className="text-sm max-sm:text-xs font-bold">
                  {data.original_user.name} 
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  {data.original_user.city}, {data.original_user.state}, {data.original_user.country}
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  {data.original_user.category}
                </div>
              </div>
            </div>
          </Link>
            
          <div className="flex text-xs items-center gap-3 text-gray-500">
            <span className="font-normal text-gray-600 text-xs">2d </span>
            <BsThreeDots
              onClick={() => setOptions(!options)}
              className="cursor-pointer max-sm:text-xs"
            />
          </div>
        </div>

        <Link to={`/repost-details/${data?.original_postId}`}>
        {data.text && (<div className="bg-white text-sm pb-2 px-4">
          <Markdown remarkPlugins={[remarkGfm]}>{data?.text}</Markdown>
        </div>)}

        {data.asset_url && ( 
          
          <img
          src={data.asset_url}
          className="w-full h-[360px] object-cover cursor-pointer"
          alt=""
          />
        )}
        </Link>
        
        <div className="bg-white p-3 card-bottom">
            <div className="grid grid-cols-[1fr,1fr,1fr,1fr,0.5fr] gap-3 max-sm:gap-1 ">
              {repostOptions && (
                <div
                  className="border bg-white absolute left-[250px] max-sm:left-[130px] max-sm:top-25 top-30 shadow overflow-hidden z-[999999]"
                  style={{ borderRadius: "6px" }}
                >
                  <div
                    onClick={() => repost(data?._id)}
                    className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-xs p-2 border-b"
                  >
                    <BsRepeat /> Repost
                  </div>
                  <div
                    onClick={() => setRepostOptions(false)}
                    className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-xs p-2"
                  >
                    <BsX /> Cancel
                  </div>
                </div>
              )}

              {undoOptions && (
                <div
                  className="border bg-white absolute left-[250px] max-sm:left-[130px] max-sm:top-25 shadow overflow-hidden z-[99]"
                  style={{ borderRadius: "6px" }}
                >
                  <div
                    onClick={() => removeRepost(data?.original_postId)}
                    className="cursor-pointer hover:bg-gray-100 text-green-500 flex items-center gap-2 text-xs p-2 border-b"
                  >
                    <BsRepeat /> Undo repost
                  </div>
                  <div
                    onClick={() => setUndoOptions(false)}
                    className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-xs p-2"
                  >
                    <BsX /> Cancel
                  </div>
                </div>
              )}

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
                  {" "}
                  <BsChat size={18} />
                  <div className="text-xs max-sm:text-[10px]">
                    {data?.comments?.length}
                  </div>
                </div>
              </Link>

              {reposted ? (
                <div
                  onClick={() => setUndoOptions(!undoOptions)}
                  className="flex rounded-full justify-center text-sm bg-[#f4f6fc] px-4 text-green-500 items-center gap-2 max-sm:gap-1 cursor-pointer"
                >
                  <BsRepeat size={18} />
                  <div className="text-xs max-sm:text-[11px]">
                    {repostCount}
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setRepostOptions(!repostOptions)}
                  className="flex rounded-full justify-center text-sm bg-[#f4f6fc] px-4 text-gray-500 items-center gap-2 max-sm:gap-1 cursor-pointer"
                >
                  <BsRepeat size={18} />
                  <div className="text-xs max-sm:text-[11px]">
                    {repostCount}
                  </div>
                </div>
              )}

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
    </>
  );
};

export default ActivityCard;



