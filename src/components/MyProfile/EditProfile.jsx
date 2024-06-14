import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsCamera, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import avatar from "../../assets/images/avatar.jpeg";
import { TailSpin } from "react-loader-spinner";
import categories from "../../../utils/userCategories";
import { loginUser } from "@/redux/userSlice";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import EditCoverMedia from "@/EditPhoto/EditCoverMedia";
import EditProfileMedia from "@/EditPhoto/EditProfileMedia";

const EditProfile = ({ handler }) => {
  const { handleSubmit, register, setValue } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const base = useSelector((state) => state.userSlice.base_url);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [profileMedia, setProfileMedia] = useState(false);
  const [coverMedia, setCoverMedia] = useState(false);
  const [loading, setLoading] = useState(false);

  useLockBodyScroll();

  useEffect(() => {
    setValue("name", user?.name);
    setValue("category", user?.category);
    setValue("gender", user?.gender);
    setValue("city", user?.city);
    setValue("state", user?.state);
    setValue("country", user?.country);
    setValue("bio", user?.bio);
  }, [setValue, user]);

  const updateUser = async (data) => {
    setLoading(true);
    data.profile_url = profilePhoto ? await saveImage() : user?.profile_url;
    data.cover_url = coverPhoto ? await saveCover() : user?.cover_url;
    fetch(`${base}/user/update`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          handler(false);
          dispatch(loginUser());
          toast.success("Profile Updated Successfully");
          setLoading(false);
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const saveImage = async () => {
    const data = new FormData();
    data.append("file", profilePhoto);
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
      console.log(cloudData.url);

      return cloudData.url;
    } catch (error) {
      console.log(error);
    }
  };

  const saveCover = async () => {
    const data = new FormData();
    data.append("file", coverPhoto);
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
      console.log(cloudData.url);

      return cloudData.url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setProfileMedia(true);
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setCoverPhoto(file);
    setCoverMedia(true);
  }
  
  const handleSaveProfilePhoto = (croppedImage) => {
    setProfilePhoto(croppedImage); 
    setProfileMedia(false); 
  };

  const handleSaveCoverPhoto = (croppedImage) => {
    setCoverPhoto(croppedImage); 
    setCoverMedia(false); 
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {profileMedia && (
        <EditProfileMedia
          handler={setProfileMedia}
          photo={profilePhoto}
          onSave={handleSaveProfilePhoto}
        />
      )}
      {coverMedia && (
        <EditCoverMedia 
          handler={setCoverMedia}
          photo={coverPhoto}
          onSave={handleSaveCoverPhoto}
        />
      )
      }
      <div
        className="w-[min(540px,96%)] h-[95vh] bg-white rounded-md overflow-hidden relative"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex items-center gap-2 p-3 bg-white border-b">
          <BsX onClick={() => handler(false)} className="cursor-pointer" size={22} />
          <span>Edit profile</span>
        </div>
        <form
          onSubmit={handleSubmit(updateUser)}
          className="flex flex-col h-full overflow-y-auto p-4"
        >
          <div className="relative mb-4">
            <div className="absolute inset-0 grid place-content-center text-white z-10">
              <label htmlFor="cover">
                <div className="p-3 border border-white rounded-full">
                  <BsCamera size={18} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoChange}
                  hidden
                  id="cover"
                />
              </label>
            </div>
            {coverPhoto ? (
              <img
                src={URL.createObjectURL(coverPhoto)}
                className="h-[200px] w-full object-cover brightness-50"
                alt=""
              />
            ) : (
              <img
                src={user?.cover_url || "https://picsum.photos/400"}
                className="h-[200px] w-full object-cover brightness-50"
                alt=""
              />
            )}
          </div>
          <div className="relative pt-16 p-4 flex-1">
            <div className="absolute -top-10 left-4 border-4 border-white rounded-full">
              <label htmlFor="profile">
                <div className="absolute inset-0 grid place-items-center text-white z-10">
                  <div className="p-2 border border-white rounded-full">
                    <BsCamera size={20} />
                  </div>
                </div>
                {
                  profilePhoto ? (
                  <img
                  src={ URL.createObjectURL(profilePhoto) }
                  className="w-24 h-24 rounded-full object-cover"
                  alt=""
                />
                  ):(
                    <img
                  src={ user?.profile_url || avatar}
                  className="w-24 h-24 rounded-full object-cover"
                  alt=""
                />
                  )
                }
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  hidden
                  id="profile"
                />
              </label>
            </div>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Full name"
                className="p-2 border rounded w-full"
                {...register("name")}
              />
              <select {...register("category")} className="w-full p-2 border rounded">
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select {...register("gender")} className="w-full p-2 border rounded">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <input
                type="text"
                placeholder="City"
                className="p-2 border rounded w-full"
                {...register("city")}
              />
              <input
                type="text"
                placeholder="State"
                className="p-2 border rounded w-full"
                {...register("state")}
              />
              <input
                type="text"
                placeholder="Country"
                className="p-2 border rounded w-full"
                {...register("country")}
              />
              <input
                type="text"
                placeholder="Bio"
                className="p-2 border rounded w-full"
                {...register("bio")}
              />
            </div>
          </div>
          <div className="p-4 bg-white border-t flex justify-end">
            {loading ? (
              <button className="bg-black text-white px-3 py-1.5 rounded-full opacity-50 cursor-not-allowed" disabled>
                <TailSpin height={16} color="white" />
              </button>
            ) : (
              <button className="bg-black text-white mb-8 px-3 py-1.5 rounded-full">Save</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

