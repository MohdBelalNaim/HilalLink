import CompactSidebar from "@/components/CompactSidebar";
import React from "react";
import {
  BsChat,
  BsPersonAdd,
  BsPersonCheck,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";

const NewProfile = () => {
  return (
    <div>
      <div className="w-[min(560px,100%)] mx-auto bg-white">
        <div className="h-[200px] max-sm:h-[160px] relative">
          <img
            src="https://pbs.twimg.com/profile_images/1717806521407684608/X4JYECRE_400x400.jpg"
            className="size-[120px] max-sm:size-[100px] max-sm:-bottom-10 absolute rounded-full -bottom-14 left-[50%] -translate-x-[50%]"
            alt=""
          />
          <img
            src="https://picsum.photos/1400"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="pt-16 max-sm:pt-14 pb-5 border-b">
          <div className="text-2xl text-center max-sm:text-lg">Sajad Khaki</div>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-1 max-sm:text-xs">
            <FaLocationPin className="text-xs" /> Poonch, Jammu Kashmir, India
          </div>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-1 max-sm:text-xs">
            Digital Creator
          </div>

          <div className="text-sm px-8 mt-5 max-sm:px-4 max-sm:text-xs">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
            aspernatur a aliquam, numquam adipisci veritatis, itaque
            exercitationem repudiandae, illum provident perferendis tempore
            commodi
          </div>

          <div className="flex justify-center gap-12 mt-6 max-sm:gap-8">
            <div className="text-center">
              <div className="text-sm max-sm:text-xs font-bold">100</div>
              <div className="text-sm max-sm:text-xs text-gray-600">
                Followers
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm max-sm:text-xs font-bold">204</div>
              <div className="text-sm max-sm:text-xs text-gray-600">
                Following
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm max-sm:text-xs font-bold">408</div>
              <div className="text-sm max-sm:text-xs text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-sm max-sm:text-xs font-bold">100.8K</div>
              <div className="text-sm max-sm:text-xs text-gray-600">Likes</div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-12 mt-6 max-sm:gap-6 relative">
            <button
              className="max-sm:text-xs max-sm:px-2 max-sm:py-1.5 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
              style={{ borderRadius: 6 + "px" }}
            >
              <BsPersonCheck className="text-xl" /> Following
            </button>
            <button
              className="max-sm:text-xs max-sm:px-2 max-sm:py-2 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2 text-sm"
              style={{ borderRadius: 6 + "px" }}
            >
              <BsChat /> Message
            </button>
            <button
              className="max-sm:text-xs max-sm:px-2 max-sm:py-2.5 flex items-center gap-2 bg-[#2196f3] text-white px-4 py-2.5 text-sm"
              style={{ borderRadius: 6 + "px" }}
            >
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
        <div className="flex text-sm gap-4 max-sm:text-xs">
          <div className="px-2 py-3 pl-4 border-b-4 border-[#2196f3]">Home</div>
          <div className="px-2 py-3">Images</div>
          <div className="px-2 py-3">Videos</div>
          <div className="px-2 py-3">Activities</div>
        </div>
      </div>
    </div>
  );
};

export default NewProfile;