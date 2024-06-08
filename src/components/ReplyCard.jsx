import React from "react";
import avatar from "../assets/images/avatar.jpeg";

const ReplyCard = ({ reply, user }) => {

  return (
    <div className="ml-10 text-xs my-5">
      <div className="flex gap-3 w-[80%]">
        <img
          src={user?.profile_url ? user?.profile_url : avatar}
          className="size-10 rounded-full"
          alt=""
        />
        <div className="w-full">
          <div className="text-sm max-sm:text-xs">{user?.name}</div>
          <div>{reply?.text}</div>
        </div>
      </div>
    </div>
  );

};

export default ReplyCard;
