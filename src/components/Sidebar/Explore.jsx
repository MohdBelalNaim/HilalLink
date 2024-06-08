import { setMenu } from "@/redux/exploreSlice";
import React, { useState } from "react";
import {
  BsBell,
  BsBookmark,
  BsChatDots,
  BsGear,
  BsHouse,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiMosque } from "react-icons/pi";
import Minibar from "./Minibar";

const Explore = ({notifications}) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`);
  };

  return (
    <div className="flex">
      <Minibar notifications={notifications}/>
      <div className="border-r">
        <div className="border-b p-4">
          <div className="flex items-center gap-2 border px-3 py-1.5 rounded-md">
            <BsSearch />
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="w-full px-2 outline-none text-sm"
                placeholder="Search here..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="p-4 w-[320px] grid gap-y-4">
          <div
            onClick={() => dispatch(setMenu("All"))}
            className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
          >
            All
          </div>
          <div
            onClick={() => dispatch(setMenu("People"))}
            className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
          >
            People
          </div>

          <div
            onClick={() => dispatch(setMenu("Posts"))}
            className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
          >
            Posts
          </div>
          <div
            onClick={() => dispatch(setMenu("Videos"))}
            className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
          >
            Videos
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
