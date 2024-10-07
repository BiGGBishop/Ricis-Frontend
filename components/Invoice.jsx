"use client";
import { useGetSingleTransactionQuery } from "@/store/api/transactionsApi";
import { cutString } from "@/utils/helpers";
import { useParams, usePathname } from "next/navigation";

const Invoice = () => {
  const pathname = usePathname();
  const isUser = pathname.includes("user");
  const params = useParams();
  const InvoiceId = params.InvoiceId;
  const { isLoading, isSuccess, isError, error, data } =
    useGetSingleTransactionQuery(InvoiceId);
  const invoice = data?.data?.transaction;
  const status = invoice?.status;
  const reason = invoice?.note;
  console.log(data);

  if (isLoading)
    return (
      <div className="flex flex-col space-y-5">
        {[1, 2, 3, 4, 5, 6, 7].map((loader) => (
          <div
            key={loader}
            className="bg-gray-200 w-96 h-10 animate-pulse"
          ></div>
        ))}
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-md py-6 pl-4">
      <h1 className="font-bold text-[#46B038] pb-6">INVOICE DEATAILS:</h1>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-bold">Payment ID</h1>
          <p className="text-gray-400 text-sm">#{invoice?.id}</p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold">Application Ref</h1>
          <p className="text-gray-400 text-sm">
            {cutString(invoice?.reference, 15)}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold">Application Name</h1>
          <p className="text-gray-400 text-sm">
            {invoice?.application?.form?.name}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold">Applicant Name</h1>
          <p className="text-gray-400 text-sm">
            {invoice?.application?.user?.first_name +
              " " +
              invoice?.application?.user?.last_name}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold">Transaction Status</h1>
          <p
            className={`px-2.5 py-1.5 text-xs w-fit ${
              invoice?.status === "CONFIRMED"
                ? "bg-green-100 text-green-700"
                : invoice?.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-600"
            } font-medium rounded-3xl`}
          >
            {invoice?.status}
          </p>
        </div>
        {isUser && status === "FAILED" && (
          <div className="">
            <h1 className="text-red-500 font-bold">Reason</h1>
            <p className="text-gray-400 text-sm">{`${
              reason ? reason : "Insufficient Balance"
            }`}</p>
          </div>
        )}
        <div className="space-y-2">
          <h1 className="font-bold">Amount Paid</h1>
          <p className="text-gray-400 text-sm">{invoice?.amount} naira</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
