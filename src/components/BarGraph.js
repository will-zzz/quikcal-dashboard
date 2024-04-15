import React from "react";
import { useState } from "react";
import useDemoConfig from "./useDemoConfig.tsx";
import { AxisOptions, Chart } from "react-charts";
import { get } from "firebase/database";

const getData = async (inputDate) => {
  //fetch the json data
  const response = await fetch("testData.json");
  const deliveries = await response.json();
  console.log("JSON Data", deliveries);

  const date = inputDate; // Don't need to parse, just inputing the date through new Date()
  const dateSunday = new Date(date);
  dateSunday.setDate(date.getDate() - date.getDay()); //this gets last Sunday's date
  const dateSaturday = new Date(dateSunday);
  dateSaturday.setDate(dateSaturday.getDate() + 6); //add to Saturday (end of week)

  //array to return with 7 places, filled with 0s
  const weeklyEventCount = new Array(7).fill(0);

  deliveries.forEach((delivery) => {
    const deliveryDate = new Date(delivery.date);
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

export default function BarGraph() {
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

  React.useEffect(() => {
    const fetchData = async () => {
      // const data = await getData(new Date());
      const data = await getData(new Date("2024-03-26"));
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
  }, []);

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

  // Async function that when press "e" console logs getData (only 1 e press)
  window.addEventListener("keydown", async (e) => {
    if (e.key === "e") {
      console.log(await getData(new Date()));
    }
  });

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        primaryCursor: false,
        secondaryCursor: false,
      }}
    />
    // <></>
  );
}
