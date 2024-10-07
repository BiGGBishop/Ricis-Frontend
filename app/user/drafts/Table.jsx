"use client";

import { EmptyRecord, SortIcon } from "@/svgs";
import { usePathname, useRouter } from "next/navigation";
import {
  useGetAllApplicationsQuery,
  useGetAllDraftsQuery,
} from "@/store/api/applicationApi";
import { time } from "@/utils/time&dates";
import { cutString } from "@/utils/helpers";
import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import { useEffect } from "react";

const tableColumn = [
  "Application Name",
  "Applicant Name",
  "Status",
  "Amount",
  // "Status",
  "Date Applied",
];

const Table = ({ isLoading, drafts }) => {
  const router = useRouter();

  const draftRouter = (id) => {
    console.log("Hii");
    router.push(`/user/drafts/${id}`);
  };

  // const { isLoading, isSuccess, isError, error, data } = useGetAllDraftsQuery();

  // const drafts = data?.data.draft_applications;

  console.log(drafts);
  //   console.log(data);

  //   const openApplicationDetails = (applicationId, applicationStatus) => {
  //     {
  //       router.push(
  //         `/user/applications/${applicationId}?status=${applicationStatus}&id=${applicationId}`
  //       );
  //     }
  //   };

  // const openApplicationDrafts = (formId, userId, data) => {
  //   window.localStorage.setItem(userId, JSON.stringify(data));
  //   {
  //     router.push(`/user/new-application/?form_id=${formId}&user_id=${userId}`);
  //   }
  // };

  if (isLoading) return <TableSkeleton />;

  return drafts?.length > 0 ? (
    <div className="relative overflow-x-auto lg:overflow-x-hidden shadow-md sm:rounded-lg">
      <table className="w-full text-xs text-left rtl:text-right text-gray-500">
        <thead className="w-full text-gray-500 uppercas bg-gray-50">
          <tr className="whitespace-nowrap">
            {tableColumn.map((column) => (
              <th key={column} scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  {column}
                  <a href="#">{SortIcon}</a>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {drafts?.map((drafts) => {
            const id = `${drafts.id}-${drafts.formId}`;
            return (
              <tr
                onClick={() => draftRouter(id)}
                key={drafts.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {drafts?.form?.name}
                </th>
                <td className="px-6 py-4 w-64">
                  {" "}
                  {drafts?.user?.first_name + " " + drafts?.user?.last_name}
                </td>
                {/* <td className="px-6 py-4 w-80">
                  {drafts?.user?.first_name + " " + drafts?.user?.last_name}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-gray-100 text-gray-600 py-2 px-6 font-semibold rounded-3xl">
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {drafts?.form?.amount}
                </td>
                {/* <td className="px-6 py-4">
              <span className={`px-2.5 py-1.5 text-sm bg-gray-200 rounded-3xl py-1 px-3`}>Draft</span>
            </td> */}
                <td className="px-6 py-4 space-y-1 flex flex-col items-en whitespace-nowra ">
                  <p className="">{time.formatDate(drafts?.createdAt)}</p>
                  <p className="">{time.formatTime(drafts?.createdAt)}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-[4px] h-screen">
      <div className="animate-bounce">{EmptyRecord}</div>
      <h1 className="text-gray-500 lg:text-lg text-sm text-center">
        You haven't added any draft
      </h1>
    </div>
  );
};

export default Table;
