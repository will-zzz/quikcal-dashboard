import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";

const DayInfo = ({ response, day }) => {
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

  useEffect(() => {
    setWeekDay(day ? days[day.getDay()] : "");
  }, [day]);

  return (
    <div className="flex flex-row w-3/4 h-[35vh] overflow-auto bg-white mt-4 px-2 rounded-2xl shadow-lg pt-2">
      <div className="flex flex-col justify-start w-2/3 overflow-auto mr-2">
        <h2 className="text-3xl text-center">{weekDay}</h2>
        {/* Map company cards whose date is current day */}
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
      <div className="flex flex-col w-1/3 bg-gray-200 mb-2 rounded-xl text-center justify-center space-y-10 text-2xl">
        <p>Deliveries: 4</p>
        <p>Delivered: 0</p>
        <p>To-be Delivered: 4</p>
      </div>
    </div>
  );
};

export default DayInfo;
