import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  BsAspectRatio,
  BsImage,
  BsSquare,
  BsThreeDots,
  BsX,
  BsGlobe,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { hideCreate } from "../redux/toggleSlice";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import avatar from "../assets/images/avatar.jpeg";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/crop";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { toast } from "sonner";
import { LuRectangleHorizontal, LuRectangleVertical } from "react-icons/lu";
import { TailSpin } from "react-loader-spinner";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(null);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.userSlice.user);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [aspect, setAspect] = useState(1 / 1);
  const [aspectMenu, setAspectMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef("");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

    const handleChange = () => {
    if (editorRef.current) {
      const newText = editorRef.current.getMarkdown();
      if (newText.length <= 280) {
        setText(newText);
      } else {
        editorRef.current.setMarkdown(text);
      }
    }
  };

  async function handleImage() {
    try {
      const { file } = await getCroppedImg(
        URL.createObjectURL(uploadImage),
        croppedAreaPixels,
        rotation
      );
      return file;
    } catch (e) {
      console.error(e);
    }
  }
  const saveImage = async (imgFile) => {
    const data = new FormData();
    data.append("file", imgFile);
    data.append("upload_preset", "hilal_link");
    data.append("cloud_name", "myimagestorage");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/myimagestorage/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
      return cloudData.url;
    } catch (error) {
      console.log(error);
    }
  };
  async function savePost(img) {
    setLoading(true);
    await fetch(`${base}/post/create`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text,
        post_type: uploadImage ? "Media" : "Text",
        asset_url: uploadImage ? await saveImage(img) : "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          dispatch(hideCreate());
          setLoading(false);
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      });
  }
  async function handleSave() {
    if (text.length == 0 && uploadImage == null) {
      toast.error("Post cannot be empty!");
      return;
    }
    if (uploadImage) {
      const imageFile = await handleImage();
      await savePost(imageFile);
    } else {
      await savePost("");
    }
  }

  const base = useSelector((state) => state.userSlice.base_url);

  useLockBodyScroll();
  const cropperRef = useRef();

  function changeAspectRatio(newaspect) {
    setAspect(newaspect);
    setAspectMenu(false);
  }

  

  return (
    <div className="inset-0 fixed glass grid place-items-center z-[99]">
      <div className="w-[min(600px,96%)] bg-white rounded-2xl max-h-full overflow-y-auto">
        <div className="border-b relative text-center primary text-lg p-3 flex items-center justify-center max-sm:text-sm">
          Create a new post{" "}
          <BsX
            className="absolute right-5 cursor-pointer"
            size={22}
            onClick={() => dispatch(hideCreate())}
          />{" "}
        </div>
        <div className="p-4 relative">

          <div className="flex items-center gap-3">
            <img
              src={user?.profile_url ? user.profile_url : avatar}
              className="size-16 rounded-full"
              alt=""
            />
            <div>
              <div className="font-medium max-sm:text-sm">{user?.name}</div>
              <span className="text-xs mt-1 flex bg-blue-100 text-blue-500 py-1 px-3 rounded-full max-sm:text-[10px] max-sm:px-2">
                <BsGlobe className="mr-1 mt-0.5"/> Public
              </span>
            </div>
          </div>

          {/* <div className="flex items-center gap-3">
            <img src={user?.profile_url ? user.profile_url : avatar} className="size-16 rounded-full" alt=""/>
            <div className="font-medium max-sm:text-sm">
              {user?.name} 
              <span className="text-xs mt-1 flex bg-blue-100 text-blue-500 py-1 px-3 rounded-full max-sm:text-[10px] max-sm:px-2">
                <BsGlobe className="mr-1 mt-0.5"/> Public
              </span>
            </div>
          </div> */}

          <div className="mt-3 h-20 overflow-auto ">
            <div className="h-full overflow-auto">
              <MDXEditor
                onChange={handleChange}
                ref={editorRef}
                markdown=""
                placeholder="Bismillah! What's on your mind, write here.."
                readOnly={false}
                className="h-full"
              />
            </div>
          </div>



          <div className={`${uploadImage && "h-[300px]"} relative mt-3`}>
            {uploadImage && (
              <>
                <button
                  className="absolute z-50 bg-white rounded-full top-2 left-2 cursor-pointer"
                  onClick={() => setUploadImage("")}
                >
                  <BsX size={20} />
                </button>
                <div
                  onClick={() => setAspectMenu(!aspectMenu)}
                  className="w-max cursor-pointer bg-gray-200 p-2 rounded-full z-50 absolute bottom-2 left-2"
                >
                  <BsAspectRatio />
                </div>
                {aspectMenu && (
                  <div className="absolute overflow-hidden bg-white z-50 bottom-11 left-2 rounded overfolow-hidden">
                    <div
                      onClick={() => changeAspectRatio(1 / 1)}
                      className="hover:bg-gray-200 cursor-pointer px-2 border-b w-[80px] py-2 flex items-center justify-between"
                    >
                      1:1 <BsSquare size={16} />{" "}
                    </div>
                    <div
                      onClick={() => changeAspectRatio(4 / 5)}
                      className="hover:bg-gray-200 cursor-pointer px-2 border-b w-[80px] py-2 flex items-center justify-between"
                    >
                      4:5 <LuRectangleVertical size={20} />
                    </div>
                    <div
                      onClick={() => changeAspectRatio(16 / 9)}
                      className="hover:bg-gray-200 cursor-pointer px-2 border-b w-[80px] py-2 flex items-center justify-between"
                    >
                      16:9 <LuRectangleHorizontal size={20} />
                    </div>
                  </div>
                )}
                <Cropper
                  image={URL.createObjectURL(uploadImage)}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </>
            )}
          </div>

          
         <div className="relative my-3 max-sm:text-sm text-gray-400">
          <div className={`absolute  ${uploadImage ? 'right-0' : 'left-2' }`}>
            {text.length}/280
          </div>
         </div>


        </div>

        <div className="border-t flex items-center justify-between p-4 mt-4">
          <div className="flex text-lg items-center gap-3 text-gray-500">
            <label>
              <BsImage className="text-blue-500" />
              <input
                type="file"
                id="post"
                hidden
                accept="image/*"
                onChange={(e) => setUploadImage(e.target.files[0])}
              />
            </label>
          </div>
          <div className="flex items-center gap-4">
            {loading ? (
              <button
                onClick={savePost}
                className="bg-primary text-sm w-max py-1 rounded-full max-sm:text-xs opacity-55 cursor-not-allowed"
                disabled
              >
                <TailSpin height={20} color="white" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-primary text-sm py-1 px-4 rounded-full max-sm:text-xs"
              >
                Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;





