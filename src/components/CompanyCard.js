import React, { useState } from "react";

const CompanyCard = ({ name, time, info }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col w-full bg-gray-200 my-1 px-4 rounded-lg h-auto">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-500">{name}</h2>
          <p className="pl-4 text-gray-500">{time}</p>
        </div>
        <div className="flex items-center">
          <p className="text-m font-bold pl-4 text-gray-500 mr-2">Completed</p>
          <button className="w-7 h-7 rounded-full border-2 border-gray-500"></button>
          <button onClick={toggleDropdown} className="mx-2 text-gray-500">
            v
          </button>
        </div>
      </div>
      {dropdownOpen && <p className="text-gray-500 text-m mx-4 mb-2">{info}</p>}
    </div>
  );
};

export default CompanyCard;
