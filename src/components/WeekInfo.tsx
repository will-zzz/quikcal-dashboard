/*
 * Right component of app displaying weekly information
 */
import React, { useEffect, useState } from "react";

const WeekInfo = ({ date, deliveries }) => {
  return (
    <div className="bg-white w-1/4 my-4 mr-4 p-2 rounded-3xl flex flex-col text-center justify-start pt-4 overflow-auto space-y-3 shadow-lg">
      <p className="text-3xl">{date}</p>
      <p className="text-sm text-gray-500">Information about your deliveries</p>
      <div className="flex flex-col p-2 overflow-auto bg-gray-200 mb-2 rounded-xl text-center justify-center space-y-2 text-2xl">
        <p>Deliveries</p>
        <p className="text-gray-500">{deliveries}</p>
      </div>
      <div className="flex flex-col p-2 overflow-auto bg-gray-200 mb-2 rounded-xl text-center justify-center space-y-2 text-2xl">
        <p>Completed</p>
        <p className="text-gray-500">0</p>
      </div>
    </div>
  );
};

export default WeekInfo;
