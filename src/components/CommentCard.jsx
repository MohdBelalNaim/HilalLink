
import React, { useState, useEffect } from "react";
import {
  BsExclamationCircle,
  BsHeart,
  BsThreeDots,
  BsTrash,
  BsHeartFill,
} from "react-icons/bs";
import avatar from "../assets/images/avatar.jpeg";
import { useSelector } from "react-redux";
import { FaPaperPlane } from "react-icons/fa";
import ReplyCard from "../components/ReplyCard";
import notify from "../../utils/sendNotification";
import moment from "moment";
import { useParams } from "react-router-dom";

const CommentCard = ({ id, data, load, check }) => {
  const [options, setOptions] = useState(false);
  const [reply, setReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const my = useSelector((state) => state.userSlice.user);
  const user = data?.user;
  const [hide, setHide] = useState(false);
  const base = useSelector((state) => state.userSlice.base_url);
  const [userdata, setUserdata] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeVal, setLikeVal] = useState(data?.likes?.length);
  const [date, setDate] = useState([]);
  const [replies, setReplies] = useState(data?.replies || []);

  useEffect(() => {
    if (data?.likes?.includes(my?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [data?.likes, my?._id]);

  useEffect(() => {
    if (showReplies) {
      fetchReplyUserDetails(replies);
    }
  }, [showReplies, replies]);

  function addLike() {
    setLikeVal((prev) => prev + 1);
    setLiked(true);
    fetch(`${base}/post/comment/add-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((mydata) => {
        notify(data?.user?._id, "Like", data?._id, base); 
      })
      .catch((error) => console.error("Error adding like:", error));
  }

  function removeLike() {
    setLikeVal((prev) => prev - 1);
    setLiked(false);
    fetch(`${base}/post/comment/remove-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error removing like:", error));
  }

  async function fetchReplyUserDetails(replies) {
    const promises = replies.map((reply) =>
      fetch(`${base}/user/by-id/${reply.user}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((userData) => ({ ...reply, user: userData }))
        .catch((error) => console.error("Error fetching user details:", error))
    );

    Promise.all(promises)
      .then((repliesWithUserData) => setUserdata(repliesWithUserData))
      .catch((error) => console.error("Error fetching user details:", error));
  }

  async function sendReplyRequest() {
    try {
      const response = await fetch(`${base}/post/reply/${id}/${data?._id}`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({ text: replyText }),
      });

      const newReply = await response.json();
      if (newReply.error) {
        console.error("Error:", newReply.error);
      } else {
        const updatedReplies = [...replies, newReply];
        setReplies(updatedReplies);
        fetchReplyUserDetails(updatedReplies);
        setReplyText("");
        setReply(false);
        setShowReplies(true);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  }

  function deleteComment() {
    let confirmation = confirm("Are you sure you want to delete this comment?");
    if (confirmation) {
      fetch(`${base}/post/remove-comment/${id}`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({ comment: data?.text }),
      })
        .then((res) => res.json())
        .then(() => setHide(true))
        .catch((error) => console.error("Error deleting comment:", error));
    }
  }

  function deleteOtherComment() {
    let confirmation = confirm("sure you want to delete this comment?");
    if (confirmation) {
      fetch(`${base}/post/remove-other-comment/${id}`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({ comment: data?.text }),
      })
        .then((res) => res.json())
        .then(() => setHide(true))
        .catch((error) => console.error("Error deleting comment:", error));
    }
  }

  useEffect(() => {
    setDate(moment(data?.date).fromNow());
  }, []);

  return (
    <div className={`${hide && "hidden"} relative`}>
      {options && (
        <div
          className="border bg-white absolute right-4 shadow top-14 "
          style={{ borderRadius: 6 + "px" }}
        >
          <>
            {data?.user?._id === my?._id ? (
              <div
                onClick={deleteComment}
                className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-xs p-2 border-b"
              >
                <BsTrash /> Delete
              </div>
            ) : (
              check && (
                <div
                  onClick={deleteOtherComment}
                  className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-xs p-2 border-b"
                >
                  <BsTrash /> Delete
                </div>
              )
            )}
          </>
          <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-xs p-2">
            <BsExclamationCircle /> Report
          </div>
        </div>
      )}
      <div className="py-2 px-2 mb-3 max-sm:px-2">
        <div className="flex justify-between ">
          <img
              src={user?.profile_url ? user?.profile_url : avatar}
              className="size-10 rounded-full mr-2"
              alt=""
            />
          <div className={`flex gap-3 w-[100%] bg-[#f4f6fc] p-3 `} style={{ borderRadius: 6 + "px" }}
        >
            <div className="w-full  ">
              <div className="text-sm max-sm:text-xs">{user?.name}</div>
              <div className="text-xs text-gray-500">
                {user?.city}, {user?.state}, {user?.country}
              </div>
              <div className="text-xs text-gray-500">{user?.category}</div>
              <div className="text-xs mt-2">{data?.text}</div>
            </div>
            <div className="max-sm:text-xxs text-xs text-gray-500 absolute right-6 top-5">
            {date}
          </div>
          <BsThreeDots
            onClick={() => setOptions(!options)}
            className="cursor-pointer max-sm:text-xs mt-5 mr-1 text-gray-600"
          />
          </div>
          
        </div>
        <div className="flex items-center gap-12 max-sm:gap-8 my-3 mx-10 px-5 max-sm:px-2">
          {liked ? (
            <div
              onClick={removeLike}
              className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1.5"
            >
              <BsHeartFill size={18} className="text-red-500" />
              <div className="text-xs max-sm:text-[11px]">
                {likeVal}
              </div>
            </div>
          ) : (
            <div
              onClick={addLike}
              className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1"
            >
              <BsHeart size={18} />
              <div className="text-xs max-sm:text-[11px]">
                {likeVal}
              </div>
            </div>
          )}
          <div
            className="text-xs text-gray-500 cursor-pointer"
            onClick={() => setReply(!reply)}
          >
            Reply
          </div>
          <div
            className="text-xs text-gray-500 cursor-pointer"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? "Hide replies" : "See replies"} ({replies.length})
          </div>
        </div>
        {reply && (
          <div className="mt-3 ml-12 flex gap-3 items-center">
            <input
              type="text"
              placeholder="Reply to this comment"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className={`outline-none text-sm px-3 py-1.5 border rounded-full w-full max-sm:text-xs ${replyText ? 'max-sm:w-[86%]' : 'w-full'}`}
            />
            {replyText && (
              <button
                className="text-white bg-blue-500 p-2 rounded-full max-sm:absolute max-sm:right-2"
                onClick={sendReplyRequest}
              >
                <FaPaperPlane size={16} />
              </button>
            )}
          </div>
        )}
        {showReplies &&
          userdata.slice().reverse().map((userData, index) => (
          <ReplyCard key={index} reply={replies[replies.length - 1 - index]} user={userData.user} />
        ))}
      </div>
    </div>
  );
};

export default CommentCard;
