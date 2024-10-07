"use client";

import Table from "./Table";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { applications, drafts } from "@/utils/data";
import { useGetAllDraftsQuery } from "@/store/api/applicationApi";
import WithAuth from "@/components/withAuth";
import Paginations from "@/components/Pagination";
import { useEffect, useState } from "react";

const Drafts = () => {
  const [page, setPage] = useState(0);
  const { isLoading, isSuccess, isError, error, data, refetch } =
    useGetAllDraftsQuery({
      page: page === 0 ? 1 : page,
      limit: 20,
    });
  console.log(data);

  const pageCount = data?.data?.draft_applications?.meta?.lastPage;

  const drafts = data?.data.draft_applications.data;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <DashboardLayout header="Drafts" icon="" isSidebarLink={true}>
      <div className="space-y-10 w-full text-sm">
        <div className="bg-gray-100">
          <div className="w-full pb-8">
            <h1 className="text-black font-bold">DRAFTS</h1>
            <p className="text-gray-600 text-sm">
              view all your drafted application below
            </p>
          </div>
          <div className="w-full bg-white overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg">
            <Table isLoading={isLoading} drafts={drafts} />
          </div>
        </div>
        <Paginations
          pageCount={pageCount}
          setPage={(event) => setPage(event.selected)}
        />
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Drafts);
