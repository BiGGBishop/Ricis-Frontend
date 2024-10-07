"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { applications, applicationsTabs } from "@/utils/data";
import Table from "@/components/Table";
import { Suspense, useState } from "react";
import TabSwitcher from "../../../components/TabSwitcher";
import { SearchIcon } from "@/svgs";
import WithAuth from "@/components/withAuth";
import Search from "@/components/search/Search";
import Paginations from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApplications,
  selectFirstPage,
  selectLastPage,
  setPage,
} from "@/store/features/applicatonsSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ApplicationAdd } from "@/svgs";

const ApplicationsSuspense = () => {
  const param = useSearchParams();
  const status = param.get("tab");
  const dispatch = useDispatch();
  const firstPage = useSelector(selectFirstPage);
  const lastPage = useSelector(selectLastPage);
  const applications = useSelector(selectApplications);
  const pageCount = lastPage;

  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");

  // const getTotalPages = () => {
  //   if (first)
  // }

  return (
    <DashboardLayout header="Applications" isSidebarLink={true}>
      <div className="space-y-6 w-full">
        <Suspense>
          <TabSwitcher applicationsTabs={applicationsTabs} />
        </Suspense>
        {/* <div className="">
          <input type="date" />
        </div> */}
        <div className="flex items-center gap-2 px-4 font-semibold lg:text-lg text-md text-gray-600">
          <span
            className={`${
              status === "approved"
                ? "text-green-500"
                : status === "pending"
                ? "text-yellow-500"
                : status === "rejected"
                ? "text-red-500"
                : "text-gray-600"
            }`}
          >
            {!status ? "All" : capitalizeFirstLetter(status)}
          </span>
          <span>Applications</span>
        </div>
        <div className="space-y-8 bg-white py-4 px-4">
          <div className="flex justify-between w-full items-center">
            {" "}
            <Search />
            {!isAdmin && (
              <Link
                href="/user/new-application"
                className="bg-[#46B038] mt-6 w-fit px-4 py-2.5 text-sm flex items-center gap-2 rounded-md text-white hover:opacity-70 transform active:scale-75 transition-transform"
              >
                <span className="">{ApplicationAdd}</span>
                <span className="">New Application</span>
              </Link>
            )}
          </div>
          <Suspense>
            <Table />
          </Suspense>
        </div>
        <Paginations
          pageCount={pageCount}
          setPage={(event) => dispatch(setPage(event.selected + 1))}
        />
      </div>
    </DashboardLayout>
  );
};

const Applications = () => {
  return (
    <Suspense>
      <ApplicationsSuspense />
    </Suspense>
  );
};

export default WithAuth(Applications);
