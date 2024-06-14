import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup/Signup";
import BasicDetails from "./pages/Signup/BasicDetails";
import Verification from "./pages/Signup/Verification";
import AddressDetails from "./pages/Signup/AddressDetails";
import Bio from "./pages/Signup/Bio";
import Photo from "./pages/Signup/Photo";
import Final from "./pages/Signup/Final";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import AllPeople from "./pages/AllPeople";
import AllOrganizations from "./pages/AllOrganizations";
import { Messages } from "./pages/Messages";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";
import IslamSection from "./pages/IslamSection";
import Chat from "./pages/Chat";
import MobileNavbar from "./components/MobileNavbar";
import MobileSettings from "./pages/MobileSettings";
import AccountPrivacy from "./components/Settings/AccountPrivacy";
import ChangePassword from "./components/Settings/ChangePassword";
import BlockedAccounts from "./components/Settings/BlockedAccounts";
import Notifications from "./components/Settings/Notifications";
import MessagePrivacy from "./components/Settings/MessagePrivacy";
import Activity from "./components/Settings/Activity";
import TagsAndMentions from "./components/Settings/TagsAndMentions";
import DeleteAccount from "./components/Settings/DeleteAccount";
import AccountVerification from "./pages/Verification/Verification";
import VerificationDetails from "./pages/Verification/VerificationDetails";
import VerificationOtp from "./pages/Verification/VerificationOtp";
import Confirmation from "./pages/Verification/Confirmation";
import MobileNotifications from "./pages/Notifications";
import MobileBottomNavbar from "./components/MobileBottomNavbar";
import SavedPost from "./pages/SavedPost";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordChange from "./pages/PasswordChange";
import PostDetails from "./pages/PostDetails";
import Search from "./pages/Search";
import EditPost from "./components/EditPost";
import Followers from "./pages/Profile/Followers";
import Followings from "./pages/Profile/Followings";
import ReportPost from "./pages/ReportPost";
import NewProfile from "./pages/NewProfile";
import CompactSidebar from "./components/CompactSidebar";
import ReportMessage from "./pages/ReportMessage";
import ReportUser from "./pages/ReportUser";

function App() {
  return (
    <BrowserRouter>
      <CompactSidebar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/basic-details" element={<BasicDetails />} />
        <Route path="/signup/verification" element={<Verification />} />
        <Route path="/signup/address" element={<AddressDetails />} />
        <Route path="/signup/bio" element={<Bio />} />
        <Route path="/signup/photo" element={<Photo />} />
        <Route path="/signup/final" element={<Final />} />
        <Route path="/change-password" element={<PasswordChange />} />

        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/all-people" element={<AllPeople />} />
        <Route path="/all-organizations" element={<AllOrganizations />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/islam-section" element={<IslamSection />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/mobile-settings" element={<MobileSettings />} />
        <Route path="/post-details/:id" element={<PostDetails />} />

        <Route path="/search" element={<Search />} />

        <Route path="/edit/:id" element={<EditPost />} />

        <Route path="/mobile/account-privacy" element={<AccountPrivacy />} />
        <Route path="/mobile/change-password" element={<ChangePassword />} />
        <Route path="/mobile/blocked" element={<BlockedAccounts />} />
        <Route path="/mobile/notifications" element={<Notifications />} />
        <Route path="/mobile/message-privacy" element={<MessagePrivacy />} />
        <Route path="/mobile/activity" element={<Activity />} />
        <Route path="/mobile/tags" element={<TagsAndMentions />} />
        <Route path="/mobile/delete" element={<DeleteAccount />} />

        <Route path="/verification/home" element={<AccountVerification />} />
        <Route path="/verification/details" element={<VerificationDetails />} />
        <Route path="/verification/otp" element={<VerificationOtp />} />
        <Route path="/verification/confirmation" element={<Confirmation />} />

        <Route path="/notifications" element={<MobileNotifications />} />
        <Route path="/saved" element={<SavedPost />} />

        <Route path="/followers/:id" element={<Followers />} />
        <Route path="/followings/:id" element={<Followings />} />

        <Route path="report-post/:id" element={<ReportPost />} />
        <Route path="report-message/:id" element={<ReportMessage />} />
        <Route path="report-user/:id" element={<ReportUser />} />

        <Route path="/newprofile/:id" element={<NewProfile />} />
      </Routes>
      <MobileBottomNavbar />
    </BrowserRouter>
  );
}

export default App;
