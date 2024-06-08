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
  BsRepeat,
  BsShare,
  BsThreeDots,
  BsX,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { showDetails } from "../redux/toggleSlice";
import { Link } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PiPaperPlaneRight } from "react-icons/pi";

const PostCard = ({ index, text }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState(false);
  return (
    <>
      <div
        className="rounded-md overflow-hidden mb-5 relative max-sm:mb-2"
        style={{ borderRadius: 10 + "px" }}
      >
        {options && (
          <div
            className="bg-white absolute text-sm border shadow rounded-md right-2 top-14"
            style={{ borderRadius: 10 + "px" }}
          >
            <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
              <BsBookmark /> Save post
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
        <div className="bg-white text-sm pb-2 px-4">{text}</div>
        <div className="text-sm bg-white px-3 pb-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui voluptatibus placeat ut ipsum sit obcaecati delectus quis repellendus sapiente sint dolore deserunt sed repudiandae quos, impedit nobis doloremque officia! Deserunt.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, quasi rerum? Veniam id eaque aperiam recusandae cum tenetur eligendi delectus qui exercitationem minima? Dignissimos, laudantium ab officia natus animi veniam....
            <span className="primary">Read more</span>
        </div>
        <Drawer>
          <DrawerContent className="bg-white h-[500px]">
            <DrawerTitle>
              <div className="text-sm w-full text-center pb-4">Comments</div>
            </DrawerTitle>

            <div className="flex flex-col justify-between h-full">
              <div className="overflow-scroll">
                {"abcdefg".split("").map((item, index) => {
                  return (
                    <div className="w-full mb-4 px-3">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <img
                          src="https://picsum.photos/400"
                          className="size-6 rounded-full"
                          alt=""
                        />
                        Mohd Belal Naim
                      </div>
                      <div className="text-xs mb-2 text-left mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Distinctio sint asperiores officia dolores ullam quia
                        officiis rerum ad
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
                  );
                })}
              </div>
              <div className="h-36"></div>
              <div className="bg-white fixed bottom-0 flex px-4 py-1 items-center w-full border-t">
                <input
                  type="text"
                  placeholder="Comment"
                  className="w-full text-sm outline-none"
                />
                <button className="bg-primary p-1 rounded-full">
                  <PiPaperPlaneRight size={22} />
                </button>
              </div>
            </div>
          </DrawerContent>

          <div className="bg-white flex p-3 justify-between">
            <div className="flex gap-8 max-sm:gap-4">
              <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                <BsHeart />

                <div className="text-xs max-sm:text-[10px]">12.3K</div>
              </div>
              <DrawerTrigger>
                <div className="hidden max-sm:flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                  <BsChat />

                  <div className="text-xs max-sm:text-[10px]">48.8K</div>
                </div>
              </DrawerTrigger>
              <div className="max-sm:hidden flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
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
        </Drawer>
      </div>
    </>
  );
};

export default PostCard;
