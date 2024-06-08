import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";
import { TailSpin } from "react-loader-spinner";

const Posts = () => {
  const [searchResults, setSearchResults] = useState({ posts: [] });
  const base = useSelector((state) => state.userSlice.base_url);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlKeyword = params.get("query");
    if (urlKeyword) {
      handleSearch(urlKeyword);
    }
  }, [location.search]);

  const handleSearch = async (keyword) => {
    try {
      const response = await fetch(`${base}/user/search/${keyword}`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to search");
      }
      const data = await response.json();
      setSearchResults(data);
      setLoad(true);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <div className="font-bold text-xl mt-3 pb-5">Posts</div>
      {load ? (
        <>
        <div className="mt-4">
          {searchResults.results?.map((result, index) => (
            <div key={index}>
                {result.posts?.map((post, postIndex) => (
                  <PostCard key={postIndex} data={post} />
                ))}
              
            </div>
          ))}
          {searchResults.keywordPosts?.map((keywordPost, index) => (
            <PostCard key={index} data={keywordPost} />
          ))}
        </div>
        </>
      ) : (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}
    </div>
  );
};

export default Posts;

