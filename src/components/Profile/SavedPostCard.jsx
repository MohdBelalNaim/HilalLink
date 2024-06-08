import React, { useEffect, useState } from "react";
import {
  BsBookmark,
  BsBookmarkX,
  BsChat,
  BsExclamationCircle,
  BsEye,
  BsHeart,
  BsHeartFill,
  BsLink,
  BsPerson,
  BsRepeat,
  BsShare,
  BsThreeDots,
  BsX,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { showDetails } from "../../redux/toggleSlice";
import { Link } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import avatar from "../../assets/images/avatar.jpeg";
import { PiPaperPlaneRight } from "react-icons/pi";

const SavedPostCard = ({ index, data, text, retrieve }) => {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);

  const addComment = () => {
    fetch(`${base}/post/add-comment/${data._id}`, {
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

  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [options, setOptions] = useState(false);
  function getdetails() {
    fetch(`${base}/post/post-by-id/${data?._id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(showDetails(data?.data));
        console.log(data?.data);
        setComment("");
      });
  }
  function addLike() {
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

  function unSavePost() {
    fetch(`${base}/post/remove-save-post/${data?.content._id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOptions(false);
        retrieve();
      })
      .catch((err) => {
        alert("Something went wrong!");
        console.log(err);
      });
  }

  useEffect(() => {
    if (data?.likes?.includes(my?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    console.log("Hemnlo");
  }, []);
  return (
    <>
      <div
        className="rounded-md  mb-5 relative max-sm:mb-2 bg-white"
        style={{ borderRadius: 10 + "px" }}
      >
        {options && (
          <div
            className="bg-white z-[99] absolute text-sm border shadow rounded-md right-2 top-14"
            style={{ borderRadius: 10 + "px" }}
          >
            <div
              onClick={unSavePost}
              className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
            >
              <BsBookmarkX /> Unsave post
            </div>
            <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
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
            <div
              onClick={() => setOptions(!options)}
              className="py-1.5 max-sm:text-xs px-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
            >
              <BsX /> Close
            </div>
          </div>
        )}

        <div
          className="flex justify-between bg-white p-3"
          style={{ borderRadius: 8 + "px" }}
        >
          <Link to={`/profile/${data?.user?._id}`}>
            <div className="flex gap-3">
              <img
                src={data?.user?.profile_url ? data?.user?.profile_url : avatar}
                className="size-12 max-sm:size-10 rounded-full"
                alt=""
              />
              <div>
                <div className="text-sm max-sm:text-xs font-bold">
                  {data?.user?.name}
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  {data?.user?.city}, {data?.user?.state}, {data?.user?.country}
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  {data?.user?.category}
                </div>
              </div>
            </div>
          </Link>
          <div className="flex text-xs items-center gap-3 text-gray-500">
            {/* 6 Jan 2022{" "} */}
            <span className="font-normal text-gray-600 text-xs">2d </span>
            <BsThreeDots
              onClick={() => setOptions(!options)}
              className="cursor-pointer max-sm:text-xs"
            />
          </div>
        </div>

        {data?.content?.text && (
          <div className="bg-white text-sm pb-2 px-4">{data?.content.text}</div>
        )}

        {data?.content?.asset_url && (
          <img
            onClick={() => {
              dispatch(showDetails(data?.content));
            }}
            src={data?.content?.asset_url}
            className="w-full max-sm:h-[300px] h-[360px] object-cover cursor-pointer"
            alt=""
          />
        )}

        <Drawer>
          <DrawerContent className="bg-white h-[500px]">
            <DrawerTitle>
              <div className="text-sm w-full text-center pb-4">Comments</div>
            </DrawerTitle>

            <div className="flex flex-col justify-between h-full">
              <div className="overflow-scroll">
                {data?.comments?.map((item, index) => {
                  return (
                    <div className="w-full mb-4 px-3">
                      <div className="flex items-start gap-3  text-sm">
                        <img
                          src={
                            data?.user?.profile_url
                              ? data?.user?.profile_url
                              : avatar
                          }
                          className="size-6 rounded-full"
                          alt=""
                        />
                        <div>
                          <div className="font-bold">{item?.user?.name}</div>
                          <div className="text-xs mb-2 text-left mt-1">
                            {item?.text}
                          </div>
                          <div className="flex gap-4 mt-">
                            <div className="flex items-center text-xs gap-1 text-gray-500">
                              <BsHeart />
                              25
                            </div>
                            <div className="flex items-center text-xs gap-1 text-gray-500">
                              <BsChat />
                              Reply
                            </div>
                            <div className="flex items-center text-xs gap-1 text-gray-500">
                              See replies
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="h-36"></div>
              <div className="bg-white fixed bottom-0 flex px-4 py-1 items-center w-full border-t">
                <input
                  type="text"
                  placeholder="Comment"
                  className="w-full text-sm outline-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={addComment}
                  className="bg-primary p-1 rounded-full"
                >
                  <PiPaperPlaneRight size={22} />
                </button>
              </div>
            </div>
          </DrawerContent>

          <div className="bg-white flex p-3 justify-between card-bottom">
            <div className="flex gap-8 max-sm:gap-6">
              {liked ? (
                <div
                  onClick={removeLike}
                  className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1"
                >
                  <BsHeartFill size={18} className="text-red-500" />

                  <div className="text-xs max-sm:text-[11px]">
                    {data?.content?.likes?.length}
                  </div>
                </div>
              ) : (
                <div
                  onClick={addLike}
                  className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1"
                >
                  <BsHeart size={18} />

                  <div className="text-xs max-sm:text-[11px]">
                    {data?.content?.likes?.length}
                  </div>
                </div>
              )}

              <div className="comment-mobile">
                <DrawerTrigger>
                  <div className="hidden max-sm:flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                    <BsChat size={18} />

                    <div className="text-xs max-sm:text-[11px]">
                      {data?.comments?.length}
                    </div>
                  </div>
                </DrawerTrigger>
              </div>
              <div className="max-sm:hidden flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                <BsChat size={18} />

                <div className="text-xs max-sm:text-[10px]">
                  {data?.content?.comments?.length}
                </div>
              </div>
              <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                <BsRepeat size={18} />

                <div className="text-xs max-sm:text-[11px]">0</div>
              </div>
              <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                <BsEye size={18} />

                <div className="text-xs max-sm:text-[11px]">{data?.views}</div>
              </div>
            </div>

            <BsShare className="max-sm:text-xs" />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default SavedPostCard;
