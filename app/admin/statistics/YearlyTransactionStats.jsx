import { selectChart, selectOption } from "@/store/features/statisticsSlice";
import { ApexCharts } from "@/utils/chartHelpers";
import { useState } from "react";
import { useSelector } from "react-redux";
import { generateChartDataCategories } from "@/utils/helpers";

const YearlyTransactionStats = () => {
  const chartData = useSelector(selectChart);
  const selected = useSelector(selectOption);
  console.log(chartData);

  const { categories, data } = generateChartDataCategories(selected, chartData);

  const series = [
    {
      name: "Revenue",
      data: data,
    },
  ];

  const options = {
    chart: {
      width: 500,
      height: 350,
      type: "area",
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.2,
        color: "#94a3b8",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      // type: "months",
      // labels: {
      //   format: "MM",
      // },
      categories: categories,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    colors: ["#4A3AFF"],
  };

  return (
    <div className="bg-white lg:p-6 py-6 px-3 rounded-lg space-y-6 ">
      <ApexCharts
        options={options}
        series={series}
        type="area"
        width={"100%"}
        height={400}
        className="overflow-"
      />
    </div>
  );
};

export default YearlyTransactionStats;
