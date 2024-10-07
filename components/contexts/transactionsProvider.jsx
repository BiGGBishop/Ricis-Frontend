"use client";

import { useGetTransactionsQuery } from "@/store/api/transactionsApi";
import {
  selectPage,
  setTransactions,
  setFetchingStates,
  setTotalPages,
  setPage,
} from "@/store/features/transactionSlice";
import { getToken } from "@/utils/authHelpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TransactionsProvider = ({ children }) => {
  const page = useSelector(selectPage);
  console.log(page);
  const { isLoading, isSuccess, error, data, refetch } =
    useGetTransactionsQuery({ page: page === 0 ? 1 : page, limit: 20 });
  const transactions = data?.data.transactions.data;
  const dispatch = useDispatch();
  const token = getToken();
  console.log(data);
  const totalPages = data?.data?.transactions?.meta?.lastPage;
  const currentPage = data?.data?.transactions?.meta?.currentPage;

  useEffect(() => {
    const fetchingStates = {
      isLoading,
      isSuccess,
      error,
      //   refetch,
    };
    dispatch(setTransactions(transactions));
    dispatch(setFetchingStates(fetchingStates));
    dispatch(setTotalPages(totalPages));
    dispatch(setPage(currentPage));
  }, [transactions, isLoading, isSuccess, error]);

  useEffect(() => {
    refetch();
  }, [token]);

  useEffect(() => {
    refetch();
    dispatch(setTransactions(transactions));
  }, [page]);

  return <>{children}</>;
};

export default TransactionsProvider;
