import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../PostCard";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const All = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (id) {
        try {
          const response = await fetch(`${base}/post/user/${id}`, {
            method: "POST",
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data.error) {
            console.log(data.error)
          } else {
            setPosts(data.data);
          }
          setLoad(true);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setLoad(true);
        }
      }
    };

    fetchPosts();
  }, [id, base]); 

  return (
    <>
      {load ? (
        posts.length > 0 ? (
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
