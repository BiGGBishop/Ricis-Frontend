"use client";
import ApplicationStatus from "./ApplicationStatus";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { DownloadIcon } from "@/svgs";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { getToken } from "@/utils/authHelpers";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { baseUrl } from "@/lib/configs";
import Btn from "@/components/Btn";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { normalizeErrors } from "@/utils/helpers";
import PaymentModal from "@/components/modals/paymentModal";
import { useGetCurrentUserQuery } from "@/store/api/userApi";
import { useSelector } from "react-redux";
import { selectRole } from "@/store/features/userSlice";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import ActivityTable from "./ActivityTable";
import { useGetApplicationActivityQuery } from "@/store/api/applicationApi";

const ApplicationPending = ({ data }) => {
  const [rejectBtnLoader, setRejectBtnLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentModalIsOpen, setPayementModalIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const params = useSearchParams();
  const [reason, setReason] = useState("");
  const applicationId = params.get("id");
  const Params = useParams();
  const ApplicationId = Params.applicationId;

  const role = useSelector(selectRole);

  const { data: applicationActivityData, isLoading } =
    useGetApplicationActivityQuery(ApplicationId);
  const activities = applicationActivityData?.data.application_activities;
  // alert(applicationId)
  const type = params.get("type");
  const [btnLoad, setBtnLoad] = useState(false);
  const pathname = usePathname();

  // const isAdmin = pathname.includes("admin");
  // const router = useRouter();
  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  //   data: currentUser,
  // } = useGetCurrentUserQuery();
  // const role = currentUser?.data.role;
  const isAdmin = role === "ADMIN";

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const handleApprove = async () => {
    setBtnLoad(true);
    try {
      const token = getToken();
      const fetchData = await axios.put(
        `${baseUrl}/application/${applicationId}`,
        {
          status: "APPROVED",
          status_reason: "Application completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (fetchData) {
        setBtnLoad(false);
        window.location.href = "/admin/app-management";
        closeModal();
        toast.success("Account Approved Successfully", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
      setBtnLoad(false);
      toast.error(error.response?.data.error.message, { autoClose: 2000 });
    }
  };

  const handleReject = async () => {
    setBtnLoad(true);
    try {
      const token = getToken();
      const fetchData = await axios.put(
        `${baseUrl}/application/${applicationId}`,
        {
          status: "REJECTED",
          status_reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (fetchData) {
        setBtnLoad(false);
        window.location.href = "/admin/app-management";
        closeModal();
        toast.success("Account Rejected Successfully", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
      setBtnLoad(false);
      toast.error(error.response?.data.error.message, { autoClose: 2000 });
    }
  };

  // const [
  //   createFlutterTransaction,
  //   { isLoading, isSuccess, isError, error, data: payment },
  // ] = useCreateFlutterTransactionMutation();

  // const createNewPayment = async () => {
  //   if (!applicationId) {
  //     toast.error("Application id not found!", { autoClose: 3000 });
  //     return;
  //   }
  //   const payload = { application_id: applicationId };
  //   await createFlutterTransaction(payload);
  // };

  // useEffect(() => {
  //   if (error) {
  //     const err = normalizeErrors(error);
  //     toast.error(err, { autoClose: 2000 });
  //   }
  // }, [error]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     const paymentLink = payment?.data?.link;
  //     router.push(paymentLink);
  //   }
  // }, [isSuccess]);

  const applicationDetailsSection = (
    <>
      {data ? (
        <ApplicationStatus data={data} type={type} />
      ) : (
        <div className="flex items-center justify-center h-[40vh] w-full  ">
          <ClipLoader color="#46B038" size={30} />
        </div>
      )}
      {!type &&
        (isAdmin
          ? data &&
            data?.application?.transactions?.length !== 0 && (
              <div className="flex gap-x-4 w-full lg:justify-start mt-8">
                <button
                  className="rounded-md h-[50%] text-sm text-[#fff] p-2  bg-[#46B038] transform active:scale-75 transition-transform"
                  onClick={() => {
                    setStatus("APPROVED");
                    openModal();
                  }}
                >
                  Approve
                </button>
                <button
                  className="text-sm bg-red-500 h-[50%] text-white py-2 px-4 w-fit rounded-md transform active:scale-75 transition-transform"
                  onClick={() => {
                    setStatus("REJECTED");
                    openModal();
                    // setSaveBtnLoader(true);
                  }}
                >
                  {rejectBtnLoader ? (
                    <ClipLoader color="#fff" size={25} />
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            )
          : data?.application?.transactions?.length === 0 && (
              <div className="mt-8">
                <Btn
                  text="Make payment"
                  // loading={isLoading}
                  // loadingMsg="creating transaction..."
                  handleClick={() => setPayementModalIsOpen(true)}
                />
              </div>
            ))}
    </>
  );

  return (
    <>
      {paymentModalIsOpen && (
        <PaymentModal
          setPaynow={setPayementModalIsOpen}
          application_id={applicationId}
        />
      )}
      <DashboardLayout header="Application">
        <div className="lg:flex lg:justify-between w-[95%] pb-8">
          <div className="w-full pb-8">
            <h1 className="text-black font-bold text-2xl capitalize">
              Application <span className="text-yellow-400">Pending</span>
            </h1>
          </div>
          {/* <div className="lg:w-[30%]">
          <button className="flex items-center gap-1 text-sm bg-[#46B038] text-white py-2 px-4 w-fit rounded-md hover:opacity-70">
            <span className="">{DownloadIcon}</span>
            <span className="">Download Certificate</span>
          </button>
        </div> */}
        </div>
        <div className="bg-white rounded-md pt-8 pl-6 pb-6">
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

        {isOpen && (
          <Modal
            handleClose={closeModal}
            type="pending"
            btnLoader={btnLoad}
            setReason={(re) => {
              setReason(re);
            }}
            handleStatBtn={
              status === "APPROVED"
                ? handleApprove
                : reason.trim() === ""
                ? () => {}
                : handleReject
            }
            text={status === "APPROVED" ? "approve" : "reject"}
          />
        )}
      </DashboardLayout>
    </>
  );
};

export default ApplicationPending;
