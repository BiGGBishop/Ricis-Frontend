"use client";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { AddCircleIcon, ApplicationAdd } from "@/svgs";
import StatsCard from "@/components/StatsCard";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useGetStatsQuery } from "@/store/api/applicationApi";
import Paginations from "@/components/Pagination";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectLastPage,
  selectTotalPage,
  setPage,
} from "@/store/features/applicatonsSlice";

const DashboardSuspenseBoundary = () => {
  const router = useRouter();
  const param = useSearchParams();
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const transactionStatus = param.get("status");

  const dispatch = useDispatch();
  const pageCount = useSelector(selectLastPage);

  const { isLoading, isSuccess, error, data, refetch } = useGetStatsQuery();
  const stats = data?.data?.stats;
  console.log(data);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (transactionStatus === "successful") {
      router.push("/user");
      toast.success("Your transaction is completed!", { autoClose: 3000 });
    }
  }, [transactionStatus]);

  return (
    <DashboardLayout isSidebarLink={true} header="Dashboard" icon="">
      <div className="space-y-10 w-full">
        <div className="lg:flex lg:justify-between w-full items-center">
          <div className="space-y-1">
            <h1 className="text-gray-900 text-2xl font-semibold">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Here is a preview of your activities and information
            </p>
          </div>
          {!isAdmin && (
            <Link
              href="user/new-application"
              className="bg-blue-700 mt-6 w-fit px-4 py-2.5 text-sm flex items-center gap-2 rounded-md text-white hover:bg-blue-600 transform active:scale-75 transition-transform"
            >
              <span className="">{ApplicationAdd}</span>
              <span className="">New Application</span>
            </Link>
          )}
        </div>
        <div className="flex w-full gap-6 flex flex-col lg:flex-row ">
          {stats?.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              amount={stat.amount}
              percentage={
                stat.percentage === null
                  ? 0
                  : Number(stat.percentage.toFixed(2))
              }
              increase={stat.daily_stats[0]}
              dailyStat={Object.values(stat.daily_stats)}
              colorCode={stat.chart_color}
              colorClass={`text-[#${stat.chart_color[0]}]`}
            />
          ))}
        </div>
        <Table />
        <Paginations
          pageCount={pageCount}
          setPage={(event) => dispatch(setPage(event.selected + 1))}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardSuspenseBoundary;
