import React, { useEffect, useState } from "react";
import PeopleCard from "../PeopleCard";
import PostCard from "../PostCard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsSunrise } from "react-icons/bs";
import { TailSpin } from "react-loader-spinner";

const All = () => {
  const base = useSelector((state) => state.userSlice.base_url);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${base}/post/all`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      const shuffledPosts = data.data?.sort(() => Math.random() - 0.5);
      const randomPosts = shuffledPosts.slice(0, 4);
      setPosts(randomPosts);
      setLoad(true);
    } catch (error) {
      console.error(error.message);
      setLoad(false);
    }
  };

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
      const shuffledUsers = data.found.sort(() => Math.random() - 0.5);
      const randomUsers = shuffledUsers.slice(0, 4);
      setUsers(randomUsers);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  return (
    <div>
      <div
        className="shadow p-6 max-sm:px-2 py-3 overflow-hidden mb-4 bg-[url('https://img.freepik.com/premium-vector/pink-islamic-mandala-background_629533-44.jpg')] pb-12 max-sm:pb-4"
        style={{ borderRadius: 6 + "px" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg max-sm:text-sm">
              Markaz Masjid
            </div>
            <div className="text-sm font-bold max-sm:text-xs">
              Aminabad, Lucknow
            </div>
          </div>
          <div>
            <div className="font-bold tetx-lg max-sm:text-sm ">
              13 February, 2024
            </div>
            <div className="text-sm font-bold max-sm:text-xs">
              03 Sha'ban, 1445 AH
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 max-sm:gap-1 gap-3 mt-6 items-center">
          <div
            className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
            style={{ borderRadius: 6 + "px" }}
          >
            <div>
              <BsSunrise className="primary text-4xl max-sm:text-3xl" />
            </div>
            <div className="font-bold max-sm:text-xs max-sm:font-normal ">
              FAJAR
            </div>
            <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
              6:03 am
            </div>
          </div>
          <div
            className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
            style={{ borderRadius: 6 + "px" }}
          >
            <div>
              <BsSunrise className="primary text-4xl max-sm:text-3xl" />
            </div>
            <div className="font-bold max-sm:text-xs max-sm:font-normal ">
              DUHUR
            </div>
            <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
              6:03 am
            </div>
          </div>
          <div
            className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
            style={{ borderRadius: 6 + "px" }}
          >
            <div>
              <BsSunrise className="primary text-4xl max-sm:text-3xl" />
            </div>
            <div className="font-bold max-sm:text-xs max-sm:font-normal ">
              ASR
            </div>
            <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
              6:03 am
            </div>
          </div>
          <div
            className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
            style={{ borderRadius: 6 + "px" }}
          >
            <div>
              <BsSunrise className="primary text-4xl max-sm:text-3xl" />
            </div>
            <div className="font-bold max-sm:text-xs max-sm:font-normal ">
              MAGRIB
            </div>
            <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
              6:03 am
            </div>
          </div>
          <div
            className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
            style={{ borderRadius: 6 + "px" }}
          >
            <div>
              <BsSunrise className="primary text-4xl max-sm:text-3xl" />
            </div>
            <div className="font-bold max-sm:text-xs max-sm:font-normal ">
              ISHA
            </div>
            <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
              6:03 am
            </div>
          </div>
        </div>
      </div>

      {load ? (
        <div className="bg-white rounded-md " style={{ borderRadius: "8px" }}>
          <div className="text-sm max-sm:text-xs py-3 border-b px-4 flex justify-between">
            People on HilalLink{" "}
            <Link to="/all-people">
              <span className="font-medium primary">See all</span>
            </Link>
          </div>
          {users.slice(0, 4).map((user, index) => (
            <PeopleCard key={index} data={user} index={index} />
          ))}
        </div>
      ) : (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}

      <div className="mt-4">
        {posts.slice(0, 4).map((item, index) => (
          <PostCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default All;
