"use client";
import { time } from "@/utils/time&dates";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

const tableHeader = [
  "Username",
  "Email Address",
  "Phone Number",
  "Date Applied",
];

 
const Table = ({ tableData }) => {
  const router = useRouter();

  const openUserProfile = (userId) => {
    router.push(`/admin/user-management/${userId}?id=${userId}`);
  };

  return (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className={`text-sm bg-dark-gray text-gray-400 py-4 bg-gray-100`}>
          <tr className="whitespace-nowrap">
            {tableHeader.map((data, index) => (
              <th key={index} scope="col" className="lg:px-6 px-4 py-3">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {tableData?.map((data, index) => {
            return (
              <tr
                onClick={() => openUserProfile(data?.id)}
                key={data.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full text-sm cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {data.first_name}
                </th>
                <td className="px-6 py-4 w-80">{data.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1.5">{data?.phone}</span>
                </td>
                <td className="px-6 py-4">
                  {time.formatDate(data.created_at) +
                    " at " +
                    time.formatTime(data.created_at)}
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
