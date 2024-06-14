import React, { useState,useEffect } from "react";
import { TbCameraPlus } from "react-icons/tb";
import avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/logo.jpeg";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import EditCoverMedia from "@/EditPhoto/EditCoverMedia";
import EditProfileMedia from "@/EditPhoto/EditProfileMedia";

const Photo = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useSelector((state) => state.userSlice.base_url);
  const [profileMedia, setProfileMedia] = useState(false);
  const [coverMedia, setCoverMedia] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  useEffect(() => {
    const accessId = localStorage.getItem("accessId");
    const address= localStorage.getItem("address");
    const bio= localStorage.getItem("bio");
    const verification = localStorage.getItem("verification");
    const storedName = localStorage.getItem("name");
    if(!accessId){
      navigate("/signup");
    }
    if(!address){
      navigate("/signup/address");
    }
    if(!bio){
      navigate("/signup/bio");
    }
    if(!verification){
      navigate("/signup/verification");
    }
    if (storedName) {
      setName(storedName);
    }
  }, [navigate]);

  const sendDataToCloudinary = async () => {
    try {
      setLoading(true);
  
      // Upload cover image
      const coverFormData = new FormData();
      if (coverPhoto) {
        coverFormData.append("file", coverPhoto);
        coverFormData.append("upload_preset", "j6wloen4");
  
        const coverResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dyuqu72sl/image/upload",
          {
            method: "POST",
            body: coverFormData,
          }
        );
        const coverData = await coverResponse.json();
        if (!coverResponse.ok) {
          throw new Error(
            coverData.error || "Error uploading cover photo. Please try again later."
          );
        }
        var { secure_url: coverUrl } = coverData;
      }
  
      // Upload profile image
      const profileFormData = new FormData();
      if (profilePhoto) {
        profileFormData.append("file", profilePhoto);
        profileFormData.append("upload_preset", "j6wloen4");
  
        const profileResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dyuqu72sl/image/upload",
          {
            method: "POST",
            body: profileFormData,
          }
        );
        const profileData = await profileResponse.json();
        if (!profileResponse.ok) {
          throw new Error(
            profileData.error || "Error uploading profile photo. Please try again later."
          );
        }
        var { secure_url: profileUrl } = profileData;
      }
  
      // Save URLs to database
      if (!coverUrl || profileUrl) {
        await saveUrlsToDatabase({ coverUrl, profileUrl });
        localStorage.setItem("photo", "1");
        navigate("/signup/final");
      } else {
        alert("profile image is required.");
      }
    } catch (error) {
      console.error("Error sending data to Cloudinary:", error);
      alert("Error sending data to Cloudinary. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const saveUrlsToDatabase = async ({ coverUrl, profileUrl }) => {
    try {
      const response = await fetch(`${base}/signup/photo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessId: localStorage.getItem("accessId"),
          coverUrl,
          profileUrl,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save URLs to database");
      }
    } catch (error) {
      console.error("Error saving URLs to database:", error);
      alert("Failed to save URLs to database");
    }
  };

  const MovetoFinal= () =>{
    localStorage.setItem("photo","1")
    navigate("/signup/final");
  }

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
    <div className="h-[100dvh]">
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
      <div className="flex flex-col items-center justify-center py-8">
        <img src={logo} className="size-10 rounded-full" alt="" />
      </div>
      <div className="w-[min(460px,98%)] mx-auto pt-6 mb-6">
        <div className="text-2xl font-medium text-center max-sm:text-lg">
          Salam {name}
        </div>
        <div className="text-sm mt-1 text-center max-sm:hidden">
          Welcome to HilalLink: Your Gateway to a Global Muslim Community.
        </div>
      </div>
      <div className="w-[min(460px,98%)] overflow-hidden border rounded-md mx-auto max-sm:p-4">
        <div className="h-[200px] bg-gray-200  relative flex justify-center">
          {coverPhoto && (
            <img
              key={coverPhoto?.name}
              src={URL.createObjectURL(coverPhoto)}
              className="w-full h-[200px] absolute object-cover "
            />
          )}
          <label htmlFor="cover">
            <TbCameraPlus
              size={32}
              className="cursor-pointer primary mt-[60px]"
            />
            <input type="file" id="cover" hidden onChange={handleCoverPhotoChange} />
          </label>
          <div className="absolute -bottom-10">
            <div className="inset-0 backdrop-brightness-50 absolute rounded-full grid place-items-center">
              <label htmlFor="profile">
                <TbCameraPlus className="primary cursor-pointer" size={28} />
                <input
                  type="file"
                  id="profile"
                  hidden
                  onChange={handleProfilePhotoChange}
                />
              </label>
            </div>
            {profilePhoto ? (
              <img
                key={profilePhoto?.name}
                src={URL.createObjectURL(profilePhoto)}
                className="size-24 rounded-full"
              />
            ) : (
              <img src={avatar} alt="" className="size-24" />
            )}
          </div>
        </div>

        <div className="bg-white p-4 text-center pt-[80px]">
          <button
            disabled={!coverPhoto && !profilePhoto || loading}
            className={`py-2.5 text-sm rounded-full ${
              (!coverPhoto && !profilePhoto) || loading ? "bg-gray-300" : "bg-primary"
            } grid place-items-center w-full disabled:cursor-not-allowed`}
            onClick={sendDataToCloudinary}
          >
            {loading ? (
              <TailSpin height={20} width={20} color="white" />
            ) : (
              "Continue"
            )}
          </button>
          <button onClick={()=>(MovetoFinal())}  className=" text-sm mt-4">Skip & continue</button>
        </div>
      </div>
    </div>
  );
};

export default Photo;






