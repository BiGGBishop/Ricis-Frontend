"use client";
import { ApexCharts } from "@/utils/chartHelpers";

const SplineAreaChart = () => {
  const series = [
    { name: "stat", data: [10, 20, 39, 12, 23, 45, 46, 55, 66, 7, 43, 32] },
  ];

  const options = {
    chart: {
      group: "sparklines",
      type: "area",
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 8,
        left: 4,
        blur: 4,
        opacity: 1,
        color: "#ccc",
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      min: 0,
      show: false,
    },
    xaxis: {
      //   type: 'datetime',
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: "#061b16",
  };

  return (
    <ApexCharts
      type="area"
      width={200}
      height={100}
      options={options}
      series={series}
    />
  );
};

export default SplineAreaChart;
