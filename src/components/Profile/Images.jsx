import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showImageDetails } from "@/redux/toggleSlice";
import ImageCard from "../ImageCard";
import { TailSpin } from "react-loader-spinner";

const Images = () => {
  const [posts, setPosts] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  const enlarge = useSelector((state) => state.toggleSlice.imageDetails);
  const Photo = useSelector((state) => state.toggleSlice.currentPhoto);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoad(true);
    fetch(`${base}/post/user/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data?.data.filter((item) => item.post_type === "Media"));
        setLoad(false);
      })
      .catch(() => {
        setLoad(false);
      });
  }, [id, base]);

  return (
    <>
      {enlarge && (
        <div className="glass inset-0 fixed z-[99] grid place-items-center bg-black bg-opacity-75">
          {Photo && (
            <div className="w-[45%] bg-white">
              <ImageCard key={Photo._id} data={Photo} />
            </div>
          )}
        </div>
      )}
      {load ? (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      ) : (
        <div className={`grid grid-cols-4 gap-1 p-2 ${posts.length ? 'bg-white' : 'bg-blue'}`}>
          {posts.length ? (
            posts.map((item, index) => (
              <div
                key={index}
                onClick={() => dispatch(showImageDetails(item))}
                className="grid h-[110px] place-items-center bg-red-600 cursor-pointer overflow-hidden"
              >
                <img
                  src={item.asset_url}
                  className="h-full object-cover w-full"
                  alt=""
                />
              </div>
            ))
          ) : (
            <div className="h-[200px] col-span-4 text-center pt-10 font-bold text-gray-500">
              No images available
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Images;

