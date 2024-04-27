/*
 * Bottom component of app displaying daily information
 */

import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";

const DayInfo = ({ response, day, nextDay, previousDay }) => {
  const [weekDay, setWeekDay] = useState("");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "",
  ];

  // Sets the day of the week
  // Runs when component mounts and every time day changes
  useEffect(() => {
    setWeekDay(day ? days[day.getDay()] : "");
  }, [day]);

  return (
    <div className="flex flex-row w-full h-[35vh] overflow-auto bg-white mt-4 px-2 rounded-2xl shadow-lg pt-2">
      <div className="flex flex-col justify-start w-2/3 overflow-auto mr-2">
        <div className="flex flex-row justify-evenly align-middle">
          {/* Left button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            className="stroke-gray-500 w-6 h-6 cursor-pointer"
            onClick={() => previousDay()}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          {/* Day text */}
          <h2 className="text-3xl text-center select-none">{weekDay}</h2>
          {/* Right button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            className="stroke-gray-500 w-6 h-6 cursor-pointer"
            onClick={() => nextDay()}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        {/* Display company cards whose date is current day */}
        {response &&
          response.map((delivery) => {
            const deliveryDate = new Date(delivery.date);

            if (deliveryDate.toString() === day.toString()) {
              return (
                <CompanyCard
                  key={delivery._id}
                  name={delivery.name}
                  start={delivery.start}
                  end={delivery.end}
                  info={delivery.description}
                />
              );
            }
            return null;
          })}
      </div>
      {/* Hard-coded element for daily stats */}
      <div className="flex flex-col w-1/3 overflow-auto bg-gray-200 mb-2 rounded-xl text-center justify-center space-y-10 text-2xl">
        <p>Deliveries: 4</p>
        <p>Delivered: 0</p>
        <p>To-be Delivered: 4</p>
      </div>
    </div>
  );
};

export default DayInfo;
