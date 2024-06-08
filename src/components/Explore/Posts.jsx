import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";
import { TailSpin } from "react-loader-spinner";

const Posts = () => {
  const base = useSelector((state) => state.userSlice.base_url);
  const [posts, setPosts] = useState([]);
  const [load,setLoad] = useState(false);

  useEffect(() => {
    fetch(`${base}/post/all`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setLoad(true);
      });
  }, []);
  return (
    <div>
      <div className="font-bold text-xl mt-3 pb-5">All posts</div>
      {load ? (
        <div>
        {posts.map((item, index) => (
          <PostCard key={index} data={item} />
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

export default Posts;
