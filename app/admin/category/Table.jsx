"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import {
  selectFetchingStates,
  selectTransactons,
} from "@/store/features/transactionSlice";
import { cutString } from "@/utils/helpers";
import { time } from "@/utils/time&dates";
import { selectUser } from "@/store/features/userSlice";
import { selectRole } from "@/store/features/userSlice";
import { EmptyRecord } from "@/svgs";
import { categoryData } from "@/utils/categoryData";

const tableHeader = [
  "Ref No",
  "Category",
  "Status",
  "Date Created",
  "Date Modified",
];

const TransactionsTable = () => {
  const router = useRouter();
  const currentUser = useSelector(selectUser);
  const role = useSelector(selectRole);
  //  console.log(role);

  const transactions = useSelector(selectTransactons);
  const fetchingStates = useSelector(selectFetchingStates);
  const isLoading = fetchingStates?.isLoading;
  // const dispatch = useDispatch();
  //console.log(transactions);

  const openClassification = (classificationId) => {
    if (role !== "USER") {
      //  router.push(`/admin/classification/${classificationId}`);
    }
  };

  if (isLoading) return <TableSkeleton />;

  return transactions?.length !== 0 ? (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg text-xs">
      <table className="w-full text-left rtl:text-right">
        <thead className={`bg-dark-gray text-gray-400 py-4 bg-gray-100`}>
          <tr className="whitespace-nowrap">
            {tableHeader.map((data, index) => (
              <th key={index} scope="col" className="lg:px-6 px-4 py-3">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {categoryData?.map((item, index) => {
            // const columns = Object.keys(data);
            return (
              <tr
                onClick={() => openClassification(item?.id)}
                key={item.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.id}
                  {/* {cutString(item.id, 10)} */}
                </th>

                <td className="px-6 py-4 w-100">{item?.label}</td>

                <td className="px-6 py-4">
                  <p
                    className={`px-2.5 py-1.5 text-xs w-fit ${
                      item?.status === "active"
                        ? "bg-green-100 text-green-700"
                        : item?.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    } font-medium rounded-3xl`}
                  >
                    {item?.status.toUpperCase()}
                  </p>
                </td>
                <td className="px-6 py-4  ">
                  {/* <p className="">{time.formatDate(item?.createdAt)}</p> */}
                  <p className="">{item?.createdAt}</p>
                </td>
                <td className="px-6 py-4 space-y-1 flex flex-col items-end ">
                  {/* <p className="">{time.formatDate(item?.createdAt)}</p> */}
                  <p className="">{item?.updatedAt}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="flex flex-col items-center pt-20 gap-4 bg-white rounded-[4px] h-screen">
      <div className="animate-bounce">{EmptyRecord}</div>
      <h1 className="text-gray-500 lg:text-lg text-sm text-center">
        You haven't created any category yet.
      </h1>
    </div>
  );
};

export default TransactionsTable;
