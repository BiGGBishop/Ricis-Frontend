"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import {
  useGetUserActivitiesQuery,
  useGetUserQuery,
} from "@/store/api/userApi";
import { useParams } from "next/navigation";
import UserProfileTab from "./userProfileTab";
import UserLog from "./userLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityTable from "./ActivityTable";


const UserProfile = () => {

  const params = useParams();
  const userId  = params.userId || params.UserId;
  console.log(userId)

  const { data: userData } = useGetUserQuery(userId);
  const details = userData?.data;

  const { data, isLoading, isSuccess } = useGetUserActivitiesQuery(userId);

  const activities = data?.data.application_activities;

  return (
    <DashboardLayout header="Admin">
      <div className="w-full pb-8">
        <h1 className="text-black font-bold text-lg">{details?.first_name} {details?.last_name} Profile</h1>
        <p className="text-gray-600 text-sm">
          view all user account details below
        </p>
      </div>
      <div className="bg-white rounded-lg pl-6 pb-6">
        <h1 className="text-[#46B038] font-bold pt-4 pb-6">USER DETAILS:</h1>
        <Tabs defaultValue="user-profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[33rem] w-full mb-8 overflow-x-auto">
            <TabsTrigger className="w-full" value="user-profile">
              <span className="">User Profile</span>
              {/* <span className="">{Log}</span> */}
            </TabsTrigger>
            <TabsTrigger value="user-log">User Log</TabsTrigger>
            <TabsTrigger value="activity" className="w-full">
              Application Activity Log
            </TabsTrigger>
          </TabsList>
          <TabsContent value="user-profile">
            <UserProfileTab />
          </TabsContent>
          <TabsContent value="user-log">
            <UserLog />
          </TabsContent>
          <TabsContent value="activity">
            <ActivityTable activities={activities} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(UserProfile);
