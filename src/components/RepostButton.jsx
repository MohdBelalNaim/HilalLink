import React, { useEffect, useState,useRef } from "react";
import { BsRepeat, BsX } from "react-icons/bs";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";

const RepostButton = ({ data , updateRepostCount}) => {
  const base = useSelector((state) => state.userSlice.base_url);
  const [reposted, setReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(data?.reposted?.length);
  const [loading, setLoading] = useState(false);
  const [repostOptions, setRepostOptions] = useState(false);
  const [undoOptions, setUndoOptions] = useState(false);
  const repostButtonRef = useRef(null);
  const repostmenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        repostmenuRef.current &&
        !repostmenuRef.current.contains(event.target) &&
        repostButtonRef.current &&
        !repostButtonRef.current.contains(event.target)
      ) {
        setRepostOptions(false);
        setUndoOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    checkRepost();
  }, []);

  function checkRepost() {
      setLoading(true);
      fetch(`${base}/post/check-repost/${data?._id}`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReposted(data.status);
          setLoading(false);
        });
    }

  const removeRepost = () => {
    setReposted(false);
    setRepostCount(repostCount - 1);
    updateRepostCount(repostCount - 1);
    fetch(
      `${base}/repost/delete/${
        data?.original_postId?._id ? data?.original_postId?._id : data?._id
      }`,
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setUndoOptions(false);
  };

  const repost = () => {
    setReposted(true);
    setRepostCount(repostCount + 1);
    updateRepostCount(repostCount + 1); 
    fetch(`${base}/repost/${data?._id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
    setRepostOptions(false);
  };

  return (
    <div className="relative">
  {loading ? (
    <div className="bg-[#f4f6fc] rounded-full text-gray-500 flex justify-center items-center gap-2">
      <BsRepeat size={18} />
      <div>
        <TailSpin height={15} width={15} color="gray" />
      </div>
    </div>
  ) : reposted ? (
    <div className="relative">
      <div
        ref={repostButtonRef}
        onClick={() => setUndoOptions(!undoOptions)}
        className="bg-[#f4f6fc] rounded-full py-1.5 flex  text-green-500 justify-center text-sm items-center "
      >
        <BsRepeat size={20} />
      </div>
      {undoOptions && (
        <div
          ref={repostmenuRef}
          className="border w-[100px] bg-white absolute top-full right-0 shadow text-center  overflow-hidden z-[99] "
          style={{ borderRadius: "6px" }}
        >
          <div
            onClick={() => removeRepost(data?._id)}
            className="cursor-pointer hover:bg-gray-100 text-green-500 flex items-center text-xs border-b p-2"
          >
            <BsRepeat className="mr-1"/>{" "}Undo repost
          </div>
          <div
            onClick={() => setUndoOptions(false)}
            className="cursor-pointer hover:bg-gray-100 flex text-gray-500 items-center gap-2 text-xs p-2"
          >
            <BsX /> Cancel
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="relative">
      <div
        ref={repostButtonRef}
        onClick={() => setRepostOptions(!repostOptions)}
        className="bg-[#f4f6fc] rounded-full py-1.5 flex text-gray-500 justify-center text-sm items-center gap-2 max-sm:gap-1"
      >
        <BsRepeat size={20} /> 
      </div>
      {repostOptions && (
        <div
          ref={repostmenuRef}
          className="border bg-white absolute top-full right-0 shadow text-gray-500 overflow-hidden z-[99] "
          style={{ borderRadius: "6px" }}
        >
          <div
            onClick={() => repost(data?._id)}
            className="cursor-pointer hover:bg-gray-100 text-gray-500 flex items-center gap-2 text-xs border-b p-2"
          >
            <BsRepeat /> Repost
          </div>
          <div
            onClick={() => setRepostOptions(false)}
            className="cursor-pointer hover:bg-gray-100 flex items-center text-gray-500 gap-2 text-xs p-2"
          >
            <BsX /> Cancel
          </div>
        </div>
      )}
    </div>
  )}
</div>

  );
};

export default RepostButton;


// import React, { useEffect, useState,useRef } from "react";
// import { BsRepeat, BsX } from "react-icons/bs";
// import { TailSpin } from "react-loader-spinner";
// import { useSelector } from "react-redux";

// const RepostButton = ({ data }) => {
//   const base = useSelector((state) => state.userSlice.base_url);
//   const [reposted, setReposted] = useState(false);
//   const [repostCount, setRepostCount] = useState(data?.reposted?.length);
//   const [loading, setLoading] = useState(false);
//   const [repostOptions, setRepostOptions] = useState(false);
//   const [undoOptions, setUndoOptions] = useState(false);
//   const repostButtonRef = useRef(null);
//   const repostmenuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         repostmenuRef.current &&
//         !repostmenuRef.current.contains(event.target) &&
//         repostButtonRef.current &&
//         !repostButtonRef.current.contains(event.target)
//       ) {
//         setRepostOptions(false);
//         setUndoOptions(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside, true);
//     return () => {
//       document.removeEventListener("click", handleClickOutside, true);
//     };
//   }, []);

//   useEffect(() => {
//     function checkRepost() {
//       setLoading(true);
//       fetch(`${base}/post/check-repost/${data?._id}`, {
//         method: "POST",
//         headers: {
//           authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setReposted(data.status);
//           setLoading(false);
//         });
//     }
//     checkRepost();
//   }, []);

//   const removeRepost = () => {
//     console.log("called to delete post");
//     setReposted(false);
//     setRepostCount(repostCount - 1);
//     fetch(
//       `${base}/repost/delete/${
//         data?.original_postId?._id ? data?.original_postId?._id : data?._id
//       }`,
//       {
//         method: "POST",
//         headers: {
//           authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//       setUndoOptions(false);
//   };

//   const repost = () => {
//     setReposted(true);
//     setRepostCount(repostCount + 1);
//     fetch(`${base}/repost/${data?._id}`, {
//       method: "POST",
//       headers: {
//         authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then((res) => res.json())
//       .catch((error) => {
//         console.log(error);
//       });
//       setRepostOptions(false);
//   };

//   return (
//     <div className="relative">
//   {loading ? (
//     <div className="bg-[#f4f6fc] rounded-full text-gray-500 flex justify-center items-center gap-2">
//       <BsRepeat size={18} />
//       <div>
//         <TailSpin height={15} width={15} color="gray" />
//       </div>
//     </div>
//   ) : reposted ? (
//     <div className="relative">
//       <div
//         ref={repostButtonRef}
//         onClick={() => setUndoOptions(!undoOptions)}
//         className="bg-[#f4f6fc] rounded-full px-4 py-1.5 flex  text-green-500 justify-center text-sm items-center gap-2 max-sm:gap-1"
//       >
//         <BsRepeat size={18} /> {repostCount}
//       </div>
//       {undoOptions && (
//         <div
//           ref={repostmenuRef}
//           className="border bg-white absolute top-full right-0 shadow  overflow-hidden z-[99] "
//           style={{ borderRadius: "6px" }}
//         >
//           <div
//             onClick={() => removeRepost(data?._id)}
//             className="cursor-pointer hover:bg-gray-100 text-green-500 flex items-center gap-2 text-xs border-b p-2"
//           >
//             <BsRepeat /> Undo repost
//           </div>
//           <div
//             onClick={() => setUndoOptions(false)}
//             className="cursor-pointer hover:bg-gray-100 flex text-gray-500 items-center gap-2 text-xs p-2"
//           >
//             <BsX /> Cancel
//           </div>
//         </div>
//       )}
//     </div>
//   ) : (
//     <div className="relative">
//       <div
//         ref={repostButtonRef}
//         onClick={() => setRepostOptions(!repostOptions)}
//         className="bg-[#f4f6fc] rounded-full px-4 py-1.5 flex text-gray-500 justify-center text-sm items-center gap-2 max-sm:gap-1"
//       >
//         <BsRepeat size={18} /> {repostCount}
//       </div>
//       {repostOptions && (
//         <div
//           ref={repostmenuRef}
//           className="border bg-white absolute top-full right-0 shadow text-gray-500 overflow-hidden z-[99] "
//           style={{ borderRadius: "6px" }}
//         >
//           <div
//             onClick={() => repost(data?._id)}
//             className="cursor-pointer hover:bg-gray-100 text-gray-500 flex items-center gap-2 text-xs border-b p-2"
//           >
//             <BsRepeat /> Repost
//           </div>
//           <div
//             onClick={() => setRepostOptions(false)}
//             className="cursor-pointer hover:bg-gray-100 flex items-center text-gray-500 gap-2 text-xs p-2"
//           >
//             <BsX /> Cancel
//           </div>
//         </div>
//       )}
//     </div>
//   )}
// </div>

//   );
// };

// export default RepostButton;