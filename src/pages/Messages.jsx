import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import CompactSidebar from "@/components/CompactSidebar";


export const Messages = () => {
  const base = useSelector((state) => state.userSlice.base_url);
  const [conversations, setConversations] = useState([]);
  const my = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (base && my) {
      getUserConversations();
    }
  }, [base, my]);

  function getUserConversations() {
    fetch(`${base}/message/my`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user conversations");
        }
        return res.json();
      })
      .then((data) => {
        const filteredConversations = data.filter(
          (message) =>
            message.from._id === my?._id || message.to._id === my?._id
        );
        const conversationsMap = new Map();
        filteredConversations.forEach((message) => {
          const partnerId =
            message.from._id === my._id ? message.to._id : message.from._id;
          const existingConversation = conversationsMap.get(partnerId);
          if (
            !existingConversation ||
            new Date(message.date) > new Date(existingConversation.date)
          ) {
            conversationsMap.set(partnerId, message);
          }
        });
        setConversations(Array.from(conversationsMap.values()));
      })
      .catch((error) =>
        console.error("Error fetching user conversations:", error)
      );
  }

  return (
    <div>
      <div className="w-[min(560px,96%)] mx-auto ">
        <div className="py-4 text-lg font-bold">Messages</div>
        <div className="bg-white rounded-md">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <Link
                to={`/chat/${
                  conversation.from._id === my?._id
                    ? conversation.to._id
                    : conversation.from._id
                }`}
                key={conversation._id}
              >
                <div className="flex items-center gap-3 p-4 border-b">
                  <img
                    src={
                      conversation.from._id === my._id
                        ? conversation.to.profile_url || avatar
                        : conversation.from.profile_url || avatar
                    }
                    className="h-12 w-12 rounded-full border"
                    alt=""
                  />
                  <div>
                    <div className="text-gray-600 max-sm:text-xs font-bold">
                      {conversation.from._id === my._id
                        ? conversation.to.name
                        : conversation.from.name}
                    </div>
                    <div className="text-gray-600 max-sm:text-xs">
                      {conversation.content}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4">No conversations found.</div>
          )}
        </div>
      </div>
    </div>
  );
};









