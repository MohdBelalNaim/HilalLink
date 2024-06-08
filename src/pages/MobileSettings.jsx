import React from "react";
import {
  BsBell,
  BsChatDots,
  BsHeart,
  BsKey,
  BsShield,
  BsTag,
  BsTrash,
} from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { Link } from "react-router-dom";

const MobileSettings = () => {
  const menu = [
    {
      title: "Private account",
      icon: <BsShield />,
      action: "privacy",
      link: "/mobile/account-privacy",
    },
    {
      title: "Change password",
      icon: <BsKey />,
      action: "password",
      link: "/mobile/change-password",
    },
    {
      title: "Blocked accounts",
      icon: <MdBlock />,
      link: "/mobile/blocked",
      action: "blocked",
    },
    {
      title: "Notifications",
      icon: <BsBell />,
      action: "notification",
      link: "/mobile/notifications",
    },
    {
      title: "Who can message you",
      icon: <BsChatDots />,
      action: "messages",
      link: "/mobile/message-privacy",
    },
    {
      title: "Likes, Replies and Reposts",
      icon: <BsHeart />,
      action: "activity",
      link: "/mobile/activity",
    },
    {
      title: "Tags and Mentions",
      icon: <BsTag />,
      action: "tag",
      link: "/mobile/tags",
    },
    {
      title: "Delete account",
      icon: <BsTrash />,
      action: "delete",
      link: "/mobile/delete",
    },
  ];
  return (
    <div className="h-[100dvh] bg-white">
      <div className="p-2 text-lg font-bold border-t pt-6">
        Profile and privacy settings
      </div>
      {menu.map((item, index) => {
        return (
          <Link to={item.link}>
            <div
              className={`flex bg-white items-center px-4 py-5  gap-3 border-b text-sm`}
            >
              {" "}
              {item.icon} {item.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileSettings;
