import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import {
  useGetTransactionsQuery,
  useGetTransactionsStatsQuery,
} from "@/store/api/transactionsApi";
import {
  selectEndDate,
  selectStartDate,
} from "@/store/features/statisticsSlice";
import { useSelector } from "react-redux";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  "Application Name",
  "Application Type",
  "Payment channel",
  "Company Revenue",
  "Government Revenue",
];

const OverviewTable = () => {
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);

  const start_date = JSON.parse(startDate);
  const end_date = JSON.parse(endDate);

  const { data, isLoading, isSuccess, error } = useGetTransactionsStatsQuery({
    limit: 20,
    page: 1,
    start_date,
    end_date,
  });

  const stats = data?.data?.transactions?.data;

  console.log({ start_date, end_date });
  console.log(data);

  const token = getToken();

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    const endPoint = `transactions/stats/records?page=1&limit=5&start_date=${start_date}&end_date=${end_date}`;
    axios
      .get(`${baseUrl}/${endPoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setItems(res.data?.data?.transactions?.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get(
        `${baseUrl}/transactions/stats/records?page=${index}&limit=5&start_date=${start_date}&end_date=${end_date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setItems((prevItems) => [
          ...prevItems,
          ...res.data?.data?.transactions?.data,
        ]);

        res.data?.data?.transactions?.data.length > 0
          ? setHasMore(true)
          : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  const scrollLoader = (
    <div className="flex justify-center w-full mx-auto py-10">
      <ClipLoader />
    </div>
  );

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg text-xs">
      <table className="w-full text-left rtl:text-right">
        <thead className={`bg-dark-gray text-gray-400 py-4`}>
          <tr className="whitespace-nowrap">
            {columns.map((column, index) => (
              <th key={column} scope="col" className="lg:px-6 px-4 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {items?.map((overview, index) => {
            // const columns = Object.keys(data);
            const comapany_revenue =
              overview?.amount * overview?.company_percentage * 100;
            const government_revenue =
              overview?.amount * overview?.third_party_percentage * 100;
            return (
              <tr
                // onClick={() => openTransactionInvoice(transaction?.id)}
                key={overview.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  {overview.application.form.name}
                </th>
                <td className="px-6 py-6 w-72">clearance</td>
                <td className="px-6 py-6 w-72">{overview.payment_channel}</td>
                <td className="px-6 py-6 w-72">{comapany_revenue}</td>
                {/* <td className="px-6 py-6 w-72">
                  {overview.third_part_revenue}
                </td> */}
                <td className="px-6 py-6 space-y-1 flex flex-col items-center ">
                  {government_revenue}
                </td>
              </tr>
            );
          })}
          <InfiniteScroll
            dataLength={items?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={items?.length >= 5 && hasMore && scrollLoader}
          />
        </tbody>
      </table>
    </div>
  );
};

export default OverviewTable;
