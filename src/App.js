import Logo from "./images/Logo.png";
import BarGraph from "./components/BarGraph";
import CompanyCard from "./components/CompanyCard";
import { useState, useEffect } from "react";

const test_id = "65c26685a0055c6f9938cd31";

export default function App() {
  const [day, setDay] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setDay(new Date("2024-03-26"));
    loadApiData(test_id);
    console.log("hiiii" + response);
  }, []);

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
        console.log("Fetched response", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {/* Navbar: Logo and title */}
      <div className="flex flex-row items-center p-2">
        <img src={Logo} alt="logo" className="h-12" />
        <h1 className="text-2xl font-bold ml-4">QuikCal Dashboard</h1>
      </div>
      {/* Body */}
      <div className="flex flex-col items-center p-4 bg-gray-200 h-[calc(100vh-64px)]">
        <div className="w-3/4 h-[65vh] bg-white rounded-2xl shadow-lg flex justify-center items-center space-x-10">
          {/* Left arrow button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            className="stroke-gray-500 w-6 h-6 cursor-pointer"
            class="w-6 h-6"
            onClick={() => {}}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          {/* Using this weird styling here because idk the graph library is being weird */}
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
            class="w-6 h-6"
            onClick={() => {}}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>

        <div className="flex flex-wrap justify-center w-3/4 h-[35vh] overflow-auto bg-white rounded-2xl shadow-lg mt-4 pt-1">
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
        </div>
      </div>
    </div>
  );
}
