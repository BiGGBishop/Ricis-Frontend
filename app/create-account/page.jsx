"use client";

import { Suspense } from "react";
import CreateAccoutSuspenseBoundary from "./CreateAccoutSuspenseBoundary";

const CreateAccount = () => {
  return (
    <Suspense>
      <CreateAccoutSuspenseBoundary />
    </Suspense>
  );
};

export default CreateAccount;
