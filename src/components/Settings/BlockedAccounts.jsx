import React from "react";

const BlockedAccounts = () => {
  return (
    <div className="h-[100dvh] py-12 max-sm:px-4">
      <div className="text-xl font-bold">Blocked accounts</div>
      <div className="text-gray-600">
        You can unblock them anytime from their profiles
      </div>
      <div className="grid gap-y-4 mt-5">
        {"abcdegf".split("").map((item, index) => {
          return (
            <div className="bg-white rounded-md p-3.5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src="https://picsum.photos/400"
                  className="size-12 rounded-full"
                />
                <div>
                  <div className="font-medium">Mohd Belal Naim</div>
                  <div className="text-sm text-gray-600">@belalnaim9</div>
                </div>
              </div>
              <button className="bg-primary text-sm px-3 py-1.5 rounded-md">
                Unblock
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlockedAccounts;
