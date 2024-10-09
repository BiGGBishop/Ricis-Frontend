import { useParams } from "next/navigation";
import { useGetSingleTransactionQuery } from "@/store/api/transactionsApi";
import { time } from "@/utils/time&dates";

const ApprovalFlow = () => {
  const params = useParams();
  const InvoiceId = params.InvoiceId;
  const { isLoading, isSuccess, isError, error, data } =
    useGetSingleTransactionQuery(InvoiceId);
  const invoice = data?.data?.transaction;

  const governentPercentage = invoice?.third_party_percentage * 100;
  const governentAmount = invoice?.amount * invoice?.third_party_percentage;
  const companyPercentage = invoice?.company_percentage * 100;
  const companyAmount = invoice?.amount * invoice?.company_percentage;

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
    <div className="bg-[#F0FFEE] rounded-lg shadow-md px-6 py-6 space-y-4">
      <h1 className="font-bold text-[#46B038] pb-6">Approval Flow</h1>
      <div className="space-y-2">
        <h2 className="text-gray-700 font-semibold">Payment Channel</h2>
        <p className="text-gray-500">{invoice?.payment_channel}</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-gray-700 font-semibold">Government Allocation</h2>
        <p className="text-gray-500">
          {`${governentPercentage}%`} (&#8358;{`${governentAmount}`})
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-gray-700 font-semibold">Company Allocation</h2>
        <p className="text-gray-500">
          {`${companyPercentage}%`} (&#8358;{`${companyAmount}`})
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-gray-700 font-semibold">Date Initiated</h2>
        <p className="text-gray-500">{time.formatDate(invoice?.createdAt)}</p>
      </div>
    </div>
  );
};

export default ApprovalFlow;
