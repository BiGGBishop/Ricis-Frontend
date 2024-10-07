"use client";

import InputField from "@/app/user/new-application/InputField";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { SearchIcon } from "@/svgs";
import TransactionsTable from "@/components/TransactionsTable";
import WithAuth from "@/components/withAuth";
import { useDispatch, useSelector } from "react-redux";
import Paginations from "@/components/Pagination";
import { selectTotalPage, setPage } from "@/store/features/transactionSlice";

const Transactions = () => {
  const dispatch = useDispatch();
  const pageCount = useSelector(selectTotalPage);

  return (
    <DashboardLayout header="Transactions" isSidebarLink={true}>
      <div className="w-full pb-8">
        <h1 className="text-black font-bold text-2xl">Payment Record</h1>
        <p className="text-gray-600 text-sm">view all your transactions</p>
      </div>
      <div className="bg-white rounded-lg">
        <h1 className="text-black font-bold py-6 pl-6">Payment Information</h1>
        {/* <form className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <span>{SearchIcon}</span>
            </div>
            <input
              type="search"
              id="search"
              className="rounded-2xl text-gray-700 bg-gray-100 block w-full p-3 ps-10 text-sm text-white-900"
              placeholder="Search"
            />
          </div>
        </form> */}
        <TransactionsTable />
      </div>
      <div className="mt-8">
        <Paginations
          pageCount={pageCount}
          setPage={(event) => dispatch(setPage(event.selected + 1))}
        />
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Transactions);
