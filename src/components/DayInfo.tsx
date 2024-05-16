/*
 * Bottom component of app displaying daily information
 */

import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard.tsx";

const DayInfo = ({
  response,
  day,
  nextDay,
  previousDay,
  isSameDay,
  deliveries,
}) => {
  const [weekDay, setWeekDay] = useState("");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Sets the day of the week
  // Runs when component mounts and every time day changes
  useEffect(() => {
    setWeekDay(day ? days[day.getDay()] : "");
    console.log("Today", day.getFullYear(), day.getMonth(), day.getDate());
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
            const deliveryDate = new Date(delivery.date + "T" + delivery.start);
            if (isSameDay(deliveryDate, day)) {
              console.log(
                "Card",
                deliveryDate.getFullYear(),
                deliveryDate.getMonth(),
                deliveryDate.getDate()
              );
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
      <div className="flex flex-col w-1/3">
        <div className="flex flex-col p-2 overflow-auto bg-gray-200 mb-2 rounded-xl text-center justify-center space-y-2 text-2xl">
          <p>Deliveries</p>
          <p className="text-gray-500">{deliveries}</p>
        </div>
        <div className="flex flex-col p-2 overflow-auto bg-gray-200 mb-2 rounded-xl text-center justify-center space-y-2 text-2xl">
          <p>Completed</p>
          <p className="text-gray-500">0</p>
        </div>
      </div>
    </div>
  );
};

export default DayInfo;
