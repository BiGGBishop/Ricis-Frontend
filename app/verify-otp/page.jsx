"use client";

import { Suspense } from "react";
import VerifyOTPSuspenseBoundary from "./VerifyOTPSuspenseBoundary";

const VerifyOTP = () => {
  return (
    <Suspense>
      <VerifyOTPSuspenseBoundary />
    </Suspense>
  );
};

export default VerifyOTP;
