/*
 * Main component that renders the entire application
 */

import Logo from "./images/Logo.png";
import BarGraph from "./components/BarGraph.tsx";
import { useState, useEffect } from "react";
import DayInfo from "./components/DayInfo.tsx";
import WeekInfo from "./components/WeekInfo.tsx";

const test_id = "65c26685a0055c6f9938cd31";

export default function App() {
  const [day, setDay] = useState(new Date());
  const [response, setResponse] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rawSunday, setRawSunday] = useState(null);
  const [rawSaturday, setRawSaturday] = useState(null);
  const [numWeeklyDeliveries, setNumWeeklyDeliveries] = useState(null);
  const [numDailyDeliveries, setNumDailyDeliveries] = useState(null);

  // Calls API to get data and calls day-setting function
  // Runs when component mounts and every time day or response changes
  useEffect(() => {
    if (!response) {
      loadApiData("http://quikcal.com:3002", "events", test_id);
    }
    setDates(day);
    getNumDailyDeliveries();
  }, [day, response]);

  // Sets # of deliveries
  // Runs when component mounts and every time endDate or response changes
  useEffect(() => {
    if (startDate && endDate) {
      getNumWeeklyDeliveries();
    }
  }, [endDate, response]);

  // Fetches ALL data from API
  const loadApiData = async (site, dir, projectId) => {
    const url = `${site}/${dir}/list`;
    const data = { projectId };
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await resp.json();
      setResponse(json);
      console.log("Fetched response from API", json);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Sets start and end dates of the week
  const setDates = (inputDate) => {
    const baseDate = new Date(inputDate);
    baseDate.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    setRawSunday(startOfWeek);
    setRawSaturday(endOfWeek);

    setStartDate(formatDate(startOfWeek));
    setEndDate(formatDate(endOfWeek));
  };

  // Formats date to MM/DD/YYYY
  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Helper function to check if two dates are the same
  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Gets number of deliveries in a week
  const getNumWeeklyDeliveries = () => {
    let count = 0;
    if (!response) {
      return;
    }
    response.forEach((delivery) => {
      const deliveryDate = new Date(delivery.date + "T" + delivery.start);
      deliveryDate.setHours(0, 0, 0, 0);

      if (deliveryDate >= rawSunday && deliveryDate <= rawSaturday) {
        count += 1;
      }
    });
    setNumWeeklyDeliveries(count);
  };

  // Gets number of deliveries in a day
  const getNumDailyDeliveries = () => {
    let count = 0;
    if (!response) {
      return;
    }
    response.forEach((delivery) => {
      const deliveryDate = new Date(delivery.date + "T" + delivery.start);
      deliveryDate.setHours(0, 0, 0, 0);

      if (isSameDay(deliveryDate, day)) {
        count += 1;
      }
    });
    setNumDailyDeliveries(count);
  };

  // These functions are for arrows to move between days and weeks
  const moveToPreviousWeek = () => {
    setDay(new Date(day.setDate(day.getDate() - 7)));
  };

  const moveToNextWeek = () => {
    setDay(new Date(day.setDate(day.getDate() + 7)));
  };

  const moveToNextDay = () => {
    setDay(new Date(day.setDate(day.getDate() + 1)));
  };

  const moveToPreviousDay = () => {
    setDay(new Date(day.setDate(day.getDate() - 1)));
  };

  return (
    <div>
      <div className="flex flex-row items-center p-2">
        <img src={Logo} alt="logo" className="h-12" />
        <h1 className="text-2xl font-bold ml-4">QuikCal Dashboard</h1>
      </div>
      <div className="flex flex-row bg-gray-200">
        <div className="flex flex-col items-center p-4 h-[calc(100vh-64px)] w-3/4">
          <div className="w-full h-[65vh] bg-white rounded-2xl shadow-lg flex justify-center items-center space-x-10">
            {/* Left button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              className="stroke-gray-500 w-6 h-6 cursor-pointer"
              onClick={moveToPreviousWeek}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            {/* Bargraph */}
            <div style={{ height: "95%", width: "85%" }}>
              <BarGraph day={day} response={response} />
            </div>
            {/* Right button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              className="stroke-gray-500 w-6 h-6 cursor-pointer"
              onClick={moveToNextWeek}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <DayInfo
            response={response}
            day={day}
            nextDay={() => moveToNextDay()}
            previousDay={() => moveToPreviousDay()}
            isSameDay={isSameDay}
            deliveries={numDailyDeliveries}
          />
        </div>
        <WeekInfo
          date={`${startDate} - ${endDate}`}
          deliveries={numWeeklyDeliveries}
        />
      </div>
    </div>
  );
}
