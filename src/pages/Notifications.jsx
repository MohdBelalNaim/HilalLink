import React, { useEffect, useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import avatar from "../assets/images/avatar.jpeg"
import { Link } from "react-router-dom";
import RequestCard from "@/components/Sidebar/RequestCard";

const Notifications = () => {
  const base = useSelector((state) => state.userSlice.base_url);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState(null);
  const types = {
    Like: "liked your post",
    comment: "commented on your post",
    repost: "reposted your post",
    following: "started following you",
    requested: "requested to follow you",
    accepted: "accepted your follow request",
  };

  const fetchNotifications = () => {
    fetch(`${base}/notification/my`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setNotifications(data.data);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = filter
    ? notifications.filter((item) => item.type === filter)
    : notifications;

  const handleFilterToggle = () => {
    if (filter === "requested") {
      setFilter(null);
    } else {
      setFilter("requested");
    }
  };

  return (
    <div className="w-full overflow-scroll animate__animated animate__fadeIn bg-white h-[100vh]">
      <div className="text-lg p-4 font-bold">Notifications</div>
      <div
        className="flex justify-between px-4 items-center border-b pb-4 cursor-pointer"
        onClick={handleFilterToggle}
      >
        <div className="flex text-[16px] items-center gap-3 font-bold">
          <BsPersonAdd size={32} />
          Follow Requests
        </div>
        <div>
          <FaAngleRight />
        </div>
      </div>
      <div className="p-5 max-sm:px-2 max-sm:py-2">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item, index) => {
            console.log(item);
            return item.type === "requested" ? (
              <RequestCard
                key={index}
                data={item}
                refreshNotifications={fetchNotifications} 
              />
            ) : (
              <Link
                to={
                  ["Like", "comment", "repost"].includes(item.type)
                    ? `/post-details/${item?.content?._id}`
                    : `/profile/${item?.from?._id}`
                }
                key={index}
              >
                <div className="flex justify-between mb-6 gap-1">
                  <div className="flex items-center text-sm gap-2">
                    <img
                      src={item?.from?.profile_url || avatar}
                      className="size-10 rounded-full"
                      alt=""
                    />
                    <div>
                      <span className="font-bold">{item?.from?.name}</span>{" "}
                      <span className="text-sm max-sm:text-xs">{types[item?.type]}</span>
                    </div>
                  </div>
                  {item?.content?.asset_url && (
                    <img
                      src={item?.content?.asset_url}
                      className="size-10 rounded-md"
                      alt=""
                    />
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center grid place-items-center h-[calc(100vh-300px)] font-bold text-gray-500 text-lg">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;