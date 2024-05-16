/*
 * Single company card component
 */

import React, { useState } from "react";

const CompanyCard = ({ key, name, start, end, info }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Changes dropdown status every time it's clicked
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col w-full bg-gray-200 my-1 px-4 rounded-lg h-auto">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-500">{name}</h2>
          <p className="pl-4 text-gray-500">
            {start} - {end}
          </p>
        </div>
        <div className="flex items-center">
          {/* <p className="text-m font-bold pl-4 text-gray-500 mr-2">Completed</p>
          <button
            className="w-7 h-7 rounded-full border-2 border-gray-500 mr-2"
            onClick={() => {}}
          ></button> */}
          {/* Dropdown arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            className="w-6 h-6 cursor-pointer stroke-gray-500"
            onClick={() => toggleDropdown()}
          >
            {/* Conditionally render based on dropdown status */}
            {dropdownOpen && (
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            )}
            {!dropdownOpen && (
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            )}
          </svg>
        </div>
      </div>
      {/* Description */}
      {dropdownOpen && <p className="text-gray-500 text-m mx-4 mb-2">{info}</p>}
    </div>
  );
};

export default CompanyCard;
