"use client";

import { CalendarEdit, StatTrend, StatTrendDown, TrendArrow } from "@/svgs";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Image from "next/image";
import { capitalizeFirstLetter, formatNumber } from "@/utils/helpers";
import YearlyTransactionStats from "./YearlyTransactionStats";
import YearlyIncome from "./YearlyIncome";
import OverviewTable from "./OverviewTable";
import Options from "./Options";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDate,
  selectEndDate,
  selectOption,
  selectPercentageProfileIncrease,
  selectRevenueGenerated,
  selectStartDate,
  setPercentageProfileIncrease,
  setHighestPerformingForm,
  setLowestPerformingForm,
  setRevenueGenerated,
  selectLowestPerformingForm,
  selectHighestPerformingForm,
  setChart,
} from "@/store/features/statisticsSlice";
import { time } from "@/utils/time&dates";
import { useEffect, useState } from "react";
import { ApexCharts } from "@/utils/chartHelpers";
import { useGetTransactionChartStatsQuery } from "@/store/api/transactionsApi";
import { generateChartData } from "@/utils/helpers";
import StatsLoader from "@/components/loaders/statsLoader";

const FirstStat = () => {
  const revenue_generated = useSelector(selectRevenueGenerated);
  const percentage_profile_incease = useSelector(
    selectPercentageProfileIncrease
  );
  console.log(revenue_generated);
  return (
    <div className="bg-white p-6 rounded-2xl space-y-6">
      <h1 className="text-gray-500 lg:text-lg text-md">
        Overall revenue generated
      </h1>
      <div className="flex justify-between items-end self-end">
        <h2 className="font-semibold text-2xl text-[#46B038]">
          {formatNumber(revenue_generated)}
        </h2>
        <div className="flex items-center self-end gap-1">
          <span className="text-[#46B038]">+{percentage_profile_incease}%</span>
          <span className="">{StatTrend}</span>
        </div>
      </div>
    </div>
  );
};

const SecondStat = ({ state, applicationName, amount }) => {
  const series = [
    { name: "dd", data: [2, 24, 19, 33, 15, 90, 20, 50, 80, 67, 9, 44] },
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
        top: 3,
        left: 2,
        blur: 4,
        opacity: 1,
        color: "transparent",
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
    colors: ["#69CB5C"],
  };

  return (
    <div
      className={`bg-white rounded-2xl space-y-6 border-l-[1.6rem] w-fit ${
        state === "highest" ? "border-[#46B038]" : "border-[#C40E0E]"
      } `}
    >
      <div className="space-y-2 px-6 pt-6">
        <h1 className="text-gray-500 lg:text-lg text-md">
          {capitalizeFirstLetter(state)} revenue generating Application
        </h1>
        <p className="text-gray-800 font-semibold text-xs lg:text-sm">
          {applicationName}
        </p>
      </div>
      <div className="flex lg:flex-row flex-col justify-between lg:gap-4 gap-2">
        <div className="flex flex-col lg:gap-3 gap-2 items-center lg:py-4 py-2 pl-6">
          <h2
            className={`font-semibold text-xl ${
              state === "highest" ? "text-[#46B038]" : "text-[#C40E0E]"
            }`}
          >
            {formatNumber(amount)}
            {/* {amount} */}
          </h2>
          <div className="flex items-center gap-4">
            <span
              className={`${
                state === "highest" ? "text-[#46B038]" : "text-[#C40E0E]"
              }`}
            >
              +100%
            </span>
            <span className="">
              {state === "highest" ? StatTrend : StatTrendDown}
            </span>
          </div>
        </div>
        <ApexCharts
          type="area"
          series={series}
          options={options}
          width={200}
          height={70}
        />
      </div>
    </div>
  );
};

const Statistics = () => {
  const selected = useSelector(selectOption);
  const date = useSelector(selectDate);
  console.log(time.formatDate(JSON.parse(date)));
  const dispatch = useDispatch();

  const start_date = useSelector(selectStartDate);
  const end_date = useSelector(selectEndDate);
  const lowest_performing_form = useSelector(selectLowestPerformingForm);
  const highest_performing_form = useSelector(selectHighestPerformingForm);
  console.log(highest_performing_form);

  const defaultPayload = { start_date, end_date, filter_type: selected };
  const { isLoading, isSuccess, error, data } =
    useGetTransactionChartStatsQuery(defaultPayload);

  useEffect(() => {
    const chartData = data?.data?.chart;

    const transformedChartData = generateChartData(chartData);

    const highest_performing_form = {
      name: data?.data?.highest_performing_form?.name,
      total_amount: data?.data?.highest_performing_form?.total_amount,
    };

    const lowest_performing_form = {
      name: data?.data?.lowest_performing_form?.name,
      total_amount: data?.data?.lowest_performing_form?.total_amount,
    };

    dispatch(setChart(transformedChartData));
    dispatch(
      setPercentageProfileIncrease(data?.data?.percentage_profile_incease)
    );
    dispatch(setRevenueGenerated(data?.data?.revenue_generated));

    dispatch(setHighestPerformingForm(highest_performing_form));
    dispatch(setLowestPerformingForm(lowest_performing_form));
  }, [data, isSuccess]);

  const [isEditing, setIsEditing] = useState(false);

  const getCalendarDate = () => {
    const months = [
      "Janury",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(JSON.parse(start_date));
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    if (selected === "year") {
      return date.getFullYear();
    }
    if (selected === "month") {
      return `${month}, ${year}`;
    }
    if (selected === "week") {
      const week = Math.ceil((date.getDate() + date.getDay()) / 7);
      return `week ${week}, ${month} ${year}`;
    }
    if (selected === "day") {
      return time.formatDate(date);
    }
  };

  const calendarDate = getCalendarDate();
  return (
    <>
      {isEditing && <Filter setIsEditing={setIsEditing} />}
      {isLoading && <StatsLoader />}
      <DashboardLayout header="Statistics" icon="">
        <div className="space-y-10 w-full">
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <div className="">
                <h1 className="text-lg font-semibold">
                  Transactions Statistics Overview
                </h1>
                <p className="text-gray-500">View transaction stat below</p>
              </div>
              <div
                onClick={() => setIsEditing(true)}
                className="w-fit flex items-center gap-2 cursor-pointer border border-slate-600 rounded-md px-3 py-1"
              >
                <span className="text-slate-800 text-sm">
                  {/* {time.formatDate(JSON.parse(date))} */}
                  {calendarDate}
                </span>
                <span className="">{CalendarEdit}</span>
              </div>
            </div>
            <Options />
          </div>
          <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            <FirstStat />
            <SecondStat
              state="highest"
              applicationName={highest_performing_form?.name}
              amount={highest_performing_form?.total_amount}
            />
            <SecondStat
              state="lowest"
              applicationName={lowest_performing_form?.name}
              amount={lowest_performing_form?.total_amount}
            />
          </section>
          <section className="space-y-4">
            <h1 className="font-semibold text-lg">
              {" "}
              {`${
                selected === "day" ? "Dai" : capitalizeFirstLetter(selected)
              }ly`}{" "}
              Transaction Stats
            </h1>
            <div className="grid lg:grid-cols-[7fr_3fr] gap-8 grid-cols-1">
              <YearlyTransactionStats />
              <YearlyIncome />
            </div>
          </section>
          <section className="bg-white rounded-md">
            <h1 className="font-semibold text-lg px-6 py-8">
              Order by Application Overview
            </h1>
            <OverviewTable />
          </section>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Statistics;
