import React, { useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.jpeg";
import { toast } from "sonner";
import notify from "../../../utils/sendNotification";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const RequestCard = ({ data, refreshNotifications }) => {
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [confirmload, setConfrimLoad] = useState(false);
  const [deleteload, setDeleteLoad] = useState(false);

  const confirmRequest = (id) => {
    setConfrimLoad(true);
    fetch(`${base}/user/PrivateId-accept-follow-request/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
          setConfrimLoad(false);
        } else {
          notify(id, "accepted", my?._id, base);
          refreshNotifications();
          setConfrimLoad(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      })
  };

  const deleteRequest = (id) => {
    setDeleteLoad(true);
    fetch(`${base}/user/delete-request/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
          setDeleteLoad(false)
        } else {
          refreshNotifications();
          setDeleteLoad(false)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      })
  };

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex gap-2 items-center">
        <Link to={`/profile/${data?.from?._id}`}>
          <div className="bg-white rounded-full">
            <img
              src={data?.from?.profile_url ? data?.from?.profile_url : avatar}
              className="size-11 rounded-full max-sm:size-10 border"
              alt=""
            />
          </div>
        </Link>
        <div>
          <div className="font-bold">
            {data?.from?.name?.length > 20
              ? data?.from?.name.substring(0, 20) + "..."
              : data?.from?.name}
          </div>
          <div className="text-sm max-sm:text-xs">requested to follow you</div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => confirmRequest(data?.from?._id)}
          className="text-xs border px-3 rounded-full py-1.5 bg-blue-500 text-white max-sm:px-2 max-sm:py-1"
          disabled={confirmload}
        >
          {confirmload ? <TailSpin height={20} width={30} color="white" /> : "Confirm"}
        </button>
        <button
          onClick={() => deleteRequest(data?.from?._id)}
          className="text-xs border px-4 rounded-full py-1.5 bg-red-500 text-white max-sm:px-2 max-sm:py-1"
          disabled={deleteload}
        >
          {deleteload ? <TailSpin height={20} width={30} color="white" /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
