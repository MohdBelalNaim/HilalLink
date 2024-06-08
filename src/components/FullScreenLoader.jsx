import { useLockBodyScroll } from "@uidotdev/usehooks";
import React from "react";
import { TailSpin } from "react-loader-spinner";

const FullScreenLoader = () => {
  useLockBodyScroll();
  return (
    <div className="inset-0 glass fixed z-50 grid place-items-center">
      <TailSpin color="dodgerblue" height={42} />
    </div>
  );
};

export default FullScreenLoader;
