import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PeopleCard from "../PeopleCard";
import { TailSpin } from "react-loader-spinner";

const People = () => {
  const [searchResults, setSearchResults] = useState({ results: []});
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
      <div className="font-bold text-xl mt-3 pb-5">People</div>
      {load ? (
        <>
          {searchResults.results.length === 0 ? (
            <div className="h-[500px] grid font-bold place-items-center text-gray-500 text-center">
              No People found
            </div>
          ) : (
            <div className="bg-white rounded-md" style={{"borderRadius":"8px"}}>
            <div className="mt-4">
              {searchResults.results?.map((result, index) => (
                <div key={index}>
                  <PeopleCard data={result.user} />
                </div>
              ))}
            </div>
            </div>
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

export default People;
