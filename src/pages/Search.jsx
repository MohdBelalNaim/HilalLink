import React, { useState } from "react";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import CompactSidebar from "../components/CompactSidebar";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import All from "../components/Search/All";
import People from "../components/Search/People";
import Posts from "../components/Search/Posts";
import Videos from "../components/Search/Videos";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const current = useSelector((state) => state.searchSlice.current);
  const navigate = useNavigate();
  
  const menu = {
    All: <All />,
    People: <People />,
    Posts: <Posts />,
    Videos: <Videos />,
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`);
  };

  return (
    <div>

      <div className="hidden max-sm:flex bg-white items-center p-2 gap-3">
        {" "}
        <BsArrowLeft size={22} onClick={() => navigate(-1)} />
        <form
          onSubmit={handleSearchSubmit}
          className="w-full flex place-items-center gap-2"
        >
          <input
            type="text"
            className="w-full p-1.5 outline-none border rounded-full text-sm"
            placeholder="Search here..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button className="bg-blue-500 text-white p-1.5 rounded-full">
              <BsSearch size={16} />
            </button>
          )}
        </form>
      </div>
      <div className="hidden max-sm:sflex shadow bg-white border-t sticky top-0 z-40">
        {Object.keys(menu).map((item, index) => {
          return (
            <div
              onClick={() => setCurrent(item)}
              className={`text-xs p-3 ${item == current && "active-menu"}`}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="w-[min(560px,96%)] mx-auto pt-4">{menu[current]}</div>
    </div>
  );
};

export default Search;
