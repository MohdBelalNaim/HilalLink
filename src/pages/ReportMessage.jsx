import CompactSidebar from "@/components/CompactSidebar";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import Markdown from "react-markdown";
import FullScreenLoader from "@/components/FullScreenLoader";

const ReportMessage = () => {
  const { id } = useParams();
  const [from, setfrom] = useState({});
  const base = useSelector((state) => state.userSlice.base_url);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    function getDetails() {
      setLoading(true);
      fetch(`${base}/message/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setfrom(data.found);
          console.log(data.found)
          setLoading(false);
        });
    }
    getDetails();
  }, []);
  return (
    <div>
      {loading && <FullScreenLoader />}

      <div className="w-[min(560px,96%)] mx-auto">
        <div className="text-xl font-bold py-4">Report this Message</div>

        <div className="rounded-[4px] overflow-hidden bg-white">
          <div className="flex gap-3 p-2 bg-white">
            <img
              src={from?.from?.profile_url || avatar}
              className="size-12 rounded-full"
              alt=""
            />
            <div>
              <div className="text-sm font-bold">{from?.from?.name}</div>
              <div className="text-xs">
                {from?.from?.city}, {from?.from?.state}, {from?.from?.country}
              </div>
              <div className="text-xs">{from?.from?.category}</div>
            </div>
          </div>
          <div className="text-sm">
            {from?.content && (
              <Markdown className="bg-gray-300 px-3 py-1.5 m-3">{from?.content}</Markdown>
            )}
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="" className="text-sm">
            What's wrong with this post?
          </label>
          <select
            name=""
            id=""
            className="w-full text-sm p-2 rounded-[4px] mt-2"
          >
            <option> ⁠Nudity</option>
            <option> ⁠Violence </option>
            <option> ⁠Harassment</option>
            <option> ⁠Haram Content </option>
            <option>Misinformation or Fake News</option>
            <option> ⁠Abuse of Religious Beliefs </option>
            <option>⁠Inappropriate Language or Behavior </option>
            <option> ⁠Privacy Violations </option>
            <option>⁠Spam or Fraudulent Activities</option>
          </select>
          <div className="mt-3">
            <label
              htmlFor=""
              className="text-sm"
              style={{ marginTop: 10 + "px" }}
            >
              Please provide a brief description about this report
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              className="w-full rounded-[4px] mt-2"
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white text-sm flex items-center gap-3 py-1.5 px-3 rounded-full mt-4">
            Submit <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportMessage;