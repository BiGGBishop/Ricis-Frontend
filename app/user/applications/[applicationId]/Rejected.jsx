import ApplicationStatus from "./ApplicationStatus";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { DownloadIcon } from "@/svgs";
import { ClipLoader } from "react-spinners";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import ActivityTable from "./ActivityTable";
import {
  useGetApplicationActivityQuery,
  useReSubmitApplicationMutation,
} from "@/store/api/applicationApi";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectRole } from "@/store/features/userSlice";
import Btn from "@/components/Btn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { normalizeErrors } from "@/utils/helpers";
import Confirmation from "@/components/modals/Confirmation";

const ApplicationRejected = ({ data, reason }) => {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId;
  const [isConfirming, setIsConfirming] = useState(false);

  const role = useSelector(selectRole);
  const isUser = role === "USER";
  const isAdmin = role === "ADMIN";

  const { data: applicationActivityData, isLoading } =
    useGetApplicationActivityQuery(applicationId);
  const activities = applicationActivityData?.data.application_activities;

  const [
    resubmitApplication,
    { isLoading: resubmiting, error: resubmitError, isSuccess: resubitSuccess },
  ] = useReSubmitApplicationMutation();
  console.log(data);

  const generateFormData = () => {
    let formData = {};
    data?.application?.data?.forEach((field) => {
      formData[field?.form_field?.name] =
        field?.form_field?.type === "NUMBER"
          ? Number(field?.value)
          : field?.value;
    });
    return formData;
  };

  const resubmitRejectedApplication = async () => {
    const formData = generateFormData();
    console.log(formData);
    const payload = {
      form_id: applicationId,
      as_draft: false,
      data: formData,
    };
    await resubmitApplication({ payload, applicationId });
  };

  useEffect(() => {
    if (resubmitError) {
      const err = normalizeErrors(resubmitError);
      setIsConfirming(false);
      toast.error(err, { autoClose: 30000 });
    }
    if (resubitSuccess) {
      setIsConfirming(false);
      toast.success("Your application has been resubmitted", {
        autoClose: 10000,
      });
      router.push(`/user`);
    }
  }, [resubitSuccess, resubmitError]);

  const navigateTEditApplication = () => {
    router.push(`/user/applications/${applicationId}/edit`);
  };

  const applicationDetailsSection = (
    <div className="flex lg:flex-row flex-col  justify-between gap-10 w-full">
      {data ? (
        <ApplicationStatus data={data} />
      ) : (
        <div className="flex items-center justify-center h-[40vh] w-full  ">
          <ClipLoader color="#46B038" size={30} />
        </div>
      )}
      <div className="lg:w-[25rem] w-full h-fit mt-8 pb-6 px-6 pt-8 bg-[#FFF6F6] text-[#7D3434] border-solid border-[1px] border-[#7D3434] rounded-md">
        <p className="pb-4 font-bold">Reason:</p>
        <p className="text-sm text-justify">{reason}</p>
      </div>
    </div>
  );

  return (
    <>
      {isConfirming && (
        <Confirmation
          confirmAction={resubmitRejectedApplication}
          closeModal={() => setIsConfirming(false)}
          loading={resubmiting}
        />
      )}
      <DashboardLayout header="Application">
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center pb-8">
          <div className="w-full pb-4">
            <h1 className="text-black font-bold lg:text-xl text-lg">
              Application <span className="text-red-600">Rejected</span>
            </h1>
          </div>
          {isUser && (
            <div className="flex gap-3 lg:items-center">
              <Btn text="Edit" handleClick={navigateTEditApplication} />
              <Btn
                text="Re-Submit"
                handleClick={() => setIsConfirming(true)}
                bgColorClass="bg-[#46B038]"
              />
            </div>
          )}
        </div>
        <div className="bg-white lg:flex lg:justify-between rounded-md pt-12 px-6 pb-6">
          {isAdmin ? (
            <Tabs defaultValue="staff-logs" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:w-96 w-full mb-8">
                <TabsTrigger className="space-x-2" value="staff-logs">
                  <span className="">Application Details</span>
                  {/* <span className="">{Log}</span> */}
                </TabsTrigger>
                <TabsTrigger value="activity">
                  Application Activity Log
                </TabsTrigger>
              </TabsList>
              <TabsContent value="staff-logs">
                {applicationDetailsSection}
              </TabsContent>
              <TabsContent value="activity">
                <ActivityTable activities={activities} />
              </TabsContent>
            </Tabs>
          ) : (
            applicationDetailsSection
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default ApplicationRejected;
