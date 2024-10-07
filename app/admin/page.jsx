"use client";
import Table from "@/components/Table";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import WithAuth from "@/components/withAuth";
import { useGetStatsQuery } from "@/store/api/applicationApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLastPage } from "@/store/features/applicatonsSlice";
import { setPage } from "@/store/features/applicatonsSlice";
import Paginations from "@/components/Pagination";

const Admin = () => {
  const { isLoading, isSuccess, error, data, refetch } = useGetStatsQuery();
  const stats = data?.data?.stats;
  console.log(data);

  const dispatch = useDispatch();
  const pageCount = useSelector(selectLastPage); 

  useEffect(() => {
    refetch();
  }, []);

  return (
    <DashboardLayout header="Admin">
      <div className="space-y-10 w-full">
        <div className="lg:flex lg:justify-between w-full items-center">
          <div className="space-y-2">
            <h1 className="text-gray-900 text-3xl font-medium">Welcome Back</h1>
            <p className="text-gray-500">
              Here is a preview of your activities and information
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full">
          {stats?.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              amount={stat.amount}
              percentage={Number(stat.percentage?.toFixed(2) ?? 0)}
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
          setPage={(event) => dispatch(setPage(event.selected+1))}
        />
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Admin);
