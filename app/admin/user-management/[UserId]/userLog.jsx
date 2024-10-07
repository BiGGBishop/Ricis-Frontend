import { useParams } from "next/navigation";
import { time } from "@/utils/time&dates";
import { useGetUserLogsQuery } from "@/store/api/userApi";
import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import { EmptyLog } from "@/svgs";
import { getActionStatement } from "@/utils/helpers";
import NoActivity from "@/components/NoActivity";

const columns = ["Date", "Time", "Action"];

const UserLog = () => {

  const params = useParams();
  const userId = params.userId || params.UserId;
  
  const { data, isLoading, isSuccess, error } = useGetUserLogsQuery(userId);
  const user_activities_log = data?.data?.user_activities;
  console.log(data);

  if (isLoading) return <TableSkeleton />;
  return (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] space-y-4 rounded-lg text-xs">
      <h2 className="text-gray-600 lg:text-lg text-md font-semibold">
        Activity Log History
      </h2>
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
          {user_activities_log?.map((log, index) => {
            return (
              <tr
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
                  {getActionStatement("User", log.action)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {user_activities_log?.length === 0 && <NoActivity />}
    </div>
  );
};

export default UserLog;
