"use client";
import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import { baseUrl } from "@/lib/configs";
import { useGetAllStaffsQuery } from "@/store/api/userApi";
import { getToken } from "@/utils/authHelpers";
import { formatDate } from "@/utils/helpers";
import { time } from "@/utils/time&dates";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const tableHeader = [
  "Staff Name",
  "Role",
  "Email Address",
  "Satus",
  "Date Applied",
];

const tableData = [
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "inactive",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "inactive",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "inactive",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
];

const Table = () => {
  const [staffs, setStaffs] = useState();
  const param = useSearchParams();
  const tab = param.get("tab");

  const { isLoading, isSuccess, isError, error, data } = useGetAllStaffsQuery();
  console.log(data);

  const router = useRouter();

  useEffect(() => {
    switch (tab) {
      case null:
        setStaffs(data?.data.staffs);
        break;

      case "all":
        setStaffs(data?.data.staffs);
        break;

      case "active":
        const activeStaffs = data?.data.staffs?.filter(
          (staff) => staff.status === "ACTIVE"
        );
        setStaffs(activeStaffs);
        break;

      case "suspended":
        const suspendedStaffs = data?.data.staffs?.filter(
          (staff) => staff.status === "SUSPENDED"
        );
        setStaffs(suspendedStaffs);
        break;

      default:
        break;
    }
  }, [data, tab]);

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg text-xs">
      <table className="w-full text-left rtl:text-right">
        <thead className={` bg-dark-gray text-gray-400 py-4 bg-gray-100`}>
          <tr className="whitespace-nowrap">
            {tableHeader.map((data, index) => (
              <th key={index} scope="col" className="lg:px-6 px-4 py-3">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {staffs?.map((data, index) => {
            const columns = Object.keys(data);
            return (
              <tr
                key={index}
                className=" border-b-[1px] border-b-gray-300 border-b-solid cursor-pointer hover:opacity-70"
                onClick={() => {
                  router.push(
                    `/admin/staff-management/${data.id}?id=${data.id}`
                  );
                }}
              >
                <td className={`px-6 py-4  `}>{data.name}</td>
                <td className={`px-6 py-4  `}>
                  {data.is_admin ? "Admin" : "Staff"}
                </td>
                <td className={`px-6 py-4`}>{data.email}</td>
                <td
                  className={`px-6 py-4 ${
                    data?.status.toLowerCase() === "active"
                      ? "text-[#69CB5C]"
                      : data?.status.toLowerCase() === "suspended"
                      ? "text-[#EABD52]"
                      : "text-black"
                  }  `}
                >
                  <div
                    className={
                      data?.status.toLowerCase() === "active"
                        ? "bg-[#69CB5C1F] py-[4px] px-[8px] rounded-[12px] w-fit text-[12px] "
                        : "bg-[#EABD521F] py-[4px] px-[8px] rounded-[12px] w-fit text-[12px] "
                    }
                  >
                    {data.status}
                  </div>
                </td>
                <td className={`px-6 py-4 `}>
                  {time.formatDate(data?.created_at)} at{" "}
                  {time.formatTime(data?.created_at)}{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
