import React from "react";
import { Link } from "react-router-dom";

const OrganzationCard = ({ index }) => {
  return (
    <div className="flex justify-between items-center p-4 max-sm:p-2">
      <Link to="/profile">
        <div className="flex gap-2 items-center">
          <img
            src={`https://picsum.photos/400?${index}`}
            className="size-12 max-sm: rounded-full max-sm:size-10"
            alt=""
          />
          <div>
            <div className="text-xs font-medium max-sm:text-xs">
              Hilal Technologies
            </div>
            <div className="text-xs text-gray-500">Uttar Pradesh, India</div>
            <div className="text-xs text-gray-500">Information Technology</div>
          </div>
        </div>
      </Link>
      <div>
        <button className="text-xs border px-4 rounded-full py-1.5 bg-black text-white max-sm:px-2  max-sm:py-1">
          Follow
        </button>
      </div>
    </div>
  );
};

export default OrganzationCard;
