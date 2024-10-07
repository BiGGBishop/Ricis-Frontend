import ApplicationStatus from "./ApplicationStatus";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  useDownloadCertificateQuery,
  useGetApplicationActivityQuery,
  useLazyDownloadCertificateQuery,
  useLazyMailCertificateQuery,
} from "@/store/api/applicationApi";
import { DownloadIcon, MailIcon } from "@/svgs";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { normalizeErrors } from "@/utils/helpers";
import { toast } from "react-toastify";
import ActivityTable from "./ActivityTable";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectRole } from "@/store/features/userSlice";

const ApplicationApproved = ({ data }) => {
  console.log(data)
  const params = useParams();
  const applicationId = params.applicationId;
  const userId = data?.application.user_id;
  console.log(data)

  const role = useSelector(selectRole);
  const isAdmin = role === "ADMIN";

  const [
    downloadCertificate,
    { isLoading: isDownloading, isSuccess, isError, error, data: certificate },
  ] = useLazyDownloadCertificateQuery();
  const [
    mailCertificate,
    {
      isLoading: mailing,
      isSuccess: mailingSuccess,
      error: mailingError,
      data: mail,
    },
  ] = useLazyMailCertificateQuery();

  const {
    data: applicationActivityData,
    isLoading: applicationActivityIsLoading,
  } = useGetApplicationActivityQuery(applicationId);

  const activities = applicationActivityData?.data.application_activities;

  console.log(applicationActivityData)

  useEffect(() => {
    if (mailingSuccess) {
      toast.success("Certifcate successfully sent to your mail!", {
        autoClose: 5000,
      });
    }
  }, [mailingSuccess]);

  const handleDownload = async () => {
    await downloadCertificate(data?.application?.id);
    const url = window.URL.createObjectURL(new Blob([certificate]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "certificate.pdf"); // Set the name for the downloaded file
    document.body.appendChild(link);
    link.click();
  };

  const applicationDetailsSection = (
    <>
      {
        data ? (
          <ApplicationStatus data={data} />
        ) : (
          <div className="flex items-center justify-center h-[40vh] w-full  ">
            <ClipLoader color="#46B038" size={30} />
          </div >
        )}
    </>
  );

  return (
    <DashboardLayout header="Application">
      <div className="lg:flex lg:justify-between w-[95%] pb-8">
        <div className="w-full pb-8">
          <h1 className="text-black font-bold text-2xl">
            Application <span className="text-green-300">Approved</span>
          </h1>
          {/* <p className="text-gray-600 text-sm">
            Congratulations! Your Application was successful
          </p> */}
        </div>
        <div className="lg:w-[30%] space-y-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 text-sm bg-[#46B038] text-white py-2 px-4 w-fit rounded-md hover:opacity-70 transform active:scale-75 transition-transform"
          >
            {isDownloading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              <span className="">{DownloadIcon}</span>
            )}
            <span className="">
              {isDownloading
                ? "downloading certificate..."
                : "Download Certificate"}
            </span>
          </button>
          <button
            onClick={() => mailCertificate(data?.application?.id)}
            className="flex items-center gap-1 text-sm bg-[#46B038] text-white py-2 px-4 w-fit rounded-md hover:opacity-70 transform active:scale-75 transition-transform"
          >
            {mailing ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              <span className="">{MailIcon}</span>
            )}
            <span className="">
              {mailing ? "mailing certificate..." : "Mail Certificate"}
            </span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-md pt-8 pl-6 pb-6">
        {isAdmin ?
          <Tabs defaultValue="staff-logs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-96 w-full mb-8">
              <TabsTrigger className="space-x-2" value="staff-logs">
                <span className="">Application Details</span>
                {/* <span className="">{Log}</span> */}
              </TabsTrigger>
              <TabsTrigger value="activity">Application Activity Log</TabsTrigger>
            </TabsList>
            <TabsContent value="staff-logs">
              {applicationDetailsSection}
            </TabsContent>
            <TabsContent value="activity">
              <ActivityTable activities={activities} />
            </TabsContent>
          </Tabs>
          :
          applicationDetailsSection
        }
      </div>
    </DashboardLayout>
  );
};

export default ApplicationApproved;
