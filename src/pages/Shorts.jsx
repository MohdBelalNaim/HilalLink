"use client";
import { Link } from "react-router-dom";
import CircularIcon from "../components/CircularIcon";
import Short from "../components/Short";
import VideoStore from "../store/videoStore";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";

const ShortsPage = () => {
  const shortsContainer = useRef();
  const router = useRouter();
  const videos = useContext(VideoStore);
  const { id } = useParams();
  const [top, setTop] = useState(videos.findIndex((v) => v.id === id));
  const path = "https://res.cloudinary.com/dvz1oehqm/video/upload/";

  useEffect(() => {
    document.querySelectorAll("#shortsContainer > div")[top].focus();
    const { id } = videos[top];
    router.replace(`/shorts/${id}`);
  }, [top]);

  const scrollUp = () => {
    if (top == videos.length - 1) return;
    setTop((old) => old + 1);
  };

  const scrollDown = () => {
    if (top == 0) return;
    setTop((old) => old - 1);
  };

  useEffect(() => {
    window.onkeyup = (e) => {
      e.key == "ArrowDown" && scrollUp();
      e.key == "ArrowUp" && scrollDown();
    };
  }, []);

  return (
    <section className="absolute bg-black/80 w-full h-dvh inset-0 grid place-items-center">
      <Link
        to="/"
        className="absolute top-6 left-6 max-sm:top-4 max-sm:left-4 z-10"
      >
        <CircularIcon>
          <FaArrowLeft className="max-sm:text-2xl" />
        </CircularIcon>
      </Link>

      <div
        onClick={scrollUp}
        className="max-sm:hidden absolute top-1/2 -translate-y-1/2 left-6"
      >
        <CircularIcon disabled={top == videos.length - 1}>
          <FaChevronDown />
        </CircularIcon>
      </div>

      <div
        ref={shortsContainer}
        id="shortsContainer"
        className="h-full overflow-y-auto w-full max-w-lg snap-y snap-mandatory snap-always no-scrollbar"
      >
        {videos.map((video, index) => {
          return (
            <Short
              url={`${path}${video.id}/video/${video.name}`}
              key={video.id}
              index={index}
              count={setTop}
            />
          );
        })}
      </div>

      <div
        onClick={scrollDown}
        className="max-sm:hidden absolute top-1/2 -translate-y-1/2 right-6"
      >
        <CircularIcon disabled={top == 0}>
          <FaChevronUp />
        </CircularIcon>
      </div>
    </section>
  );
};

export default ShortsPage;
