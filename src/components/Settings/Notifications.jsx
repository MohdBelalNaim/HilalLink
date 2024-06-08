import React from "react";

const Notifications = () => {
  return (
    <div className="h-[100dvh] py-12 max-sm:px-4">
      <div className="text-xl font-bold">Notifications settings</div>
      <div className="text-gray-600 mt-2">
        Manage the notifications setting for your account, Select the types of
        notifications that you want to receive reegarding your followers, media
        and other activities
      </div>

      <div className="mt-5 grid gap-y-4">
        <div className="flex gap-2 items-center">
          <input type="checkbox" name="" id="" />
          Push notifications
        </div>
        <div className="flex gap-2 items-center">
          <input type="checkbox" name="" id="" />
          Email notifications
        </div>
        <button className="w-max bg-black text-sm px-4 py-1.5 mt-4 text-white rounded-full">
          Update
        </button>
      </div>
    </div>
  );
};

export default Notifications;
