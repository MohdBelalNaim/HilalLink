import CompactSidebar from "@/components/CompactSidebar";
import PeopleCard from "@/components/PeopleCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Followers = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const base = useSelector((state) => state.userSlice.base_url);
  useEffect(() => {
    fetch(`${base}/user/my-people/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data?.followers);
      });
  }, []);
  return (
    <div>
      <CompactSidebar />
      <div className="w-[min(560px,100%)] mx-auto px-3">
        <div className="text-xl font-bold py-4">All followers</div>
        <div>
          {data?.map((item) => {
            return <PeopleCard data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Followers;
