"use client";

import Link from "next/link";
import { EmptyPagesIcon, SortIcon } from "@/svgs";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetAllApplicationsQuery,
  useGetAllDraftsQuery,
} from "@/store/api/applicationApi";
import { time } from "@/utils/time&dates";
import { cutString } from "@/utils/helpers";
import TableSkeleton from "./skeleton-loaders/TableSkeleton";
import { useEffect, useState } from "react";
import { ApplicationAdd } from "@/svgs";
import {
  selectApplications,
  selectFetchingStates,
  setApplications,
} from "@/store/features/applicatonsSlice";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

const TypeColorClass = {
  NEW: "bg-sky-200 text-sky-900",
  RENEW: "bg-yellow-100 text-yellow-600",
};

const tableColumn = [
  "Ref No",
  "Type",
  "Applicant Name",
  "Payment Status",
  "Application Name",
  "Status",
  "Date Applied",
  "Action",
];

const Table = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params.get("tab");
  const applications = useSelector(selectApplications);
  const fetchingStates = useSelector(selectFetchingStates);
  const isLoading = fetchingStates?.isLoading;
  const dispatch = useDispatch();
  const [filteredAppliations, setFilteredApplications] = useState([]);
  const [isEmpty, setIsEmpty] = useState({ name: "", value: false });
  // const [applications, setApplications] = useState([]);
  // const { isLoading, isSuccess, isError, error, data } =
  //   useGetAllApplicationsQuery();

  const openApplicationDetails = (applicationId, applicationStatus) => {
    {
      router.push(
        `/user/applications/${applicationId}?status=${applicationStatus}&id=${applicationId}`
      );
    }
  };

  const openNewApplication = () => {
    router.push("/user/new-application");
  };

  useEffect(() => {
    dispatch(setApplications(applications));
  }, []); // Run once on initial render to set the applications

  useEffect(() => {
    setIsEmpty({ name: "", value: false });
    // if (tab === null) {
    //   // No tab selected, show all applications
    //   setFilteredApplications([]);
    //   dispatch(setApplications(applications));
    // }
    switch (tab) {
      case null:
        setFilteredApplications([]);
        dispatch(setApplications(applications));
        break;

      case "all":
        setFilteredApplications([]);
        dispatch(setApplications(applications));
        break;

      case "pending":
        const pendingApplications = applications?.filter(
          (application) => application.status === "PENDING"
        );
        if (pendingApplications?.length === 0) {
          setIsEmpty({ name: "Pending", value: true });
        }
        setFilteredApplications(pendingApplications);
        break;

      case "approved":
        const approvedApplications = applications?.filter(
          (application) => application.status === "APPROVED"
        );
        if (approvedApplications?.length === 0) {
          setIsEmpty({ name: "Approved", value: true });
        }
        setFilteredApplications(approvedApplications);
        break;

      case "rejected":
        const rejectedApplications = applications?.filter(
          (application) => application.status === "REJECTED"
        );
        if (rejectedApplications?.length === 0) {
          setIsEmpty({ name: "Rejected", value: true });
        }
        setFilteredApplications(rejectedApplications);
        break;

      default:
        setApplications(applications);
        break;
    }
  }, [applications, tab]);

  if (isLoading) return <TableSkeleton />;

  console.log(applications);

  return applications?.length > 0 ? (
    <div className="relative overflow-x-auto lg:overflow-x-hidden shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-500 uppercas bg-gray-100">
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
          {isEmpty.value ? (
            <div className="text-gray-500 lg:text-lg whitespace-nowrap w-full text-sm text-center py-8">
              {" "}
              No {isEmpty.name} Applications on this page{" "}
            </div>
          ) : (
            (filteredAppliations?.length > 0
              ? filteredAppliations
              : applications
            )?.map((application) => (
              <tr
                onClick={() =>
                  openApplicationDetails(application.id, application.status)
                }
                key={application.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full text-xs cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {cutString(application.reference_id, 10)}
                </th>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      TypeColorClass[application.state]
                    } py-1.5 px-3 rounded-md`}
                  >
                    {application.state}
                  </span>
                </td>
                <td className="px-6 py-4 w-80">
                  {application?.user?.first_name +
                    " " +
                    application?.user?.last_name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`py-1.5 rounded-3xl ${
                      application?.transactions?.length === 0
                        ? "bg-red-100 text-red-600 px-3"
                        : "bg-green-100 text-green-700 px-6"
                    } `}
                  >
                    {application?.transactions?.length === 0
                      ? "Unpaid"
                      : "Paid"}
                  </span>
                </td>
                <td className="px-6 py-4 w-80">{application?.form?.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1.5 text-xs ${
                      application?.isDraft
                        ? "bg-gray-100 text-gray-500"
                        : application?.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : application?.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    } font-medium rounded-3xl`}
                  >
                    {application?.isDraft ? "Draft" : application.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-y-1 ">
                  <p className="">{time.formatDate(application?.created_at)}</p>
                  <p className="">{time.formatTime(application?.created_at)}</p>
                </td>
                <td className="px-4 py-4 flex flex-row items-center gap-3 justify-center">
                  <span
                    onClick={() => console.log("approve")}
                    className={`px-2.5 py-1.5 text-xs bg-blue-100 text-blue-700 font-medium rounded-3xl`}
                  >
                    Approve
                  </span>
                  <span
                    onClick={() => console.log("feedback")}
                    className={`px-2.5 py-1.5 text-xs bg-green-100 text-green-700 font-medium rounded-3xl`}
                  >
                    Feedback
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="flex flex-col items-center pt-20 gap-4 bg-white rounded-[4px] h-screen">
      <div className="animate-bounce">{EmptyPagesIcon}</div>
      <h1 className="text-gray-500 lg:text-lg text-sm text-center">
        No application found
      </h1>
    </div>
  );
};

export default Table;
