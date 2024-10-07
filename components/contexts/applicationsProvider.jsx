"use client";

import { useGetAllApplicationsQuery } from "@/store/api/applicationApi";
import {
  selectAppliedAfterDate,
  selectAppliedBeforeDate,
  selectModifiedAfterDate,
  selectModifiedBeforeDate,
  selectPage,
  selectTotalPage,
  setApplications,
  setFetchingStates,
  setFirstPage,
  setLastPage,
  setPage,
  setTotalPages,
} from "@/store/features/applicatonsSlice";
import { getToken } from "@/utils/authHelpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "@/lib/configs";
import { EnLocalDateFormat, getDateRange } from "@/utils/helpers";
import { usePathname } from "next/navigation";

const ApplicationsProvider = ({ children }) => {
  const pathname = usePathname();
  const page = useSelector(selectPage);
  console.log(page);

  const searchOptions =
    typeof window !== "undefined" &&
    JSON.parse(localStorage?.getItem("options"));
  const isCustomModifiedDate = searchOptions?.date_modified === "Custom";
  const isCustomAppliedDate = searchOptions?.date_applied === "Custom";

  const modifiedBeforeDate = useSelector(selectModifiedBeforeDate);
  const modifiedAfterDate = useSelector(selectModifiedAfterDate);
  const appliedBeforeDate = useSelector(selectAppliedBeforeDate);
  const appliedAfterDate = useSelector(selectAppliedAfterDate);

  const getSearchPayload = () => {
    const filterModifiedDate = getDateRange(searchOptions?.date_modified);
    const filterAppliedDate = getDateRange(searchOptions?.date_applied);
    const initialPayload = {
      page: page === 0 ? 1 : page,
      limit: 30,
      application_name: searchOptions?.application_name,
      applicant_name: searchOptions?.applicant_name,
      reference_id: searchOptions?.reference_id,
    };
    if (isCustomAppliedDate || isCustomModifiedDate) {
      if (isCustomModifiedDate) {
        return {
          ...initialPayload,
          start_date: modifiedBeforeDate,
          end_date: modifiedAfterDate,
          applied_start_date: filterAppliedDate?.start_date,
          applied_end_date: filterAppliedDate?.end_date,
        };
      }
      if (isCustomAppliedDate) {
        return {
          ...initialPayload,
          start_date: filterModifiedDate?.start_date,
          end_date: filterModifiedDate?.end_date,
          applied_start_date: appliedBeforeDate,
          applied_end_date: appliedAfterDate,
        };
      }
    } else {
      return {
        ...initialPayload,
        start_date: filterModifiedDate.start_date,
        end_date: filterModifiedDate?.end_date,
        applied_start_date: filterAppliedDate?.start_date,
        applied_end_date: filterAppliedDate?.end_date,
      };
    }
  };

  const params = getSearchPayload();

  const { isLoading, isSuccess, error, data, refetch } =
    useGetAllApplicationsQuery(params);
  const applications = data?.data.applications.data;
  const dispatch = useDispatch();
  const token = getToken();
  console.log(data);
  const lastPage = data?.data?.applications?.meta?.lastPage;
  const firstPage = data?.data?.applications?.meta?.firstPage;
  const currentPage = data?.data?.applications?.meta?.currentPage;

  useEffect(() => {
    const fetchingStates = {
      isLoading,
      isSuccess,
      error,
      //   refetch,
    };
    dispatch(setApplications(applications));
    dispatch(setFetchingStates(fetchingStates));
    dispatch(setFirstPage(firstPage));
    dispatch(setLastPage(lastPage));
    // dispatch(setPage(currentPage));
    // dispatch(setTotalPages(totalPages));
  }, [applications, isLoading, isSuccess, error, page, searchOptions]);

  useEffect(() => {
    refetch();
  }, [token, pathname]);

  // const searchOptions = JSON.parse(localStorage.getItem("options"));
  // const isCustomDate = searchOptions.date_modified === "Custom";

  // const searchApplication = async () => {
  //   let payload;

  //   if (isCustomDate) {
  //     payload = {
  //       page: page === 0 ? 1 : page,
  //       limit: 20,
  //       application_name: searchOptions.application_name,
  //       applicant_name: searchOptions.applicant_name,
  //       start_date: "",
  //       end_date: "",
  //       reference_id: searchOptions.reference_id,
  //     };
  //   } else {
  //     const filterDate = getDateModified(searchOptions.date_modified);
  //     console.log(filterDate);
  //     payload = {
  //       page: page === 0 ? 1 : page,
  //       limit: 20,
  //       application_name: searchOptions.application_name,
  //       applicant_name: searchOptions.applicant_name,
  //       start_date: filterDate.start_date,
  //       end_date: filterDate.end_date,
  //       reference_id: searchOptions.reference_id,
  //     };
  //   }
  //   try {
  //     console.log(payload);
  //     const response = await fetch(
  //       `${baseUrl}/application?${new URLSearchParams(payload)}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     dispatch(setApplications(data?.data.applications?.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchingStates = {
  //     isLoading,
  //     isSuccess,
  //     error,
  //     //   refetch,
  //   };
  //   dispatch(setFetchingStates(fetchingStates));
  //   dispatch(setTotalPages(totalPages));
  //   searchApplication();
  // }, [page, totalPages]);

  return <>{children}</>;
};

export default ApplicationsProvider;
