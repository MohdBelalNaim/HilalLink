import React, { useState, useEffect } from "react";
import CompactSidebar from "../components/CompactSidebar";
import PeopleCard from "../components/PeopleCard";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const AllPeople = () => {
  const [user, setUser] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(`${base}/user/all`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.found));
    setLoad(true);
  }, []);

  return (
    <div>
      <div className="w-[min(560px,96%)] mx-auto">
        {load ? (
          <>
            <div className="text-lg font-bold py-4">
              All People on HilalLink
            </div>
            <div
              className="bg-white overflow-hidden"
              style={{ borderRadius: 6 + "px" }}
            >
              {user.map((item, index) => {
                return <PeopleCard data={item} index={index} />;
              })}
            </div>
          </>
        ) : (
          <div className="h-[400px] grid place-items-center">
            <TailSpin height={52} color="dodgerblue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPeople;
