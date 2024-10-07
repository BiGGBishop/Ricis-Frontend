"use client";

import { Suspense } from "react";
import WithAuth from "@/components/withAuth";
import DashboardSuspenseBoundary from "./dashboardSuspenseBoundary";

const Dashboard = () => {
  return (
    <Suspense>
      <DashboardSuspenseBoundary />
    </Suspense>
  );
};

export default WithAuth(Dashboard);
