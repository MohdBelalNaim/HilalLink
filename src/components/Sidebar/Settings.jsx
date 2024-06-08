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
    <div className="border-r flex">
      <Minibar notifications={notifications}/>
      <div className=" p-4">
      </div>
      <div className="p-4 w-[320px] grid gap-y-4">
        {menu.map((item) => {
          return (
            <div
              onClick={() => dispatch(changeMenu(item.action))}
              className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer rounded-md"
            >
              {item.icon} {item.title}
            </div>
          );
        })}
        <div
              onClick={() => logout()}
              className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer rounded-md"
            >
              <BsPower/> Logout
            </div>
      </div>
    </div>

  );
};

export default Settings;
