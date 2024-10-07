"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import { useGetSingleNotificationQuery } from "@/store/api/userApi";
import { time } from "@/utils/time&dates";
import { useParams } from "next/navigation";

const Notification = () => {
  const params = useParams();
  const notificationId = params.notificationId;

  const { data, isLoading } = useGetSingleNotificationQuery(notificationId);
  const notification = data?.data.notification;

  console.log(data);

  const loader = (
    <div className="pb-4 bg-gray-100 w-full space-y-6 bg-white px-4 py-8 space-y-10 w-full h-screen">
      <div className="lg:flex lg:justify-between">
        <p className="px-8 py-4 bg-gray-100 rounded-md w-fit"></p>
        <div className="flex items-center gap-x-2 space-y-2 w-full lg:w-[20%]">
          <div className="h-4 w-4 bg-gray-100 animate-pulse" alt=""></div>
          <p className="w-28 h-2 bg-gray-100 animate-pulse"></p>
        </div>
      </div>
      <h3 className="w-40 h-4 bg-gray-100 animate-pulse"></h3>
      <p className="w-[90%] h-12 bg-gray-100 animate-pulse"></p>
    </div>
  );

  const message = notification?.message;
  const phrases = message?.split("\n");

  return (
    <DashboardLayout header="Notification" icon="">
      {isLoading ? (
        loader
      ) : (
        <div className="pb-4 bg-gray-100 w-full space-y-6 bg-white px-4 py-8 space-y-10 w-full h-screen">
          <div className="lg:flex lg:justify-between">
            <p
              className="px-4 py-1 text-[0.7rem] font-bold rounded-md w-fit"
              style={{
                backgroundColor: `#${notification?.bgColor}`,
                color: `#${notification?.textColor}`,
              }}
            >
              {notification?.type}
            </p>
            <div className="flex text-sm items-center gap-x-2 mt-6 lg:mt-0 w-full lg:w-[20%]">
              <img src="/images/timeIcon.svg" alt="" />
              <p>{time.formatDate(notification?.created_at)}</p>
              <p>at {time.formatTime(notification?.created_at)}</p>
            </div>
          </div>
          <h3 className="font-bold text-sm">{notification?.title}</h3>
          <div className="space-y-[2px]">
            {phrases.map((phrase, index) => (
              <p key={index} className="text-sm message-container">
                {phrase}
              </p>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default WithAuth(Notification);
