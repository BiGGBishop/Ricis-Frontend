"use client";

import InputField from "@/app/user/new-application/InputField";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { SearchIcon } from "@/svgs";
import TransactionsTable from "@/components/TransactionsTable";
import Table from "./Table";
import WithAuth from "@/components/withAuth";
import Search from "@/components/search/Search";
import { useDispatch, useSelector } from "react-redux";
import Paginations from "@/components/Pagination";
import { setPage, selectTotalPage } from "@/store/features/transactionSlice";
import { useRouter } from "next/navigation";

const Classification = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pageCount = useSelector(selectTotalPage);

  return (
    <DashboardLayout header="Admin" isSidebarLink={true}>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row justify-between w-full ">
          <div className="w-full">
            <h1 className="text-black font-bold text-lg">
              Classification Management
            </h1>
            <p className="text-gray-600 text-sm">
              view all classifications and categories
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/create-classification")}
            className="bg-blue-700 text-white shadow-md rounded-md flex gap-x-4 px-6 whitespace-nowrap items-center justify-center py-2 transform active:scale-75 transition-transform"
          >
            <img className="w-4 h-4" src="/images/transactionIcon.svg" alt="" />
            <p className="font-medium text-sm">Add Classification</p>
          </button>
        </div>
        <div className="bg-white rounded-lg space-y-6 p-4">
          <h1 className="text-black font-bold">
            Manage Classification Information
          </h1>
          {/* <Search /> */}
          <Table />
        </div>
        <div className="mt-8">
          <Paginations
            pageCount={pageCount}
            setPage={(event) => dispatch(setPage(event.selected + 1))}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Classification);
