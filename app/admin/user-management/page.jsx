"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Table from "./Table";
import { useGetAllUsersQuery } from "@/store/api/userApi";
import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import Pagination from "./Pagination";
import { useState } from "react";
import WithAuth from "@/components/withAuth";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isSuccess, isError, error, data } = useGetAllUsersQuery({
    page: page,
    limit: 10,
  });
  const users = data?.data.data;
  const totalPages = data?.data?.meta.total;
 // console.log(users);
  return (
    <DashboardLayout header="Admin" isSidebarLink={true}>
      <div className="w-full pb-8">
        <h1 className="text-black font-bold text-lg">User Management</h1>
        <p className="text-gray-600 text-sm">
          view all user account details list below
        </p>
      </div>
      <div className="bg-white rounded-lg px-4">
        <h1 className="text-[#3361FF] font-bold pt-4 pl-6 pb-6">All</h1>
        {isLoading ? <TableSkeleton /> : <Table tableData={users} />}
        {/* <Pagination page={page} setPage={setPage} totalPages={totalPages} /> */}
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(UserManagement);
