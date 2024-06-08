import CompactSidebar from "@/components/CompactSidebar";
import React from "react";
import { Link } from "react-router-dom";

const Verification = () => {
  return (
    <div>
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto py-8">
        <div className="text-xl font-bold">Profile Verification</div>
        <div className="text-sm mt-2">
          Verification on HilalLink signifies that the platform has confirmed
          the authenticity of a user's profile or page, ensuring it represents a
          real individual, business, or entity. Verified profiles are unique,
          meaning there is only one verified presence for each person or
          business, with exceptions made for language-specific variations. To
          apply for verification, users must adhere to the platform's terms of
          service and community standards, have a complete profile with an about
          section, profile photo, and recent activity, and be notable by being
          well-known and frequently searched for. Notable profiles or pages are
          often featured in various news sources, and promotional content is not
          considered for verification. If a profile or page does not meet the
          verification criteria, other methods can still be used to indicate its
          authenticity on the platform.
        </div>
        <div className="text-xl font-bold mt-7">
          Features for verified users
        </div>
        <div className="text-sm mt-2 ">
          <ol className="list-decimal ml-5">
            <li>
              Verified Checkmark: A verified badge to signify authenticity.{" "}
            </li>
            <li>Edit Post: Ability to edit posts after publishing.</li>
            <li>Longer Posts: Increased character limit for posts.</li>
            <li>Undo Post: Option to undo or delete a post.</li>
            <li>Write Articles: Ability to write and publish articles. </li>
            <li>
              Post Videos: Ability to post videos up to 20 minutes in Full HD
              (1080p) resolution.{" "}
            </li>
            <li>Unlimited Messages: No limits on sending messages. </li>
            <li>
              Extra Post Reach and Engagement: Enhanced visibility and
              engagement for posts.
            </li>
          </ol>
        </div>
        <Link to="/verification/details">
          <div className="cursor-pointer mb-12 bg-primary text-center py-2 rounded-full mt-10">
            Get started
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Verification;
