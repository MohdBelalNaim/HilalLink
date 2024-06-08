import React from "react";

const CommunityCard = ({ index }) => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-2 items-center">
        <img
          src={`https://picsum.photos/400?${index}`}
          className="size-12 rounded-full"
          alt=""
        />
        <div>
          <div className="text-sm font-medium">Hadith of the day</div>
          <div className="text-xs text-gray-500">25.5K members</div>
        </div>
      </div>
      <div>
        <button className="text-xs border px-4 rounded-full py-1.5">
          Join
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;
