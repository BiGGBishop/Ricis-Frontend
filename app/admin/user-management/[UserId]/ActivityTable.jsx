"use client";

import NoActivity from "@/components/NoActivity";
import { time } from "@/utils/time&dates";
import { useRouter } from "next/navigation";

const columns = [
  "Date",
  "Time",
  "Action",
  "Application Name",
  "Applicant Name",
];

const ActivityTable = ({ activities }) => {
  const router = useRouter();

  let action;
  let actionColor;

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
          {activities?.map((activity, index) => {
            const formattedDate = time.formatDate(activity.created_at);
            const formattedTime = time.formatTime(activity.created_at);
            const actor = activity.actor.name;
            const isStaff = activity.actor.isStaff;
            const route = isStaff
              ? `/admin/staff-management/${activity.staff_id}`
              : `/admin/user-management/${activity.user_id}?id=${activity.user_id}`;

            switch (activity.action) {
              case "REJECTED":
                action = "rejected";
                actionColor = "red";
                break;

              case "CREATED":
                action = "created";
                actionColor = "blue";
                break;

              case "APPROVED":
                action = "approved";
                actionColor = "green";
                break;

                case "RESUBMITTED":
                  action = "resubmitted";
                  actionColor = "#F6BE00";
                  break;
  
                  case "RENEW":
                  action = "renewed";
                  actionColor = "brown";
                  break;  

              default:
                break;
            }
            return (
              <tr
                onClick={() =>
                  router.push(
                    `/user/applications/${activity.applicationDetails.id}?status=${activity.applicationDetails.status}&id=${activity.applicationDetails.id}`
                  )
                }
                key={activity.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  {formattedDate}
                </th>
                <td className="px-6 py-6 w-72">{formattedTime}</td>
                <td className="px-6 py-6 w-72 space-x-1 whitespace-nowrap">
                  <span>Application was</span>
                  <span
                    style={{
                      color: `${actionColor}`
                    }}
                  >{action}</span>
                  <span>by</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(route);
                    }}
                    className={`py-[1.7px] px-2 rounded-lg ${isStaff
                      ? "bg-green-200 text-green-600"
                      : "bg-blue-200 text-blue-600"
                      }`}
                  >
                    {actor}
                  </span>
                </td>
                <td className="px-6 py-6 w-72">
                  {activity.applicationDetails.form_name}
                </td>
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/admin/user-management/${activity.applicationDetails.user_id}?id=${activity.applicationDetails.user_id}`
                    );
                  }}
                  className="px-6 py-6 w-72"
                >
                  {activity.applicationDetails.user_name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {activities?.length === 0 && <NoActivity />}
    </div>
  );
};

export default ActivityTable;
