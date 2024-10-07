"use client";

import { useSearchParams } from "next/navigation";
import ApplicationRejected from "./Rejected";
import ApplicationApproved from "./Approved";
import ApplicationPending from "./Pending";
import { baseUrl } from "@/lib/configs";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/authHelpers";

const ApplicationFormDetailsSuspenseBoundary = () => {
  const params = useSearchParams();
  const applicationStatus = params.get("status");
  const applicationId = params.get("id");
  const [reason, setReason] = useState("");
  const [data, setData] = useState();

  const fethcApp = async () => {
    try {
      const token = getToken();
      const fetchData = await axios.get(
        `${baseUrl}/application/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReason(fetchData?.data?.data?.application?.statusReason);
      console.log(fetchData?.data?.data?.application?.statusReason, "dsjdskj");
      setData(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (applicationId) {
      fethcApp();
    }
  }, []);

  if (applicationStatus.toLocaleLowerCase() === "rejected") {
    return <ApplicationRejected data={data} reason={reason} />;
  }

  if (applicationStatus.toLocaleLowerCase() === "approved") {
    return <ApplicationApproved data={data} />;
  }

  if (applicationStatus.toLocaleLowerCase() === "pending") {
    return <ApplicationPending data={data} />;
  }
};

export default ApplicationFormDetailsSuspenseBoundary;
