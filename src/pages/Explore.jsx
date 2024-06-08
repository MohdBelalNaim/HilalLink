import React, { useState, useEffect } from "react";
import PeopleCard from "../components/PeopleCard";
import PostCard from "../components/PostCard";
import OrganzationCard from "../components/OrganizationCard";
import { BsArrowLeft, BsSearch, BsSunrise } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import CompactSidebar from "../components/CompactSidebar";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import All from "@/components/Explore/All";
import People from "@/components/Explore/People";
import Organisations from "@/components/Explore/Organisations";
import Posts from "@/components/Explore/Posts";
import Videos from "@/components/Explore/Videos";
import { showAddress } from "@/redux/toggleSlice";
import Address from "./Address";
import { toast } from "sonner";

const Explore = () => {
  const [searchInput, setSearchInput] = useState("");
  const current = useSelector((state) => state.exploreSlice.current);
  const navigate = useNavigate();

  const isCreateAddressVisible = useSelector(
    (state) => state.toggleSlice.createAddress
  );
  
  const dispatch = useDispatch();
  const base = useSelector((state) => state.userSlice.base_url);

  const menu = {
    All: <All />,
    People: <People />,
    Posts: <Posts />,
    Videos: <Videos />,
  };

  function CheckAddress() {
    fetch(`${base}/user/check-empty-fields`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.message === "Address information is mandatory"){
          toast.message(data.message);
          dispatch(showAddress(true));
        } 

      })
      
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`);
  };

  useEffect(() => {
    CheckAddress();
  }, []);

  return (
    <div>
      {isCreateAddressVisible && <Address />}
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

export default Explore;
