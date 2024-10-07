import { time } from "@/utils/time&dates";
import Link from "next/link";

const ApplicationStatus = ({ data }) => {
  console.log(data);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="">
          <span className="font-bold text-[#46B038] pr-4 text-sm">
            APPLICATION DETAILS:
          </span>
          <span className="text-sm">{data?.application?.reference_id}</span>
        </div>
        <p
          className={`py-1.5 rounded-3xl w-fit ${
            data?.application?.transactions?.length === 0
              ? "bg-red-100 text-red-600 px-3"
              : "bg-green-100 text-green-700 px-6"
          } `}
        >
          {data?.application?.transactions?.length === 0 ? "Unpaid" : "Paid"}
        </p>
      </div>
      <div className="space-y-4">
        {data?.application?.data?.map((status, index) => {
          // const date = new Date(status.value);
          const isValidDate = status.form_field.type === "DATE";

          return (
            <div key={index} className="space-y-2">
              <h1 className="font-bold text-sm">{status.form_field?.name}</h1>
              {typeof status.value === "string" &&
              status?.value.includes("http") ? (
                <Link className="text-gray-400 text-sm" href={status.value}>
                  {status.value}
                </Link>
              ) : (
                <p className="text-gray-400 text-sm">
                  {isValidDate ? time.formatDate(status.value) : status.value}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationStatus;
