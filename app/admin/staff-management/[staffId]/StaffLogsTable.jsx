import { useParams } from "next/navigation";
import { time } from "@/utils/time&dates";
import { useGetStaffLogsQuery } from "@/store/api/userApi";
import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import { EmptyLog } from "@/svgs";
import { getActionStatement } from "@/utils/helpers";
import NoActivity from "@/components/NoActivity";

const columns = ["Date", "Time", "Action"];

// const
const logs = [
  {
    id: "k1",
    date: "20 Sept 2023",
    time: "10:30am",
    action: "Staff account was created by Admin Tola",
  },
  {
    id: "k2",
    date: "20 Sept 2023",
    time: "10:30am",
    action: "Staff account was created by Admin Tola",
  },
  {
    id: "k3",
    date: "20 Sept 2023",
    time: "10:30am",
    action: "Staff account was created by Admin Tola",
  },
  {
    id: "k4",
    date: "20 Sept 2023",
    time: "10:30am",
    action: "Staff account was created by Admin Tola",
  },
  {
    id: "k5",
    date: "20 Sept 2023",
    time: "10:30am",
    action: "Staff account was created by Admin Tola",
  },
  {
    id: "k6",
    date: "20 Sept 2023",
    time: "10:30am",
    action: "Staff account was created by Admin Tola",
  },
  {
    id: "k7",
    date: "20 Sept 2023",
    time: "10:30am",
    action: "Staff account was created by Admin Tola",
  },
  {
    id: "k8",
    date: "20 Sept 2023",
    time: "10:30am",
    action: "Staff account was created by Admin Tola",
  },
];

const StaffLogsTable = () => {
  const params = useParams();
  const staffId = params.staffId;
  const { data, isLoading, isSuccess, error } =
    useGetStaffLogsQuery(staffId);
  const staff_activities_log = data?.data?.staff_activities;
  console.log(data);

  if (isLoading) return <TableSkeleton />;
  return (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg text-xs">
      <table className="w-full text-left rtl:text-right">
        <thead className={`bg-dark-gray text-gray-400 py-4`}>
          <tr className="whitespace-nowrap">
            {columns.map((column, index) => (
              <th key={column} scope="col" className="lg:px-6 px-4 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {staff_activities_log?.map((log, index) => {
            // const columns = Object.keys(data);
            return (
              <tr
                // onClick={() => openTransactionInvoice(transaction?.id)}
                key={log.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  {time.formatDate(log.created_at)}
                </th>
                <td className="px-6 py-6 w-72">
                  {time.formatTime(log.created_at)}
                </td>
                <td className="px-6 py-6 w-72">
                  {getActionStatement("Staff", log.action, log.executor.name)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {staff_activities_log?.length === 0 && <NoActivity />}
    </div>
  );
};

export default StaffLogsTable;
