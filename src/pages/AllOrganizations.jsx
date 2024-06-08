import React from "react";
import CompactSidebar from "../components/CompactSidebar";
import PeopleCard from "../components/PeopleCard";

const AllOrganizations = () => {
  return (
    <div>
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto">
        <div className="text-lg font-bold py-4">All Organizations on HilalLink</div>
        <div className="bg-white rounded-md overflow-hidden">
          {"abcdefhijklmnop".split("").map((item, index) => {
            return <PeopleCard index={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AllOrganizations;
