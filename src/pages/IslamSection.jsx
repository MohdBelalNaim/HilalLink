import React, { useState } from "react";
import { BsBell, BsGearFill } from "react-icons/bs";
import { PiSpeakerSimpleHighBold } from "react-icons/pi";
import {
  FaAngleDown,
  FaAngleUp,
  FaBook,
  FaBookOpen,
  FaCalculator,
  FaClock,
  FaCompass,
  FaImage,
  FaPray,
} from "react-icons/fa";
import { FaCoins, FaLocationPin } from "react-icons/fa6";
const IslamSection = () => {
  const [more, setMore] = useState(false);
  return (
    <div >
      <div className="w-[min(560px,96%)] mx-auto py-4 bg-white p-4">
        <div className="rounded-[10px] relative p-4 pb-12 bg-gradient-to-b from-purple-400 to-purple-800">
          <div
            onClick={() => setMore(!more)}
            className="bg-green-400 left-[50%] cursor-pointer -translate-x-[50%] text-white p-1 grid place-items-center rounded-full absolute -bottom-5 border-4 border-white z-40"
          >
            {more ? <FaAngleUp size={22} /> : <FaAngleDown size={22} />}
          </div>
          <div className="text-white flex justify-between items-center">
            <div>Salah Timing</div>
            <div className="text-xs">Lucknow, Uttar Pradesh, IN</div>
            <div className="flex gap-3">
              <div className="bg-white text-purple-500 p-1.5 rounded-full">
                <BsBell />
              </div>
              <div className="bg-white text-purple-500 p-1.5 rounded-full">
                <BsGearFill />
              </div>
            </div>
          </div>
          <div className="relative flex justify-center items-center mt-5">
            <div className="absolute -bottom-4 bg-blue-700 text-white font-bold text-xl p-2 rounded-full">
              <PiSpeakerSimpleHighBold />
            </div>
            <div
              className="h-[192px] w-96 bg-green-400 border-t-8 border-l-8 border-r-8 border-yellow-300
            rounded-tl-full rounded-tr-full flex flex-col justify-center items-center"
            >
              <div className="font-bold text-xs">Upcoming : ASAR</div>
              <div className="font-bold text-4xl mt-10">
                4:15 <span className="text-xl">PM</span>
              </div>
            </div>
          </div>
          <div className="bg-white flex justify-between px-3 mt-6 rounded-[4px] max-sm:w-[100%] w-[78%] mx-auto p-2 bg-gradient-to-b from-purple-800 to-purple-400 text-white">
            <div>
              <div className="text-xs">Fajar</div>
              <div className="text-sm">4:45 AM</div>
            </div>
            <div>
              <div className="text-xs">Dohar</div>
              <div className="text-sm">4:45 AM</div>
            </div>
            <div>
              <div className="text-xs">Asar</div>
              <div className="text-sm">4:45 AM</div>
            </div>
            <div>
              <div className="text-xs">Magrib</div>
              <div className="text-sm">4:45 AM</div>
            </div>
            <div>
              <div className="text-xs">Isha</div>
              <div className="text-sm">4:45 AM</div>
            </div>
          </div>
        </div>
        {more && (
          <div className="grid gap-y-3 bg-gradient-to-b from-purple-400 to-purple-800 text-white rounded-[10px] mt-2 p-4">
            {"abcdef".split("").map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-yellow-400 rounded-[6px] p-3">
                <div>
                  <div className="text-sm">Fajar</div>
                  <div className="text-xs">4:45 AM</div>
                </div>
                <div className="bg-red-800 rounded-full p-2 text-white">
                  <PiSpeakerSimpleHighBold />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaBookOpen size={32} />
            <div className="mt-4">Al Quran</div>
          </div>
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaBook size={32} />
            <div className="mt-4">Hadith</div>
          </div>
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaPray size={32} />
            <div className="mt-4">Tasbih</div>
          </div>
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaClock size={32} />
            <div className="mt-4">Prayer Timing</div>
          </div>
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaLocationPin size={32} />
            <div className="mt-4">Locate Mosque</div>
          </div>
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaCompass size={32} />
            <div className="mt-4">Qibla Compass</div>
          </div>
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaCoins size={32} />
            <div className="mt-4">Donate Zakat</div>
          </div>
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaCalculator size={32} />
            <div className="mt-4">Zakat Calculator</div>
          </div>
          <div className="gradient-card p-4 rounded-[10px] text-center text-white flex flex-col justify-center items-center">
            <FaImage size={32} />
            <div className="mt-4">Islamic Wallpaper</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslamSection;

