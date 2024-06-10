import CompactSidebar from "@/components/CompactSidebar";
import PeopleCard from "@/components/PeopleCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Followers = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [load, setLoad] = useState(false)
  const base = useSelector((state) => state.userSlice.base_url);
  useEffect(() => {
    setLoad(true)
    fetch(`${base}/user/my-people/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data?.followers);
        setLoad(false)
      });
  }, []);
  return (
    <div>
      <div className="w-[min(560px,100%)] mx-auto px-3">
        <div className="text-xl font-bold p-4">All followers</div>
        {load ? (
          <div className="h-[400px] grid place-items-center">
            <TailSpin height={52} color="dodgerblue" />
          </div>
        ) : data?.length > 0 ? (
          <div>
            {data.map((item) => (
              <PeopleCard key={item.email} data={item} />
            ))}
          </div>
        ) : (
          <p>No followers.</p>
        )}
      </div>
    </div>
  );
};

export default Followers;
