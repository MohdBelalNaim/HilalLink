import React, { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCreate } from "../redux/toggleSlice";
import Settings from "./Sidebar/Settings";
import Home from "./Sidebar/Home";
import Notifications from "./Sidebar/Notifications";
import Explore from "../components/Sidebar/Explore";
import CreatePost from "./CreatePost";
import avatar from "../assets/images/avatar.jpeg";
import { loginUser } from "@/redux/userSlice";
import PostDetails from "./PostDetails";
import Search from "../components/Sidebar/Search";
import Minibar from "./Sidebar/Minibar";

const CompactSidebar = () => {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.userSlice.base_url);
  const { pathname } = useLocation();
  const [explore, setExplore] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [settings, setSettings] = useState(false);
  const [home, setHome] = useState(false);
  const [message, setMessage] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [search, setSearch] = useState(false);
  const [saved, setSaved] =useState(false)
  const [islam, setIslam] =useState(false)
  const [myprofile, setMyprofile] =useState(false)
  const [unreadCount, setUnreadCount] = useState(0);
  const details = useSelector((state) => state.toggleSlice.details);
  const[profile, setProfile] = useState(false)
  const[postDetail, setPostDetail] = useState(false)
  const[follower, setFollower] = useState(false);
  const[following, setFollowing] = useState(false);

  const fetchUnreadCount = () => {
    fetch(`${base}/notification/count`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Unread notifications count:", data);
        setUnreadCount(data.data.length);
      })
      .catch((err) => {
        console.error("Failed to fetch unread notifications count:", err);
      });
  };

  const NotificationRead = () => {
    fetch(`${base}/notification/uncount`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUnreadCount(0);
        console.log("All notification read");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchUnreadCount();
    if (pathname === "/" || pathname.includes("/signup")) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/home") {
      setHome(true);
      setExplore(false);
      setNotifications(false);
      setSearch(false);
      setSettings(false);
      setMessage(false)
      setSaved(false)
      setIslam(false)
      setMyprofile(false)
      setProfile(false)
      setPostDetail(false)
      setFollower(false)
      setFollowing(false)
    } else if (pathname === "/explore") {
      setHome(false);
      setExplore(true);
      setNotifications(false);
      setSearch(false);
      setSettings(false);
      setMessage(false)
      setSaved(false)
      setIslam(false)
      setMyprofile(false)
      setProfile(false)
      setPostDetail(false)
      setFollower(false)
      setFollowing(false)
    } else if (pathname === "/settings") {
      setHome(false);
      setExplore(false);
      setNotifications(false);
      setSearch(false);
      setSettings(true);
      setMessage(false)
      setSaved(false)
      setIslam(false)
      setMyprofile(false)
      setProfile(false)
      setPostDetail(false)
      setFollower(false)
      setFollowing(false)
    } else if (pathname === "/search") {
      setHome(false);
      setExplore(false);
      setNotifications(false);
      setSearch(true);
      setSettings(false);
      setMessage(false)
      setSaved(false)
      setIslam(false)
      setMyprofile(false)
      setProfile(false)
      setPostDetail(false)
      setFollower(false)
      setFollowing(false)
    } else if (pathname === "/messages") {
      setHome(false);
      setExplore(false);
      setNotifications(false);
      setSearch(false);
      setSettings(false);
      setMessage(true)
      setSaved(false)
      setIslam(false)
      setMyprofile(false)
      setProfile(false)
      setPostDetail(false)
      setFollower(false)
      setFollowing(false)
    }else if (pathname === "/saved") {
      setHome(false);
      setExplore(false);
      setNotifications(false);
      setSearch(false);
      setSettings(false);
      setMessage(false)
      setSaved(true)
      setIslam(false)
      setMyprofile(false)
      setProfile(false)
      setPostDetail(false)
      setFollower(false)
      setFollowing(false)
    }else if (pathname === "/islam-section") {
      setHome(false);
      setExplore(false);
      setNotifications(false);
      setSearch(false);
      setSettings(false);
      setMessage(false)
      setSaved(false)
      setIslam(true)
      setMyprofile(false)
      setProfile(false)
      setPostDetail(false)
      setFollower(false)
      setFollowing(false)
    }else if (pathname === "/my-profile") {
      setHome(false);
      setExplore(false);
      setNotifications(false);
      setSearch(false);
      setSettings(false);
      setMessage(false)
      setSaved(false)
      setIslam(false)
      setMyprofile(true)
      setProfile(false)
      setPostDetail(false)
      setFollower(false)
      setFollowing(false)
    }else if (pathname.startsWith("/profile/")) {
    setHome(false);
    setExplore(false);
    setNotifications(false);
    setSearch(false);
    setSettings(false);
    setMessage(false);
    setSaved(false);
    setIslam(false);
    setMyprofile(false);
    setProfile(true)
    setPostDetail(false)
    setFollower(false)
    setFollowing(false)
    }else if (pathname.startsWith("/post-details/")) {
    setHome(false);
    setExplore(false);
    setNotifications(false);
    setSearch(false);
    setSettings(false);
    setMessage(false);
    setSaved(false);
    setIslam(false);
    setMyprofile(false);
    setProfile(false)
    setPostDetail(true)
    setFollower(false)
    setFollowing(false)
    }else if (pathname.startsWith("/followers/")) {
    setHome(false);
    setExplore(false);
    setNotifications(false);
    setSearch(false);
    setSettings(false);
    setMessage(false);
    setSaved(false);
    setIslam(false);
    setMyprofile(false);
    setProfile(false)
    setPostDetail(false)
    setFollower(true)
    setFollowing(false)
    }else if (pathname.startsWith("/followings/")) {
    setHome(false);
    setExplore(false);
    setNotifications(false);
    setSearch(false);
    setSettings(false);
    setMessage(false);
    setSaved(false);
    setIslam(false);
    setMyprofile(false);
    setProfile(false)
    setPostDetail(false)
    setFollower(false)
    setFollowing(true)
    }else {
      setHome(false);
      setExplore(false);
      setNotifications(false);
      setSearch(false);
      setSettings(false);
      setMessage(false)
      setSaved(false)
      setIslam(false)
      setMyprofile(false)
      setProfile(false)
      setFollower(false)
      setFollowing(false)
    }
  }, [pathname]);

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(loginUser());
  }, [dispatch]);

  const handleNotifications = () => {
    setExplore(false);
    setHome(false);
    setNotifications(!notifications);
    setSearch(false);
    setSettings(false);
    setMessage(false)
    setSaved(false)
    setIslam(false)
    setMyprofile(false)
    setProfile(false)
    setPostDetail(false)
    setFollower(false)
    setFollowing(false)
    setUnreadCount(0);
    NotificationRead();
  };

  const createPost = useSelector((state) => state.toggleSlice.createPost);
  const user = useSelector((state) => state.userSlice.user);

  return (
    <>
      {details && <PostDetails />}
      {createPost && <CreatePost />}
      <div
        className={`${
          hidden ? "hidden" : ""
        } max-sm:hidden fixed h-[100dvh] z-50 flex bg-white pb-4 w-[360px]`}
      >
        {/* {explore && <Explore notifications={handleNotifications} />} */}
        {explore && <Home notifications={handleNotifications}/>}
        {notifications && <Notifications notifications={handleNotifications}/>}
        {home && <Home notifications={handleNotifications} />}
        {settings && <Settings notifications={handleNotifications} />}
        {search && <Home notifications={handleNotifications} />}
        {message && <Home notifications={handleNotifications} />}
        {saved && <Home notifications={handleNotifications} />}
        {islam && <Home notifications={handleNotifications} />}
        {myprofile && <Home notifications={handleNotifications} />}
        {profile && <Home notifications={handleNotifications} />}
        {/* {postDetail && <Minibar notifications={handleNotifications} />} */}
        {postDetail && <Home notifications={handleNotifications} />}
        {follower && <Home notifications={handleNotifications} />}
        {following && <Home notifications={handleNotifications} />}
      </div>
    </>
  );
};

export default CompactSidebar;
