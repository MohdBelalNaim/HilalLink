import React, { useState, useEffect } from "react";
import ActivityCard from "../ActivityCard";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

const Activities = () => {
  const [posts, setPosts] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function AllUser() {
      fetch(`${base}/post/user-activity`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.found);
          setLoading(false); 
        })
        .catch((error) => {
          setLoading(false); 
          toast.error("Failed to fetch user activity");
        });
    }
    AllUser();
  }, [base]);

  return (
    <div className="bg-blue">
      {loading ? (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      ) : (
        <div>
          {posts?.length > 0 ? (
            posts.map((post, index) => (
              <ActivityCard key={post._id} index={index} data={post} />
            ))
          ) : (
            <div className="h-[200px] col-span-4 text-center pt-10 font-bold text-gray-500">
              No activites
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Activities;




