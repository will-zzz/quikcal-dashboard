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
    <div className="flex flex-col justify-start w-3/4 h-[35vh] overflow-auto bg-white rounded-2xl shadow-lg mt-4 px-2">
      <h2 className="text-3xl mt-1 text-center">{weekDay}</h2>
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
  );
};

export default DayInfo;
