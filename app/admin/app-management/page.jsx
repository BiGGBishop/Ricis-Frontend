"use client";
import TabSwitcher from "@/components/TabSwitcher";
import Search from "@/components/search/Search";
import Table from "@/components/Table";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import { applicationsTabs } from "@/utils/data";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLastPage } from "@/store/features/applicatonsSlice";
import { setPage } from "@/store/features/applicatonsSlice";
import Paginations from "@/components/Pagination";

const AppManagement = () => {
  const dispatch = useDispatch();
  const pageCount = useSelector(selectLastPage);
  return (
    <DashboardLayout header="Admin" isSidebarLink={true}>
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-black font-bold text-lg">
            Application Management
          </h1>
          <p className="text-gray-600 text-sm">
            view all your staff list below
          </p>
        </div>
        <TabSwitcher applicationsTabs={applicationsTabs} />
        <div className="space-y-8 bg-white py-4 px-4">
          <Search />
          <Suspense>
            <Table />
          </Suspense>
        </div>
        <Paginations
          pageCount={pageCount}
          setPage={(event) => dispatch(setPage(event.selected+1))}
        />
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(AppManagement);
