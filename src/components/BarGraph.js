/*
 * Uses react-charts to create a bar graph of the weekly deliveries
 */

import React from "react";
import { useState } from "react";
import { Chart } from "react-charts";

// Formats data for the bar graph
// Returns array of objects with day of week and total deliveries
const formatData = async (inputDate, resp) => {
  if (!resp) {
    return [];
  }

  const deliveries = resp;

  const date = new Date(inputDate);
  const dateSunday = new Date(date);
  dateSunday.setDate(date.getDate() - date.getDay());
  console.log("BG: date.getDay(): ", date.getDay());

  const dateSaturday = new Date(dateSunday);
  dateSaturday.setDate(dateSunday.getDate() + 6);

  const weeklyEventCount = new Array(7).fill(0);

  deliveries.forEach((delivery) => {
    const deliveryDate = new Date(delivery.date + "T" + delivery.start);
    deliveryDate.setHours(0, 0, 0, 0);

    if (deliveryDate >= dateSunday && deliveryDate <= dateSaturday) {
      const dayNumber = deliveryDate.getDay();
      weeklyEventCount[dayNumber] += 1;
    }
  });

  return weeklyEventCount.map((deliveriesNum, daynum) => ({
    dayOfWeek: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][daynum],
    totalDeliveries: deliveriesNum,
  }));
};

export default function BarGraph({ day, response }) {
  const [data, setData] = useState([
    {
      label: "Deliveries",
      data: [
        {
          day: "Sunday",
          number: 0,
        },
      ],
    },
  ]);

  // Runs when component mounts and every time day and response changes
  React.useEffect(() => {
    if (!response) {
      return;
    }
    const fetchData = async () => {
      const data = await formatData(day, response);
      const formattedData = [
        {
          label: "Deliveries",
          data: [
            {
              day: "Sunday",
              number: data[0].totalDeliveries,
            },
            {
              day: "Monday",
              number: data[1].totalDeliveries,
            },
            {
              day: "Tuesday",
              number: data[2].totalDeliveries,
            },
            {
              day: "Wednesday",
              number: data[3].totalDeliveries,
            },
            {
              day: "Thursday",
              number: data[4].totalDeliveries,
            },
            {
              day: "Friday",
              number: data[5].totalDeliveries,
            },
            {
              day: "Saturday",
              number: data[6].totalDeliveries,
            },
          ],
        },
      ];
      setData(formattedData);
    };
    fetchData();
  }, [day, response]);

  // Below is just react-charts stuff. Check docs for more info
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.day,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.number,
      },
    ],
    []
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <h1
        style={{
          textAlign: "center",
          margin: 10,
          fontSize: "2.0em",
          fontWeight: "bold",
        }}
      >
        Weekly Delivery Chart
      </h1>
      <div style={{ flex: 1 }}>
        {" "}
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            primaryCursor: false,
            secondaryCursor: false,
          }}
        />
      </div>
    </div>
  );
}
