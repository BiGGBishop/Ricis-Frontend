"use client";
import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import { baseUrl } from "@/lib/configs";
import {
  useGetAllStaffsQuery,
  useUpdateStaffStatusMutation,
} from "@/store/api/userApi";
import { getToken } from "@/utils/authHelpers";
import { formatDate, normalizeErrors } from "@/utils/helpers";
import { time } from "@/utils/time&dates";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const tableHeader = [
  "Staff Name",
  "Role",
  "Email Address",
  "Status",
  "Date Applied",
  "Action",
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
  console.log("staffdata", data);

  const router = useRouter();

  useEffect(() => {
    switch (tab) {
      case null:
        setStaffs(data?.data);
        break;

      case "all":
        setStaffs(data?.data);
        break;

      case "active":
        const activeStaffs = data?.data?.filter(
          (staff) => staff?.user_status === "approved"
        );
        setStaffs(activeStaffs);
        break;

      case "suspended":
        const suspendedStaffs = data?.data?.filter(
          (staff) => staff.user_status === "suspend"
        );
        setStaffs(suspendedStaffs);
        break;

      default:
        break;
    }
  }, [data, tab]);
  console.log("staffs", staffs);
  const handleStaff = (item) => {
    router.push(`/admin/staff-management/${item}?id=${item}`);
  };

  const [
    updateStaffStatus,
    {
      isLoading: updatingStatus,
      error: updateStatusError,
      isSuccess: updateStatusSuccess,
    },
  ] = useUpdateStaffStatusMutation();

  const [statusValue, setStatusValue] = useState("");
  const updateStatus = async (item) => {
    if (item?.user_status === "approved") {
      setStatusValue("suspended");
    } else {
      setStatusValue("approved");
    }

    try {
      // const updatedStatus = statusValue
      const payload = { status: statusValue };
      console.log(payload);
      await updateStaffStatus({ staffId: item.id, payload });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (updateStatusError) {
      const err = normalizeErrors(updateStatusError);
      toast.error(err, { autoClose: 30000 });
    }
    if (updateStatusSuccess) {
      toast.success(
        `Successfully ${
          status === "approved" ? "suspended" : "unsuspended"
        } staff`,
        { autoClose: 5000 }
      );
      refetch();
    }
  }, [updateStatusError, updateStatusSuccess]);
  if (isLoading||updatingStatus) return <TableSkeleton />;

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
              >
                <td
                  className={`px-6 py-4`}
                  onClick={() => handleStaff(data?.id)}
                >
                  {data?.full_name}
                </td>
                <td
                  className={`px-6 py-4`}
                  onClick={() => handleStaff(data?.id)}
                >
                  {data?.userroleId === 1 ? "Admin" : "Staff"}
                </td>
                <td
                  className={`px-6 py-4`}
                  onClick={() => handleStaff(data?.id)}
                >
                  {data.email}
                </td>
                <td
                  className={`px-6 py-4 ${
                    data?.user_status?.toLowerCase() === "approved"
                      ? "text-[#69CB5C]"
                      : data?.user_status?.toLowerCase() === "suspended"
                      ? "text-[#EABD52]"
                      : "text-black"
                  }  `}
                >
                  <div
                    className={
                      data?.user_status?.toLowerCase() === "approved"
                        ? "bg-[#69CB5C1F] py-[4px] px-[8px] rounded-[12px] w-fit text-[12px] "
                        : "bg-[#EABD521F] py-[4px] px-[8px] rounded-[12px] w-fit text-[12px] "
                    }
                  >
                    {data.user_status}
                  </div>
                </td>
                <td
                  className={`px-6 py-4 `}
                  onClick={() => handleStaff(data?.id)}
                >
                  {time?.formatDate(data?.createdAt)} at{" "}
                  {time?.formatTime(data?.createdAt)}{" "}
                </td>
                <td className={`px-6 py-4 `}>
                  <span
                    onClick={() => updateStatus(data)}
                    className={`px-2.5 py-1.5 text-xs ${
                      data?.user_status?.toLowerCase() === "approved"
                        ? "bg-red-100 text-red-600"
                        : data?.user_status?.toLowerCase() === "suspended"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    } font-medium rounded-3xl`}
                  >
                    {data?.user_status?.toLowerCase() === "approved"
                      ? "Suspend"
                      : "Activate"}
                  </span>
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
