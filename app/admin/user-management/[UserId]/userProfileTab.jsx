"use client";

import TextFieldSkeleton from "@/components/skeleton-loaders/TextFieldSkeleton";
import { useGetUserQuery } from "@/store/api/userApi";
import { time } from "@/utils/time&dates";
import { useParams, useSearchParams } from "next/navigation";

const UserProfileTab = () => {
  
  const params = useSearchParams();
  const userId = params.get("id");
  console.log(userId);

  const { isLoading, isSuccess, isError, error, data } =
    useGetUserQuery(userId);
  const details = data?.data;
  console.log(details);
  const userDetails = [
    {
      header: "Name",
      des: details?.first_name + " " + details?.last_name,
    },
    {
      header: "Email Address",
      des: details?.email,
    },
    {
      header: "Phone Number",
      des: details?.phone,
    },
    {
      header: "Date Added",
      des: time.formatDate(details?.created_at),
    },
  ];

  return (
    <div className="space-y-6">
      {isSuccess &&
        userDetails.map((data, index) => (
          <div key={index} className="w-[70%] lg:w-[25%] space-y-2">
            <h2 className="font-bold text-sm">{data.header}</h2>
            <div className="border-[1px] border-gray-150 border-solid rounded-lg py-2 pl-4">
              <p className="text-sm text-gray-400">{data.des}</p>
            </div>
          </div>
        ))}
      {isLoading &&
        [1, 2, 3, 4].map((loader) => <TextFieldSkeleton key={loader} />)}
    </div>
  );
};

export default UserProfileTab;
