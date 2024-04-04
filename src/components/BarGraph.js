import React from "react";
import useDemoConfig from "./useDemoConfig.tsx";
import { AxisOptions, Chart } from "react-charts";

export default function BarGraph() {
  //   const { data } = useDemoConfig({
  //     series: 3,
  //     dataType: "ordinal",
  //   });

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.likes,
      },
    ],
    []
  );

  const data = [
    {
      label: "Deliveries",
      data: [
        {
          primary: "Monday",
          likes: 4,
        },
        {
          primary: "Tuesday",
          likes: 7,
        },
        {
          primary: "Wednesday",
          likes: 8,
        },
        {
          primary: "Thursday",
          likes: 3,
        },
        {
          primary: "Friday",
          likes: 5,
        },
        {
          primary: "Saturday",
          likes: 6,
        },
        {
          primary: "Sunday",
          likes: 2,
        },
      ],
    },
    // {
    //   label: "Returns",
    //   data: [
    //     {
    //       primary: "Monday",
    //       likes: 3,
    //     },
    //     {
    //       primary: "Tuesday",
    //       likes: 6,
    //     },
    //     {
    //       primary: "Wednesday",
    //       likes: 7,
    //     },
    //     {
    //       primary: "Thursday",
    //       likes: 2,
    //     },
    //     {
    //       primary: "Friday",
    //       likes: 4,
    //     },
    //     {
    //       primary: "Saturday",
    //       likes: 5,
    //     },
    //     {
    //       primary: "Sunday",
    //       likes: 1,
    //     },
    //   ],
    // },
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
