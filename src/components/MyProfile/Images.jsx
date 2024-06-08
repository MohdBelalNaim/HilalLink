import { useParams } from "react-router-dom";
import { hideImageDetails, showImageDetails } from "@/redux/toggleSlice";
import React, { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
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
    fetch(`${base}/post/my-post`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data?.found.filter((item) => item.post_type === "Media"));
        setLoad(false);
      })
      .catch(() => setLoad(false));
  }, [base, id]);

  return (
    <>
      {enlarge && (
        <div className="glass inset-0 fixed grid place-items-center">
          <BsX
            onClick={() => dispatch(hideImageDetails())}
            className="absolute z-[99] cursor-pointer text-white right-5 top-5"
            size={40}
          />
          {Photo && (
            <div className="w-[45%] bg-white" style={{ borderRadius: "8px" }}>
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
        <div className={`grid grid-cols-4 gap-1 p-2 ${posts?.length > 0 ? 'bg-white' : 'bg-blue'}`}>
          {posts?.length > 0 ? (
            posts.map((item, index) => (
              <div
                key={index}
                onClick={() => dispatch(showImageDetails(item))}
                className="grid place-items-center cursor-pointer"
              >
                <img src={item.asset_url} alt="" />
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

