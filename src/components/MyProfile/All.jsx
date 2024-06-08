import React, { useEffect, useState } from "react";
import PostCard from "../PostCard";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const All = () => {
  const [posts, setPosts] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${base}/post/my-post`, {
          method: "POST",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data.found);
        setLoad(true);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again later.");
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {load ? (
        error ? (
          <div className="h-[200px] grid place-items-center font-bold text-red-500">
            {error}
          </div>
        ) : posts?.length > 0 ? (
          posts.map((item, index) => (
            <PostCard key={item._id} index={index} data={item} />
          ))
        ) : (
          <div className="h-[100px] grid place-items-center font-bold text-gray-500">
            No posts found
          </div>
        )
      ) : (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}
    </>
  );
};

export default All;
