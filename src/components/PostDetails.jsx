import React, { useState } from "react";
import { BsFilter, BsHeart, BsThreeDotsVertical, BsX } from "react-icons/bs";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { hideDetails, showDetails } from "../redux/toggleSlice";
import notify from "../../utils/sendNotification";

const PostDetails = () => {
  const base = useSelector((state) => state.userSlice.base_url);
  const dispatch = useDispatch();
  const details = useSelector((state) => state.toggleSlice.currentPost);
  const [comment, setComment] = useState("");


  const addComment = async () => {
    await notify(details?.user?._id, "comment", details?._id, base);
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
        getdetails();
      });
  };

  function getdetails() {
    fetch(`${base}/post/post-by-id/${details?._id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(showDetails(data?.data));
        setComment("");
      });
  }
  

  return (
    <div className="h-[100dvh] w z-[99] w-full fixed glass grid place-items-center max-sm:hidden">
      <div className="w-[min(1200px,96%)] h-[90dvh] overflow-hidden bg-white rounded-md border shadow flex">
        <div className="w-[50%] bg-black">
          <img
            src={details?.asset_url}
            className="w-full h-full object-contain"
            alt=""
          />
        </div>
        <div className="w-[50%]">
          <div className="flex justify-between p-4 border-b">
            <div className="text-lg font-medium flex gap-2 items-center">
              Comments •{" "}
              <div className="text-[16px]">{details?.comments?.length}</div>
            </div>
            <div className="flex gap-3">
              <div className="bg-gray-200 p-1.5 rounded-full">
                <BsFilter />
              </div>
              <div className="bg-gray-200 p-1.5 rounded-full">
                <BsX
                  className="cursor-pointer"
                  onClick={() => dispatch(hideDetails())}
                />
              </div>
            </div>
          </div>
          <div className="h-[80%] overflow-scroll scrollbar-hide">
            {details?.comments?.length > 0 ? (
              details?.comments.map((item, index) => {
                return <CommentCard  data={item} index={index} />;
                
              })
            ) : (
              <div className="text-xl font-bold text-center py-24 text-gray-500 ">
                {" "}
                No comments yet
              </div>
            )}
          </div>
          <div className="border-t flex justify-center items-center bg-balck">
            <div className="flex px-1.5 pl-4 py-3 border w-full items-center rounded-full ">
              <input
                type="text"
                placeholder="Type comment here"
                className="w-full text-sm outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={() => {
                  addComment();
                }}
                className="bg-primary text-sm px-4 py-2 rounded-full"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
