import Logo from "./images/Logo.png";
import BarGraph from "./components/BarGraph";
import CompanyCard from "./components/CompanyCard";
import { useState, useEffect } from "react";
import DayInfo from "./components/DayInfo";
import WeekInfo from "./components/WeekInfo";

const test_id = "65c26685a0055c6f9938cd31";

export default function App() {
  const [day, setDay] = useState(new Date("2024-03-25")); // Use state directly for day
  const [response, setResponse] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rawSunday, setRawSunday] = useState(null);
  const [rawSaturday, setRawSaturday] = useState(null);
  const [numDeliveries, setNumDeliveries] = useState(0);

  useEffect(() => {
    if (!response) {
      loadApiData(test_id);
    }
    setDates(day);
    getNumDeliveries();
  }, [day, response]);

  const loadApiData = async (projectId) => {
    const url = "http://quikcal.com:3002/events/list";
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

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
            <div style={{ height: "95%", width: "85%" }}>
              <BarGraph day={day} response={response} />
            </div>
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
          />
        </div>
        <WeekInfo
          date={`${startDate} - ${endDate}`}
          deliveries={numDeliveries}
        />
      </div>
    </div>
  );
}
