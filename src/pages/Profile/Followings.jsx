import CompactSidebar from "@/components/CompactSidebar";
import PeopleCard from "@/components/PeopleCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Followings = () => {
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
        setData(data?.following);
        setLoad(false)
        //console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="w-[min(560px,100%)] mx-auto px-3">
        <div className="text-xl font-bold p-4">All followings</div>
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
          <div className="h-[200px] col-span-4 text-center pt-10 font-bold text-gray-500">
            No followings
          </div>
        )}
      </div>
    </div>
  );
};

export default Followings;
