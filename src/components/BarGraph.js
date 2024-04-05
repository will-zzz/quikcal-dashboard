import React from "react";
import useDemoConfig from "./useDemoConfig.tsx";
import { AxisOptions, Chart } from "react-charts";


const getData = async (inputDate) => { //fetch the json data 
    const response = await fetch('/data.json')
    const deliveries = await response.json()

  const date = new Date(inputDate); //date is now parsed 
  const dateSunday = new Date(date)
  dateSunday.setDate(date.getDate() - date.getDay()) //this gets last Sunday's date 
  const dateSaturday = new Date(dateSunday); 
  dateSaturday.setDate(dateSaturday.getDate() + 6) //add to Saturday (end of week)

  //array to return with 7 places, filled with 0s 
  const weeklyEventCount = new Array(7).fill(0)

  deliveries.forEach(delivery => {
    const deliveryDate = new Date(delivery.date)
    if (deliveryDate >= dateSunday && deliveryDate <= dateSaturday) {
      const dayNumber = deliveryDate.getDay() 
      weeklyEventCount[dayNumber] += 1 
    }
  })
  return weeklyEventCount.map((deliveriesNum, daynum) => ({
    dayOfWeek:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][daynum],
    totalDeliveries: deliveriesNum
  }))
  }
  
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
