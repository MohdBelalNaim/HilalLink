import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import { toast } from "sonner";
import notify from "../../utils/sendNotification";
import { TailSpin } from "react-loader-spinner";
import ConfirmationModal from "@/modal/ConfirmationModal";

const PeopleCard = ({ data }) => {
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [status, setStatus] = useState("");
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    if (my?.following?.includes(data?._id)) {
      setStatus("following");
    } else if (data?.followRequests?.includes(my?._id)) {
      setStatus("requested");
    } else {
      setStatus("");
    }
  }, [my, data]);

  function follow(id) {
    setButtonLoad(true);
    fetch(`${base}/user/privateId-request/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
        } else if (result.private) {
          notify(data?._id, "requested", id, base);
          setStatus("requested");
        } else {
          notify(data?._id, "following", id, base);
          setStatus("following");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setButtonLoad(false);
      });
  }

  function unfollow(id) {
    setButtonLoad(true);
    fetch(`${base}/user/unfollow-user/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(() => {
        setStatus("");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setButtonLoad(false);
      });
  }

  function cancelRequest(id) {
    setButtonLoad(true);
    fetch(`${base}/user/cancel-request/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
        } else {
          setStatus("");
          toast.success("Follow request cancelled");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setButtonLoad(false);
      });
  }

  const confirmUnfollow = () => {
    setIsModalOpen(true);
  };

  const handleUnfollowConfirm = () => {
    setIsModalOpen(false);
    unfollow(data?._id);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const isMyProfile = my?._id === data?._id;

  return (
    <div className="flex justify-between items-center p-4 max-sm:p-2" >
      <Link to={`/profile/${data?._id}`}>
        <div className="flex gap-2 items-center">
          <div className="bg-white rounded-full">
            <img
              src={data?.profile_url ? data?.profile_url : avatar}
              className="size-12 rounded-full max-sm:size-10 border"
              alt=""
            />
          </div>
          <div>
            <div className="text-sm font-medium max-sm:text-xs">
              {data?.name?.length > 20 ? data?.name.substring(0, 20) + "..." : data?.name}
            </div>
            <div className="text-xs text-gray-500">
              {data?.city + " ," + data?.state}
            </div>
            <div className="text-xs text-gray-500">{data?.category}</div>
          </div>
        </div>
      </Link>
      <div>
        {!isMyProfile && (
          <>
            {status === "following" ? (
              <button
                onClick={confirmUnfollow}
                className="text-xs border px-4 rounded-full py-1.5 text-black border-black max-sm:px-2 max-sm:py-1 hover:bg-red-500 hover:text-white hover:border-red-500"
                disabled={buttonLoad}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {buttonLoad ? (
                  <TailSpin height={20} width={20} color="black" />
                ) : (
                  isHovered ? "Unfollow" : "Following"
                )}
              </button>
            ) : status === "requested" ? (
              <button
                onClick={() => cancelRequest(data?._id)}
                className="text-xs border px-4 rounded-full py-1.5 bg-gray-300 text-black max-sm:px-2 max-sm:py-1"
                disabled={buttonLoad}
              >
                {buttonLoad ? <TailSpin height={20} width={20} color="black" /> : "Requested"}
              </button>
            ) : (
              <button
                onClick={() => follow(data?._id)}
                className="text-xs border px-4 rounded-full py-1.5 bg-black text-white max-sm:px-2 max-sm:py-1"
                disabled={buttonLoad}
              >
                {buttonLoad ? <TailSpin height={20} width={20} color="white" /> : "Follow"}
              </button>
            )}
          </>
        )}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleUnfollowConfirm}
        onCancel={handleModalCancel}
        user={data} 
      />
    </div>
  );
};

export default PeopleCard;

