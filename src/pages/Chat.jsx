import React, { useEffect, useMemo, useRef, useState } from "react";
import CompactSidebar from "../components/CompactSidebar";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import { io } from "socket.io-client";
import { FaPaperPlane, FaExclamationCircle, FaUndoAlt} from "react-icons/fa";
import ChatModal from "@/modal/Chatmodal";
import { BsThreeDotsVertical, BsX } from "react-icons/bs";
import { toast } from "sonner";

const Chat = () => {
  const { id } = useParams();
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionsIndex, setOptionsIndex] = useState(null); 
  const navigate = useNavigate()

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
    setOptionsIndex(null);
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
        else{
          messageget()
        }
      });
  }
  
  useEffect(() => {
    messageget()
    getCurrentUser();
  }, []);

  function messageget(){
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
    }

  const confirm = () => {
    setIsModalOpen(true);
  };

  const leaveConversation = () => {
    setIsModalOpen(false)
  }

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOptionsIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  function deleteMessage(messageId) {
    fetch(`${base}/message/delete/${messageId}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log("An error occurred while deleting the message", err);
      });
  }

  const report = () =>{
    // alert(currentUser?._id)
    // navigate(`/report-user/${currentUser?._id}`)
  }

  return (
    <>
      <div className="w-[min(560px,100%)] mx-auto">
        <div class="flex h-screen flex-col bg-white">
          <div class="flex border-b items-center gap-2 p-3 relative">
            <img
              src={currentUser?.profile_url || avatar}
              className="size-12 rounded-full border"
              alt=""
            />
            <div className="font-medium">{currentUser?.name}</div>
            <div className="absolute right-5" onClick={confirm}><FaExclamationCircle size={20}/></div>
          </div>
          <div class="flex-grow overflow-y-auto">
            <div class="flex flex-col space-y-2 p-4">
              
              {messages.map((item, index) => {
                return item.from == my?._id ? (
                  <div className="flex items-center self-end relative group" key={index}>
                    {optionsIndex === index && (
                      <div className="border rounded-md overflow-hidden mt-2" style={{ borderRadius: "10px" }} ref={menuRef}>
                        <div className="text-xs px-3 py-1 border-b flex items-center cursor-pointer hover:bg-gray-200" onClick={() => deleteMessage(item._id)}>
                          <FaUndoAlt size={12} className="mr-2" /> Unsend
                        </div>
                        <div
                          onClick={() => setOptionsIndex(null)}
                          className="text-xs px-3 py-1 flex items-center gap-3 cursor-pointer hover:bg-gray-200"
                        >
                          <BsX size={18} /> Close
                        </div>
                      </div>
                    )}
                    <button ref={buttonRef} className="hidden group-hover:block">
                      <BsThreeDotsVertical onClick={() => setOptionsIndex(index)} />
                    </button>
                    <p className="rounded-xl rounded-tr text-white bg-blue-500 py-2 px-3 ml-2">{item?.content}</p>
                  </div>
              ) : (
                  <div className="flex items-center self-start relative group" key={index}>
                    <div class="rounded-xl rounded-tl bg-gray-300 py-2 px-3" key={index}>
                      <p>{item?.content}</p>
                    </div>
                     <button ref={buttonRef} className="hidden group-hover:block">
                      <BsThreeDotsVertical onClick={() => setOptionsIndex(index)} />
                    </button>
                    {optionsIndex === index && (
                      <div className="border rounded-md overflow-hidden mt-2" style={{ borderRadius: "10px" }} ref={menuRef}>
                        <div className="text-xs px-3 py-1 border-b flex items-center cursor-pointer hover:bg-gray-200"  onClick={() => navigate(`/report-message/${item._id}`)}>
                          <FaExclamationCircle size={12} className="mr-2" /> Report
                        </div>
                        <div
                          onClick={() => setOptionsIndex(null)}
                          className="text-xs px-3 py-1 flex items-center gap-3 cursor-pointer hover:bg-gray-200"
                        >
                          <BsX size={18} /> Close
                        </div>
                      </div>
                    )}
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
        <ChatModal
        isOpen={isModalOpen}
        user={currentUser} 
        leaveConversation={leaveConversation}
        report={report}
      />
      </div>
    </>
  );
};

export default Chat;


             



