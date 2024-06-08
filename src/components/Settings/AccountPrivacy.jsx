import { loginUser } from "@/redux/userSlice";
import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

const AccountPrivacy = () => {
  const isPrivate = useSelector((state) => state.userSlice.user?.isPrivate);
  const base = useSelector((state) => state.userSlice.base_url);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  function handleChange() {
    setLoading(true);
    if (isPrivate) {
      fetch(`${base}/auth/make-public`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        dispatch(loginUser());
        setLoading(false);
      });
    } else {
      fetch(`${base}/auth/make-private`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        dispatch(loginUser());
        setLoading(false);
      });
    }
  }
  return (
    <div className="h-[100dvh] py-12 max-sm:px-4">
      {loading && (
        <div className="fixed inset-0 glass z-50 grid place-items-center">
          <TailSpin height={42} color="dodgerblue" />
        </div>
      )}
      <div className="text-xl font-bold">Account privacy</div>
      <div className="text-gray-600 mt-2">
        When your account is public, your profile and posts can be seen by
        anyone, on or off HilalLink, even if they don’t have an HilalLink
        account.
      </div>
      <div className="text-gray-600 mt-4">
        When your account is private, only the followers you approve can see
        what you share, including your photos or videos on hashtag and location
        pages, and your followers and following lists
      </div>

      <div className="flex justify-between items-center text-lg font-bold mt-5">
        Private account
        <label class="inline-flex items-center cursor-pointer">
          <input
            checked={isPrivate}
            onChange={handleChange}
            type="checkbox"
            value=""
            class="sr-only peer"
          />
          <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default AccountPrivacy;
