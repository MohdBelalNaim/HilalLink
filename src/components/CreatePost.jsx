import React, { useRef, useState} from "react";
import {
  BsImage,
  BsX,
  BsGlobe,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { hideCreate } from "../redux/toggleSlice";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import avatar from "../assets/images/avatar.jpeg";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import EditProfileMedia from "@/EditPhoto/EditProfileMedia";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const user = useSelector((state) => state.userSlice.user);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileMedia, setProfileMedia] = useState(false);

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
        post_type: profilePhoto ? "Media" : "Text",
        asset_url: profilePhoto ? await saveImage(img) : "",
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
    if (text.length == 0 && profilePhoto == null) {
      toast.error("Post cannot be empty!");
      return;
    }
    if (profilePhoto) {
      await savePost(profilePhoto);
    } else {
      await savePost("");
    }
  }

  const base = useSelector((state) => state.userSlice.base_url);

  useLockBodyScroll();

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setProfileMedia(true);
  };

  const handleSaveProfilePhoto = (croppedImage) => {
    setProfilePhoto(croppedImage); 
    setProfileMedia(false); 
  };
  

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
          
          <div className={`${profilePhoto && "h-[300px]"} relative mt-3`}>
            {profilePhoto && (
            <img
              key={profilePhoto?.name}
              src={URL.createObjectURL(profilePhoto)}
              className="w-full h-[300px] absolute object-cover "
            />
          )}
          </div>

          {profileMedia && (
        <EditProfileMedia
          handler={setProfileMedia}
          photo={profilePhoto}
          onSave={handleSaveProfilePhoto}
        />
      )}
      
      

          
         <div className="relative my-3 max-sm:text-sm text-gray-400">
          <div className={`absolute  ${profilePhoto ? 'right-0' : 'left-2' }`}>
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
                onChange={handleProfilePhotoChange}
              />
            </label>
          </div>
          <div className="flex items-center gap-4">
            {loading ? (
              <button
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





