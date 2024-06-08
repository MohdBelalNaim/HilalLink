import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PeopleCard from "../PeopleCard";
import { TailSpin } from "react-loader-spinner";

const People = () => {
  const base = useSelector((state) => state.userSlice.base_url);
  const [users, setUsers] = useState([]);
  const [load,setLoad] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${base}/user/top-users`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data.found);
      setLoad(true);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <div className="font-bold text-xl mt-3 pb-5">All people</div>
      {load ? (
        <div className="bg-white rounded-md " style={{"borderRadius":"8px"}}>
        {users.map((user, index) => (
          <PeopleCard key={index} data={user} index={index} />
        ))}
      </div>
      ):(
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}
      
    </div>
  );
};

export default People;
