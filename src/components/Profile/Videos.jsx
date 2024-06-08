import React from "react";
import VideoCard from "../VideoCard";

const Videos = () => {
  return (
    <div>
      {"abcdefgh".split("").map((item, index) => {
        return <VideoCard index={index} />;
      })}
    </div>
  );
};

export default Videos;
