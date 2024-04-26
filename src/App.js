import Logo from "./images/Logo.png";
import BarGraph from "./components/BarGraph";
import CompanyCard from "./components/CompanyCard";
import { useState, useEffect } from "react";
import DayInfo from "./components/DayInfo";
import WeekInfo from "./components/WeekInfo";

const test_id = "65c26685a0055c6f9938cd31";
const testDay = new Date("2024-03-25");

export default function App() {
  const [day, setDay] = useState(null);
  const [response, setResponse] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rawSunday, setRawSunday] = useState(null);
  const [rawSaturday, setRawSaturday] = useState(null);
  const [numDeliveries, setNumDeliveries] = useState(0);

  useEffect(() => {
    setDay(testDay);
    if (!response) {
      loadApiData(test_id);
    }
    setDates(testDay);
    getNumDeliveries();
  }, [response]);

  const loadApiData = async (projectId) => {
    const url = "http://quikcal.com:3002/events/list";
    const data = {
      projectId: projectId,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        console.log("Fetched response from API", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const setDates = (inputDate) => {
    const date = new Date(inputDate);
    date.setHours(0, 0, 0, 0);
    const dateSunday = new Date(date);
    dateSunday.setDate(date.getDate() - date.getDay());
    const dateSaturday = new Date(dateSunday);
    dateSaturday.setDate(dateSunday.getDate() + 6);
    setRawSunday(dateSunday);
    setRawSaturday(dateSaturday);
    const formattedSunday =
      dateSunday.getMonth() +
      1 +
      "/" +
      dateSunday.getDate() +
      "/" +
      dateSunday.getFullYear();
    const formattedSaturday =
      dateSaturday.getMonth() +
      1 +
      "/" +
      dateSaturday.getDate() +
      "/" +
      dateSaturday.getFullYear();
    setStartDate(formattedSunday);
    setEndDate(formattedSaturday);
    return;
  };

  const getNumDeliveries = () => {
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
    setNumDeliveries(count);
    return;
  };

  return (
    <div>
      {/* Navbar: Logo and title */}
      <div className="flex flex-row items-center p-2">
        <img src={Logo} alt="logo" className="h-12" />
        <h1 className="text-2xl font-bold ml-4">QuikCal Dashboard</h1>
      </div>
      {/* Body */}
      <div className="flex flex-row bg-gray-200">
        {/* Graph & Daily Stats */}
        <div className="flex flex-col items-center p-4 pt-0 h-[calc(100vh-64px)] w-3/4">
          <h2 className="my-2 text-3xl">
            {startDate} - {endDate}
          </h2>
          <h2 className="my-2 text-3xl">Total Deliveries: {numDeliveries}</h2>
          <div className="w-full h-[65vh] bg-white rounded-2xl shadow-lg flex justify-center items-center space-x-10">
            {/* Left arrow button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              className="stroke-gray-500 w-6 h-6 cursor-pointer"
              onClick={() => {}}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            {/* Graph */}
            <div style={{ height: "95%", width: "85%" }}>
              <BarGraph day={day} response={response} />
            </div>
            {/* Right arrow button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              className="stroke-gray-500 w-6 h-6 cursor-pointer"
              onClick={() => {}}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>

          <DayInfo response={response} day={day} />
        </div>
        {/* Weekly Stats */}
        <WeekInfo response={response} day={day} />
      </div>
    </div>
  );
}
