import React from "react";
import avatar from "../assets/images/avatar.jpeg";
import { useNavigate } from "react-router-dom";

const ChatModal = ({ isOpen, user, leaveConversation, report }) => {
    
  if (!isOpen) return null;
  const navigate = useNavigate()

 return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-4 rounded-md shadow-md max-w-sm w-full max-sm:mx-2" style={{ borderRadius: "10px" }}>
        {user && (
          <div className="flex flex-col items-center">
            <img
              src={user?.profile_url ? user?.profile_url : avatar}
              className="size-20 rounded-full my-1 border"
              alt=""
            />
            <div className="text-center my-2">
              <p className="">
                If you change your mind, you'll have to request to follow <b>{user?.name}</b> again.
              </p>
            </div>
          </div>
        )}
        <div className="border py-2">
          <button
            className="w-full text-blue-500 rounded-md"
          >
            Block @<b>{user?.name}</b>
          </button>
        </div>
        <div className="border py-2 mt-3">
          <button
            className="w-full text-blue-500 rounded-md"
            onClick={report}
          >
            Report @<b>{user?.name}</b>
          </button>
        </div>
        <div className="border py-2 mt-3 ">
          <button
            className="w-full text-red-500 rounded-md" 
            onClick={leaveConversation}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};



export default ChatModal;