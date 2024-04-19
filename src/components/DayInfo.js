import React, { useState } from "react";
import CompanyCard from "./CompanyCard";

const DayInfo = ({ response }) => {
  const [weekDay, setWeekDay] = useState("Sunday");

  return (
    <div className="flex flex-col justify-start w-3/4 h-[35vh] overflow-auto bg-white rounded-2xl shadow-lg mt-4 px-2">
      <h2 className="text-3xl mt-1 text-center">{weekDay}</h2>
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
  );
};

export default DayInfo;
