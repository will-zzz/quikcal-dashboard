import React from "react";
import useDemoConfig from "./useDemoConfig.tsx";
import { AxisOptions, Chart } from "react-charts";

export default function BarGraph() {
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

  const data = [
    {
      label: "Deliveries",
      data: [
        {
          day: "Monday",
          number: 4,
        },
        {
          day: "Tuesday",
          number: 7,
        },
        {
          day: "Wednesday",
          number: 8,
        },
        {
          day: "Thursday",
          number: 3,
        },
        {
          day: "Friday",
          number: 5,
        },
        {
          day: "Saturday",
          number: 6,
        },
        {
          day: "Sunday",
          number: 2,
        },
      ],
    },
  ];

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
  );
}
