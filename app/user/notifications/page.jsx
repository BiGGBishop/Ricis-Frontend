"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import { time } from "@/utils/time&dates";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";
import NoNotification from "@/components/NoNotification";
import NotificationSkeleton from "@/components/skeleton-loaders/NotificationSkeleton";

const NotificationsAdmin = () => {
  const router = useRouter();
  const token = getToken();

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/notifications?page=1&limit=20`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setItems(res.data.data.notifications.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const fetchMoreData = () => {
    axios
      .get(`${baseUrl}/notifications?page=${index}&limit=20`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setItems((prevItems) => [
          ...prevItems,
          ...res.data.data.notifications.data,
        ]);

        res.data.data.notifications.data.length > 0
          ? setHasMore(true)
          : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  const scrollLoader = (
    <div className="flex justify-center w-full">
      <ClipLoader />
    </div>
  );

  return (
    <DashboardLayout header="Notifications" icon="" isSidebarLink={true}>
      <div className="">
        <div className="w-full pb-8">
          <h1 className="text-black font-bold">NOTIFICATIONS</h1>
          <p className="text-gray-600 text-sm">
            view all your notifications below
          </p>
        </div>
        <div className="bg-white p-6 space-y-4">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((notif) => (
                <NotificationSkeleton key={notif} />
              ))
            : items?.map((notification) => {
                const message = notification?.message;
                const phrases = message?.split("\n");

                return (
                  <div
                    onClick={() =>
                      router.push(`/user/notifications/${notification?.id}`)
                    }
                    className="border-b-gray border-b-solid border-b-[1px] pb-4 space-y-2 bg-gray-100 w-full p-4 rounded-md cursor-pointer transform active:scale-75 transition-transform"
                    key={notification.id}
                  >
                    <div className="lg:flex lg:justify-between space-y-2">
                      <p
                        className="px-4 py-1 text-[0.7rem] font-bold rounded-md w-fit"
                        style={{
                          backgroundColor: `#${notification?.bgColor}`,
                          color: `#${notification?.textColor}`,
                        }}
                      >
                        {notification?.type}
                      </p>
                      <div className="flex text-sm items-center gap-x-2 w-full lg:w-[20%]">
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
                );
              })}
          <InfiniteScroll
            dataLength={items?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={items?.length >= 5 && hasMore && scrollLoader}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(NotificationsAdmin);
