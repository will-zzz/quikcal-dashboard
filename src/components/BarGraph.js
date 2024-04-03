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
          primary: "2022-02-03T00:00:00.000Z",
          likes: 130,
        },
        {
          primary: "2022-03-03T00:00:00.000Z",
          likes: 150,
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
