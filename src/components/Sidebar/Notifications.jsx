// import React, { useEffect, useState } from "react";
// import { BsPersonAdd, BsX } from "react-icons/bs";
// import { FaAngleRight } from "react-icons/fa6";
// import { useSelector } from "react-redux";
// import avatar from "../../assets/images/avatar.jpeg";
// import { Link, useNavigate } from "react-router-dom";
// import RequestCard from "./RequestCard";

// const Notifications = () => {
//   const base = useSelector((state) => state.userSlice.base_url);
//   const [notifications, setNotifications] = useState([]);
//   const [filter, setFilter] = useState(null);
//   const [showNotification, setShowNotification] = useState(false)

//   const types = {
//     Like: "liked your post",
//     comment: "commented on your post",
//     repost: "reposted your post",
//     following: "started following you",
//     requested: "requested to follow you",
//     accepted: "accepted your follow request",
//   };

//   const fetchNotifications = () => {
//     setShowNotification(true)
//     fetch(`${base}/notification/my`, {
//       method: "POST",
//       headers: {
//         authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched notifications data:", data);
//         setNotifications(data.data);
//       });
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const filteredNotifications = filter
//     ? notifications.filter((item) => item.type === filter)
//     : notifications;

//   const handleFilterToggle = () => {
//     setFilter((prevFilter) => (prevFilter === "requested" ? null : "requested"));
//   };

//   return (
    
//     <div className="flex bg-white">
//       <div className="w-[360px] overflow-scroll animate__animated animate__fadeIn h-[100dvh]">
//         <div className="text-lg p-4 font-bold">Notifications</div>
//         <div
//           className="flex justify-between px-4 items-center border-b pb-4 cursor-pointer"
//           onClick={handleFilterToggle}
//         >
//           <div className="flex text-[16px] items-center gap-3 font-bold">
//             <BsPersonAdd size={32} />
//             Follow Requests
//           </div>
//           <div>
//             <FaAngleRight />
//           </div>
//         </div>
//         <div className="p-4">
//           {filteredNotifications.length > 0 ? (
//             filteredNotifications.map((item, index) => (
//               <React.Fragment key={index}>
//                 {item.type === "requested" ? (
//                   <RequestCard
//                     data={item}
//                     refreshNotifications={fetchNotifications}
//                   />
//                 ) : (
//                   <Link
//                     to={
//                       ["Like", "comment", "repost"].includes(item.type)
//                         ? `/post-details/${item?.content?._id}`
//                         : `/profile/${item?.from?._id}`
//                     }
//                     key={index}
//                   >
//                     <div className="flex justify-between mb-6 gap-3">
//                       <div className="flex items-center text-sm gap-2">
//                         <img
//                           src={item?.from?.profile_url || avatar}
//                           className="size-10 rounded-full"
//                           alt=""
//                         />
//                         <div>
//                           <span className="font-bold">{item?.from?.name}</span>{" "}
//                           {types[item?.type]}
//                         </div>
//                       </div>
//                       {item?.content?.asset_url && (
//                         <img
//                           src={item?.content?.asset_url}
//                           className="size-10 rounded-md"
//                           alt=""
//                         />
//                       )}
//                     </div>
//                   </Link>
//                 )}
//               </React.Fragment>
//             ))
//           ) : (
//             <div className="text-center grid place-items-center h-[calc(100vh-300px)] font-bold text-gray-500 text-lg">
//               No notifications
//             </div>
//           )}
//         </div>
//       </div>
//       <div
//         className="cursor-pointer absolute top-5 right-4 bg-black text-white rounded-full"
//       >
//       <BsX size={22} />
//       </div>
//     </div>

//   );
// };

// export default Notifications;

import React, { useEffect, useState } from "react";
import { BsPersonAdd, BsX } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.jpeg";
import { Link, useNavigate } from "react-router-dom";
import RequestCard from "./RequestCard";

const Notifications = ({ onClose }) => {
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
        console.log("Fetched notifications data:", data);
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
    setFilter((prevFilter) =>
      prevFilter === "requested" ? null : "requested"
    );
  };

  return (
    <div className="flex bg-white">
      <div className="w-[360px] overflow-scroll animate__animated animate__fadeIn h-[100dvh]">
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
        <div className="p-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "requested" ? (
                  <RequestCard
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
                    <div className="flex justify-between mb-6 gap-3">
                      <div className="flex items-center text-sm gap-2">
                        <img
                          src={item?.from?.profile_url || avatar}
                          className="size-10 rounded-full"
                          alt=""
                        />
                        <div>
                          <span className="font-bold">{item?.from?.name}</span>{" "}
                          {types[item?.type]}
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
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center grid place-items-center h-[calc(100vh-300px)] font-bold text-gray-500 text-lg">
              No notifications
            </div>
          )}
        </div>
      </div>
      <div
        className="cursor-pointer absolute top-5 right-4 bg-black text-white rounded-full"
        onClick={onClose}
      >
        <BsX size={22} />
      </div>
    </div>
  );
};

export default Notifications;
