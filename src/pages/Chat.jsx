import React, { useEffect, useMemo, useRef, useState } from "react";
import CompactSidebar from "../components/CompactSidebar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import { io } from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const { id } = useParams();
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [messages, setMessages] = useState([]);

  const divRef = useRef(null);
  const scrollToElement = () => {
    const { current } = divRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const socket =  io(base);
 
  useEffect(scrollToElement, [messages]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("add-user", id);
    });
    socket.on("msg-recieve", (msg) => {
      console.log(JSON.stringify(msg));
      let newMessage = {
        content: msg.message,
        from: msg.from,
        to: msg.to,
      };
      console.log(messages);
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function getCurrentUser() {
    fetch(`${base}/user/by-id/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }

  function sendMessage() {
    setText("");
    let newMessage = {
      content: text,
      from: my?._id,
      to: id,
    };

    socket.emit("send-msg", {
      to: id,
      from: my?._id,
      message: text,
    });
    setMessages([...messages, newMessage]);
    fetch(`${base}/message/send/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.er);
        }
      });
  }
  useEffect(() => {
    fetch(`${base}/message/by-chat/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.found) setMessages(data.found);
      });
    getCurrentUser();
  }, []);

  return (
    <>
      <div className="w-[min(560px,100%)] mx-auto">
        <div class="flex h-screen flex-col bg-white">
          <div class="flex border-b items-center gap-2 p-3">
            <img
              src={currentUser?.profile_url || avatar}
              className="size-12 rounded-full border"
              alt=""
            />
            <div className="font-medium">{currentUser?.name}</div>
          </div>
          <div class="flex-grow overflow-y-auto">
            <div class="flex flex-col space-y-2 p-4">
              {messages.map((item) => {
                return item.from == my?._id ? (
                  <div class="flex items-center self-end rounded-xl rounded-tr bg-blue-500 py-2 px-3 text-white">
                    <p>{item?.content}</p>
                  </div>
                ) : (
                  <div class="flex items-center self-start rounded-xl rounded-tl bg-gray-300 py-2 px-3">
                    <p>{item?.content}</p>
                  </div>
                );
              })}
              <div id="show-content" ref={divRef}></div>
            </div>
          </div>
          <div class="flex items-center p-4 border-t gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              class="w-full rounded-full text-sm border border-gray-300 px-4 py-2.5"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={sendMessage}
              class="rounded-full bg-blue-500 p-3 text-white"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

             



