import React from "react";
import {
  BsBell,
  BsChatDots,
  BsHeart,
  BsKey,
  BsSearch,
  BsShield,
  BsTag,
  BsTrash,
  BsPower
} from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeMenu } from "../../redux/settingsSlice";
import { useNavigate } from "react-router-dom";
import Minibar from "./Minibar";
import Home from "../Sidebar/Home"

const Settings = ({notifications}) => {

  const navigate = useNavigate()

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  const menu = [
    {
      title: "Private account",
      icon: <BsShield />,
      action: "privacy",
    },
    {
      title: "Change password",
      icon: <BsKey />,
      action: "password",
    },
    {
      title: "Blocked accounts",
      icon: <MdBlock />,
      action: "blocked",
    },
    {
      title: "Notifications",
      icon: <BsBell />,
      action: "notification",
    },
    {
      title: "Who can message you",
      icon: <BsChatDots />,
      action: "messages",
    },
    {
      title: "Likes, Replies and Reposts",
      icon: <BsHeart />,
      action: "activity",
    },
    {
      title: "Tags and Mentions",
      icon: <BsTag />,
      action: "tag",
    },
    {
      title: "Delete account",
      icon: <BsTrash />,
      action: "delete",
    },
  ];

  const dispatch = useDispatch();
  const current = useSelector((state) => state.settingSlice.current);
  return (
    <div className="border-r h-[100vh] flex bg-white">
      <div className="w-[260px]">
        <Home notifications={notifications}/>
      </div>
      <div className="w-[300px] pt-5 border-l">
        {menu.map((item) => {
          return (
            <div
              onClick={() => dispatch(changeMenu(item.action))}
              className="flex items-center py-4 gap-2 px-6 hover:bg-gray-200 cursor-pointer rounded-md"
            >
              {item.icon} {item.title}
            </div>
          );
        })}
        <div
              onClick={() => logout()}
              className="flex items-center gap-2 py-4 px-6 hover:bg-gray-200 cursor-pointer rounded-md"
            >
              <BsPower/> Logout
            </div>
      </div>
    </div>

  );
};

export default Settings;
