import React, { useState, useEffect } from "react";
import ActivityCard from "../ActivityCard";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const Activities = () => {
  const [posts, setPosts] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${base}/repost/my-reposts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue">
      {loading ? (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      ) : (
        <div>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <ActivityCard key={post._id} index={index} data={post} />
            ))
          ) : (
            <div className="h-[200px] col-span-4 text-center pt-10 font-bold text-gray-500">
              No images available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Activities;
