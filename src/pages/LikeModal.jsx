import React from "react";
import { BsX } from "react-icons/bs";
import PeopleCard from "@/components/PeopleCard";

const LikeModal = ({ isOpen, onClose, likes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md shadow-md max-w-sm w-full max-sm:mx-2" style={{ borderRadius: "10px" }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">People who liked this post</h2>
          <BsX size={24} onClick={onClose} className="cursor-pointer" />
        </div>
        <div>
          {likes.length > 0 ? (
            likes.map((user, index) => (
              <PeopleCard key={index} data={user} />
            ))
          ) : (
            <div>No likes yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeModal;

