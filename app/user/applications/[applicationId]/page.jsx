"use client";

import { Suspense } from "react";
import ApplicationFormDetailsSuspenseBoundary from "./ApplicationFormDetailsSuspenseBoundary";
import WithAuth from "@/components/withAuth";

const ApplicationFormDetails = () => {
  return (
    <Suspense>
      <ApplicationFormDetailsSuspenseBoundary />
    </Suspense>
  );
};

export default WithAuth(ApplicationFormDetails);
