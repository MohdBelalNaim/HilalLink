import React, { useState } from "react";
import {
  BsBookmark,
  BsChat,
  BsExclamation,
  BsExclamationCircle,
  BsEye,
  BsHeart,
  BsLink,
  BsPerson,
  BsPlay,
  BsPlayFill,
  BsRepeat,
  BsShare,
  BsThreeDots,
  BsX,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { showDetails } from "../redux/toggleSlice";
import { Link } from "react-router-dom";

const VideoCard = ({ index }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState(false);
  return (
    <>
      <div className="rounded-md overflow-hidden mb-5 relative">
        {options && (
          <div className="bg-white absolute text-sm border shadow rounded-md right-2 top-14">
            <div className="py-1.5 px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
              <BsBookmark /> Save post
            </div>
            <div className="py-1.5 px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
              <BsLink /> Copy link
            </div>
            <div className="py-1.5 px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
              <BsExclamationCircle /> Report
            </div>
            <div className="py-1.5 px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
              <BsPerson /> Follow user
            </div>
            <div
              onClick={() => setOptions(!options)}
              className="py-1.5 px-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
            >
              <BsX /> Close
            </div>
          </div>
        )}
        <div className="flex justify-between bg-white p-3">
          <Link to="/profile">
            <div className="flex gap-3">
              <img
                src={`https://picsum.photos/400?${index}`}
                className="size-12 max-sm:size-10 rounded-full"
                alt=""
              />
              <div>
                <div className="text-sm max-sm:text-xs font-bold">
                  Islamic Society of Comput...
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  Lucknow, Uttar Pradesh, India
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  A Non-Profit organisation
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
        <div className="relative grid place-items-center">
          <video
            controls
            src="https://videos.pexels.com/video-files/1321208/1321208-uhd_3840_2160_30fps.mp4"
          ></video>
        </div>
        <div className="bg-white flex p-3 justify-between">
          <div className="flex gap-8 max-sm:gap-4">
            <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
              <BsHeart />

              <div className="text-xs max-sm:text-[10px]">12.3K</div>
            </div>

            <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
              <BsChat />

              <div className="text-xs max-sm:text-[10px]">48.8K</div>
            </div>
            <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
              <BsRepeat />

              <div className="text-xs max-sm:text-[10px]">4.5M</div>
            </div>
            <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
              <BsEye />

              <div className="text-xs max-sm:text-[10px]">1.5M</div>
            </div>
          </div>

          <BsShare className="max-sm:text-xs" />
        </div>
      </div>
    </>
  );
};

export default VideoCard;
