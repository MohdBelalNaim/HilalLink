import { useLockBodyScroll } from "@uidotdev/usehooks";
import React, { useState, useCallback } from "react";
import { BsX } from "react-icons/bs";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/crop";
import { TailSpin } from "react-loader-spinner";

const EditCoverMedia = ({ handler, photo, onSave }) => {
  useLockBodyScroll();
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false); 

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    setLoading(true); 
    try {
      const { file } = await getCroppedImg(
        URL.createObjectURL(photo),
        croppedAreaPixels,
        rotation
      );
      onSave(file);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[min(540px,96%)] bg-white rounded-md overflow-hidden relative" style={{ borderRadius: "10px" }}>
        <div className="flex items-center gap-2 p-3 bg-white border-b">
          <BsX onClick={() => handler(false)} className="cursor-pointer" size={22} />
          <span>Edit cover media</span>
        </div>
        <div className="p-4 relative">
          {photo && (
            <div className="relative h-[300px]">
              <button
                className="absolute z-50 bg-white rounded-full top-2 left-2 cursor-pointer"
                onClick={() => handler(false)}
              >
                <BsX size={20} />
              </button>
              <Cropper
                image={URL.createObjectURL(photo)}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={handleSave}
            className="bg-primary text-white px-4 py-2 rounded-full flex items-center justify-center"
            disabled={loading} 
          >
            {loading ? <TailSpin height={20} width={20} color="white" /> : "Save"}  
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCoverMedia;
