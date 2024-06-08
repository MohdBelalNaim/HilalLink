import React from "react";

const MessagePrivacy = () => {
  return (
    <div className="h-[100dvh] py-12 max-sm:px-4">
      <div className="text-xl font-bold">Who can message you?</div>
      <div className="text-gray-600 mt-2">
        Manage the message setting for your account, Select the types of
        audience that you want to receive messages from.
      </div>

      <div className="mt-5 grid gap-y-4">
        <label className="flex gap-2 items-center cursor-pointer">
          <input type="radio" name="message" id="" />
          Everyone on HilalLink
        </label>
        <label className="flex gap-2 items-center cursor-pointer">
          <input type="radio" name="message" id="" />
          My Followers
        </label>
        <label className="flex gap-2 items-center cursor-pointer">
          <input type="radio" name="message" id="" />
          No one
        </label>
        <button className="w-max bg-black text-sm px-4 py-1.5 mt-4 text-white rounded-full">
          Update
        </button>
      </div>
    </div>
  );
};

export default MessagePrivacy;
