"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { SearchIcon } from "@/svgs";
import Table from "./Table";
import Link from "next/link";
import { getToken } from "@/utils/authHelpers";
import WithAuth from "@/components/withAuth";
import Search from "@/components/search/Search";
import { Suspense } from "react";
import TabSwitcher from "@/components/TabSwitcher";
import { staffTabs } from "@/utils/data";

const StaffManagement = () => {
  return (
    <DashboardLayout header="Admin" isSidebarLink={true}>
      <div className="space-y-6">
        <div className="lg:flex lg:justify-between w-full">
          <div className="w-full">
            <h1 className="text-black font-bold text-lg">Staff Management</h1>
            <p className="text-gray-600 text-sm">
              view all your staff list below
            </p>
          </div>
          <div className="w-full lg:w-[15%]">
            <Link href="/admin/create-staff">
              <button className="text-sm bg-[#46B038] text-white py-2 px-4 w-fit rounded-md transform active:scale-75 transition-transform">
                Create Staff
              </button>
            </Link>
          </div>
        </div>
        <Suspense>
          <TabSwitcher applicationsTabs={staffTabs} />
        </Suspense>
        <div className="space-y-8 bg-white py-4 px-4">
          {/* <Search /> */}
          <Suspense>
            <Table />
          </Suspense>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(StaffManagement);
