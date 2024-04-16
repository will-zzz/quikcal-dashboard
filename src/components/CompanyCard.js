import React from "react";

const CompanyCard = () => {
  // Grey, rounded-edges card with a company name
  return (
    <div className="flex items-center justify-start w-full h-1/4 bg-gray-200 m-2 rounded-lg">
      <h2 className="text-xl font-bold pl-4 text-gray-500">Company Name</h2>
    </div>
  );
};

export default CompanyCard;
