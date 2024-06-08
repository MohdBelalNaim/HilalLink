import React, { useState, useEffect } from "react";
import { setMenu } from "@/redux/searchSlice";
import { useLocation } from "react-router-dom";
import PeopleCard from "../PeopleCard";
import PostCard from "../PostCard";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Radius } from "lucide-react";

const All = () => {
  const [searchResults, setSearchResults] = useState({ results: [] , posts: [] });
  const location = useLocation();
  const base = useSelector((state) => state.userSlice.base_url);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlKeyword = params.get("query");
    if (urlKeyword) {
      handleSearch(urlKeyword);
    }
  }, [location.search]);

  const handleSearch = async (keyword) => {
    setLoad(false);
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
      <div className="text-xl font-bold py-4">All results</div>
      {load ? (
        <>
          {searchResults.results?.length === 0 ? (
            <div className="h-[500px] grid font-bold place-items-center text-gray-500 text-center">
              No data found
            </div>
          ) : (
            <>
              <div className="bg-white rounded-md" style={{ borderRadius: "8px" }}>
                <div className="text-sm max-sm:text-xs py-3 border-b px-4 flex justify-between">
                  People on HilalLink{" "}
                  <div
                    onClick={() => dispatch(setMenu("People"))}
                    className=" hover:bg-gray-200 cursor-pointer rounded-md"
                  >
                    <span className="font-medium primary">See all</span>
                  </div>
                </div>
                {searchResults.results?.slice(0, 5).map((result, index) => (
                  <div key={index}>
                    <PeopleCard data={result.user} />
                  </div>
                ))}
              </div>

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
          )}
        </>
      ) : (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}
    </div>
  );
};

export default All;


