import CommentCard from "@/components/CommentCard";
import { useEffect, useState, useRef } from "react";
import React from "react";
import {
  BsChat,
  BsHeart,
  BsHeartFill,
  BsRepeat,
  BsShare,
  BsX,
  BsThreeDots,
  BsBookmark,
  BsLink,
  BsExclamationCircle,
  BsPerson,
  BsPen,
  BsTrash,
  BsArrowLeft,
} from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import avatar from "../assets/images/avatar.jpeg";
import { RWebShare } from "react-web-share";
import FullScreenLoader from "@/components/FullScreenLoader";
import notify from "../../utils/sendNotification";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import LikeModal from "./LikeModal";
import RepostModal from "./Repostmodal";
import moment from "moment";
import { MdBlock } from "react-icons/md";
import RepostButton from "@/components/RepostButton";

const PostDetails = () => {
  const { id } = useParams();
  const my = useSelector((state) => state.userSlice.user);
  const [details, setDetails] = useState(null);
  const base = useSelector((state) => state.userSlice.base_url);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightBox] = useState(false);
  const [likeVal, setLikeVal] = useState(0);
  const [reposted, setReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState([]);
  const [repostUser, setRepostUser] = useState([]);
  const [isModalOn, setIsModalOn] = useState(false);
  const [date, setDate] = useState(moment(details?.date).fromNow());
  const [options, setOptions] = useState(false);
  const [check, setCheck] = useState(false);


  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const updateRepostCount = (count) => {
    setRepostCount(count);
  };
  
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


  useEffect(() => {
    if (details?.likes.some((like) => like._id === my?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    setReposted(details?.reposted?.includes(my?._id));
    setLikeVal(details?.likes?.length || 0);
    setRepostCount(details?.reposted?.length || 0);
    setLikes(details?.likes || []);
    setRepostUser(details?.reposted || []);
  }, [details, my?._id]);

  useEffect(() => {
    if (details?.reposted?.includes(localStorage.getItem("id"))) {
      setReposted(true);
    } else {
      setReposted(false);
    }
  }, []);

  const addComment = () => {
    fetch(`${base}/post/add-comment/${details._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        getDetails();
        notify(details?.user?._id, "comment", details?._id, base);
        setComment("");
      });
  };

  const getDetails = () => {
  setLoading(true);
  fetch(`${base}/post/post-by-id/${id}`, {
    method: "POST",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch post details");
      }
      return res.json();
    })
    .then((data) => {
      setDetails(data?.data);
      setLoading(false);
    })
    .catch((error) => {
      toast.error(error.message);
      console.error("Error fetching post details:", error);
      setLoading(false);
    });
};



  const addLike = () => {
    setLiked(true);
    fetch(`${base}/post/add-like/${details?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        notify(details?.user?._id, "Like", details?._id, base);
        setDetails((prev) => ({
          ...prev,
          likes: [...prev.likes, { _id: my._id }],
        }));
        setLikeVal((prev) => prev + 1);
      })
      .catch((error) => console.error("Error adding like:", error));
  };

  const removeLike = () => {
    setLiked(false);
    fetch(`${base}/post/remove-like/${details?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDetails((prev) => ({
          ...prev,
          likes: prev.likes.filter((like) => like._id !== my._id),
        }));
        setLikeVal((prev) => prev - 1);
      })
      .catch((error) => console.error("Error removing like:", error));
  };

  const viewUpdate = () => {
    fetch(`${base}/post/update-views/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => console.log(data.success));
  };

  const savePost = () => {
    fetch(`${base}/post-save/save/${details?._id}`, {
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
    const textToCopy = `${base}/post-details/${details?._id}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    viewUpdate();
    getDetails();
    checkPost();
  }, []);

  const checkPost = () => {
    fetch(`${base}/post/check-post/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.success){
          setCheck(data.success)
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  }

  const Like = () => {
    setIsModalOpen(true);
  };

  const LikeCancel = () => {
    setIsModalOpen(false);
  };

  const repostedUser = () => {
    setIsModalOn(true);
  };

  const repostCancel = () => {
    setIsModalOn(false);
  };

  useEffect(() => {
    setDate(moment(details?.date).fromNow());
  }, []);

  return (
    <div className="relative">
      {lightbox && (
        <div className="inset-0 fixed glass z-[999] grid place-items-center">
          <div
            onClick={() => setLightBox(false)}
            className="cursor-pointer absolute top-5 right-5 bg-gray-600 text-white rounded-full"
          >
            <BsX size={22} />
          </div>
          <img
            src={details?.asset_url}
            alt=""
            className="h-[500px] w-[500px] max-sm:h-[250px] max-sm:w-[250px] "
          />
        </div>
      )}
      {loading && <FullScreenLoader />}

      <div className="h-[100%] w-[min(100%,660px)] mx-auto bg-white relative">
        <div className="flex gap-4 font-bold items-center p-3 border-b">
          <BsArrowLeft
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          Post
        </div>
        
        {options && (
          <div
            ref={menuRef}
            className="bg-white overflow-hidden  absolute text-sm border shadow rounded-md right-2 top-24"
            style={{ borderRadius: "10px" }}
          >
            {details?.user?._id === my?._id ? (
              <>
                <Link to={`/edit/${details?._id}`}>
                  <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                    <BsPen /> Edit post
                  </div>
                </Link>

                <div
                  className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                  onClick={() => deletePost(details?._id)}
                >
                  <BsTrash /> Delete post
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
                <Link to={`/report-post/${details?._id}`}>
                  <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                    <BsExclamationCircle /> Report
                  </div>
                </Link>
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
        <div className="flex justify-between">
          <Link to={`/profile/${details?.user?._id}`}>
            <div className="flex items-start gap-4 p-4">
              <img
                src={
                  details?.user?.profile_url
                    ? details?.user?.profile_url
                    : avatar
                }
                className="size-14 rounded-full"
                alt=""
              />
              <div className="text-sm max-sm:text-xs">
                <div className="text-sm font-bold">{details?.user?.name}</div>
                <div className="text-xs text-gray-600">
                  {details?.user?.city}, {details?.user?.state},{" "}
                  {details?.user?.country}
                </div>
                <div className="text-xs text-gray-600">
                  {details?.user?.category}
                </div>
              </div>
            </div>
          </Link>
          <div className="flex text-xs items-center gap-3 text-gray-500">
            <span className="font-normal text-gray-600 text-xs absolute right-3 top-16">
              {date}
            </span>
            <button ref={buttonRef}>
              <BsThreeDots
                onClick={() => setOptions(!options)}
                className="cursor-pointer max-sm:text-xs mr-3"
              />
            </button>
          </div>
        </div>
        {details?.text && (
          <div className="text-sm px-5 mb-5">
            <Markdown>{details?.text}</Markdown>
          </div>
        )}
        {details?.asset_url && (
          <img
            onClick={() => setLightBox(true)}
            src={details?.asset_url}
            className="w-full h-full cursor-pointer"
            alt=""
          />
        )}
        <div className="bg-white px-3 p-3 border-b border-t">
          <div className="grid grid-cols-[1fr,1fr,1fr,1fr] gap-3 max-sm:gap-1 ">
            <div
              onClick={Like}
              className="px-4 py-1.5 flex justify-center text-sm items-center gap-2 max-sm:gap-1 cursor-pointer max-sm:px-0"
            >
              <span className="text-black font-bold">
                {likeVal}{" "}
                <span className="text-gray-500 font-normal">Likes</span>
              </span>
            </div>

            <div className="flex justify-center text-sm px-4 py-1.5 items-center gap-2 max-sm:gap-1 max-sm:px-0">
              <span className="text-black font-bold">
                {details?.comments?.length}{" "}
                <span className="text-gray-500 font-normal">Replies</span>
              </span>
            </div>

            <div onClick={repostedUser} className="flex justify-center cursor-pointer px-4 text-sm items-center gap-2 max-sm:gap-1 max-sm:px-0">
            <span className="text-black font-bold">
              {repostCount}{" "}
              <span className="text-gray-500 font-normal">Reposts</span>
            </span>
          </div>

            <div className="flex justify-center px-4 text-sm items-center gap-2 max-sm:gap-1 max-sm:px-0">
              <span className="text-black font-bold">
                {details?.views}{" "}
                <span className="text-gray-500 font-normal">Views</span>
              </span>
            </div>
          </div>
        </div>

        
        <div className="bg-white px-3 p-3 mt-2 border-b">
          <div className="grid grid-cols-[1fr,1fr,1fr,1fr] mb-2 gap-3 max-sm:gap-1 ">
            {!liked ? (
              <div
                onClick={addLike}
                className="bg-[#f4f6fc] rounded-full  py-2 flex justify-center text-sm text-gray-500 items-center gap-2 max-sm:gap-1 cursor-pointer"
              >
                <BsHeart className="text-xl text-gray" />
              </div>
            ) : (
              <div
                onClick={removeLike}
                className="bg-[#f4f6fc] rounded-full justify-center py-2 flex text-sm text-gray-500 items-center gap-2 max-sm:gap-1 cursor-pointer"
              >
                <BsHeartFill className="text-xl text-red-500" />
              </div>
            )}

            <Link to={`/repost-details/${details?._id}`}>
              <div className="flex rounded-full justify-center text-sm bg-[#f4f6fc]  py-2 text-gray-500 items-center gap-2 max-sm:gap-1">
                <BsChat size={18} />
              </div>
            </Link>

            {details && <RepostButton data={details} updateRepostCount={updateRepostCount}/>}

            <div className="bg-[#f4f6fc] rounded-full py-2 flex justify-center items-center">
              <RWebShare
                data={{
                  text: "Check this post on HilalLink",
                  url: `${base}/post-details/${details?._id}`,
                  title: "Share this post",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <BsShare className="cursor-pointer max-sm:text-xs" />
              </RWebShare>
            </div>
          </div>
        </div>
        <div className="font-bold p-3 py-4 text-sm border-b">
          Comments ({details?.comments?.length}){" "}
        </div>
        <div className="flex gap-2 p-3 items-center ">
          <img
            src={my?.profile_url ? my?.profile_url : avatar}
            className="size-8 rounded-full"
            alt=""
          />
          <input
            type="text"
            className="w-full border rounded-full px-3 py-2.5 text-sm max-sm:text-xs max-sm:py-2"
            placeholder={`Comment as ${my?.name}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />{" "}
          {comment && (
            <button
              onClick={addComment}
              className="text-white bg-blue-600 p-2 rounded-full"
            >
              <FaPaperPlane />
            </button>
          )}
        </div>
        <div className="border-t py-4">
          {details?.comments?.length > 0 ? (
            details?.comments.map((item, index) => {
              return (
                <CommentCard id={id} data={item} index={index} key={index} check={check}/>
              );
            })
          ) : (
            <div className="font-bold text-center py-24 text-gray-500">
              {" "}
              No comments yet
            </div>
          )}
        </div>
      </div>
      <LikeModal isOpen={isModalOpen} onClose={LikeCancel} likes={likes} />
      <RepostModal
        isOpen={isModalOn}
        onClose={repostCancel}
        repostUser={repostUser}
      />
    </div>
  );
};

export default PostDetails;