"use client";

import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import {
  useLazyDownloadCertificateQuery,
  useLazyMailCertificateQuery,
} from "@/store/api/applicationApi";
import { useGetCertificatesQuery } from "@/store/api/userApi";
import { DownloadIcon, EmptyRecord, MailIcon } from "@/svgs";
import { time } from "@/utils/time&dates";
import { BookMarked, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const applicationStatusColor = {
  AWAITING_PAYMENT: "bg-amber-200 text-amber-800",
  AWAITING_RENEWAL: "bg-teal-200 text-teal-800",
  AWAITING_REVIEW: "bg-purple-200 text-purple-800",
  APPROVED: "bg-green-200 text-green-600",
  REJECTED: "bg-red-100 text-red-600",
};

// const statusColorClass = {
//     ACTIVE:
// }

const tableColumn = [
  "Certificate No.",
  "Application Status",
  "Category",
  "Validity",
  "Status",
  "Action",
];

const Table = () => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [clickDetails, setClickDetails] = useState({
    id: "",
    value: "Open",
  });

  const handleClick = (id) => {
    if (clickDetails.id === id) {
      setClickDetails({ id: "", value: "Open" });
    } else {
      setClickDetails({ id, value: "Close" });
    }
  };

  const router = useRouter();

  const { data, isLoading: isLoadingCerts } = useGetCertificatesQuery();
  console.log(data);

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
  const certificates = data?.data.certificates;
  console.log(data?.data.certificates);

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

  if (isLoadingCerts) return <TableSkeleton />;

  return certificates?.length !== 0 ? (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg text-xs">
      <table className="w-full text-left rtl:text-right">
        <thead className={` bg-dark-gray text-gray-400 py-4 bg-gray-100`}>
          <tr className="whitespace-nowrap">
            {tableColumn.map((data, index) => (
              <th key={index} scope="col" className="lg:px-6 px-4 py-3">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {certificates?.map((data, index) => {
            return (
              <tr
                key={data.id}
                className=" border-b-[1px] border-b-gray-300 border-b-solid cursor-pointer hover:opacity-70"
              >
                <td className={`px-6 py-4`}>{data.ref_no}</td>
                <td className={`px-6 py-4`}>
                  <span
                    className={`${
                      applicationStatusColor[
                        data.applicationData.application_Status
                      ]
                    } rounded-md px-2 w-fit py-1 text-black`}
                  >
                    {data.applicationData.application_Status
                      ?.split("_")
                      .join(" ")}
                  </span>
                </td>
                <td className={`px-6 py-4`}>
                  {data.applicationData.application_name}
                </td>
                <td className={`px-6 py-4`}>
                  {time.formatDate(data.expiry_date)}
                </td>
                <td className={`whitespace-nowrap text-white`}>
                  <div
                    className={`px-2 w-fit py-1 ${
                      data.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
                    } rounded-md`}
                  >
                    {data.status}
                  </div>
                </td>
                <td className={`px-6 py-4`}>
                  <p
                    onClick={() => handleClick(data.id)}
                    className="px-4 py-2 rounded-medium border-gray-300 border-solid border-[1px] w-fit"
                  >
                    {clickDetails.id === data.id ? "Close" : "Open"}
                  </p>
                  {data.id === clickDetails.id &&
                    clickDetails.value === "Close" && (
                      <div className="absolute bg-white py-6 px-6 rounded-lg shadow-xl right-8">
                        {data.status === "ACTIVE" ? (
                          <div className="space-y-4">
                            <p
                              className="flex items-center whitespace-nowrap gap-x-2"
                              onClick={() =>
                                router.push(
                                  `/user/applications/${data.application_id}?status=${data.applicationData.status}&id=${data.application_id}`
                                )
                              }
                            >
                              <EyeIcon size={15} />
                              <span>View Application</span>
                            </p>
                            <p
                              className="flex items-center whitespace-nowrap gap-x-2"
                              onClick={handleDownload}
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
                            </p>
                            <p
                              className="flex items-center whitespace-nowrap gap-x-2"
                              onClick={() =>
                                mailCertificate(data?.application_id)
                              }
                            >
                              {mailing ? (
                                <ClipLoader color="#fff" size={20} />
                              ) : (
                                <span className="">{MailIcon}</span>
                              )}
                              <span className="">
                                {mailing
                                  ? "mailing certificate..."
                                  : "Mail Certificate"}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <p
                              className="flex items-center whitespace-nowrap gap-x-2"
                              onClick={() =>
                                router.push(
                                  `/user/applications/${data.application_id}?status=${data.applicationData.status}&id=${data.application_id}`
                                )
                              }
                            >
                              <EyeIcon size={15} />
                              <span>View Application</span>
                            </p>
                            <p
                              className="flex items-center whitespace-nowrap gap-x-2"
                              onClick={() =>
                                router.push(
                                  `/user/certification/${data.application_id}`
                                )
                              }
                            >
                              <BookMarked size={15} />
                              <span> Renew Application</span>
                            </p>
                            <p
                              className="flex items-center whitespace-nowrap gap-x-2"
                              onClick={handleDownload}
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
                            </p>
                            <p
                              className="flex items-center whitespace-nowrap gap-x-2"
                              onClick={() =>
                                mailCertificate(data?.application_id)
                              }
                            >
                              {mailing ? (
                                <ClipLoader color="#fff" size={20} />
                              ) : (
                                <span className="">{MailIcon}</span>
                              )}
                              <span className="">
                                {mailing
                                  ? "mailing certificate..."
                                  : "Mail Certificate"}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="flex flex-col items-center pt-20 gap-4 bg-white rounded-[4px] h-screen">
      <div className="">{EmptyRecord}</div>
      <h1 className="text-gray-500 lg:text-lg text-sm text-center">
        You haven't gotten any certificate yet.
      </h1>
    </div>
  );
};

export default Table;
