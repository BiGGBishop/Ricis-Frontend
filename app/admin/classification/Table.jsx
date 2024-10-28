'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import TableSkeleton from '@/components/skeleton-loaders/TableSkeleton';
import {
  selectFetchingStates,
  selectTransactons,
} from '@/store/features/transactionSlice';
import { cutString } from '@/utils/helpers';
import { time } from '@/utils/time&dates';
import { selectUser } from '@/store/features/userSlice';
import { selectRole } from '@/store/features/userSlice';
import { EmptyRecord } from '@/svgs';
import {
  useGetAllClassificationsQuery,
  useDeleteClassificationsMutation,
} from '@/store/api/categoriesApi';
import { useState } from 'react';
import ConfirmationModal from '../category/ConfirmDeleteModal';

const tableHeader = [
  'Ref No',
  'Classification',
  'Category',
  'Sub Category',
  'Application Fee',
  'Incidental Fee',
  'Date Created',
  'Action',
];

const TransactionsTable = () => {
  const router = useRouter();
  const currentUser = useSelector(selectUser);
  const role = useSelector(selectRole);
  //  console.log(role);

  const transactions = useSelector(selectTransactons);
  const fetchingStates = useSelector(selectFetchingStates);
  const isLoading = fetchingStates?.isLoading;
  const {
    data,
    isLoading: isLoadingClassifications,
    isError,
    refetch,
  } = useGetAllClassificationsQuery();
  const classifications = data?.data;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteClassification] = useDeleteClassificationsMutation();

  console.log(classifications);
  // const dispatch = useDispatch();
  //console.log(transactions);

  const handleDeleteClick = (classification) => {
    setSelectedClassification(classification);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteClassification({
        id: selectedClassification.id,
        payload: {},
      }).unwrap();
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Error deleting classification:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openClassification = (classificationId) => {
    if (role !== 'USER') {
      router.push(`/admin/classification/${classificationId}`);
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
          {classifications?.map((classification, index) => {
            // const columns = Object.keys(data);
            return (
              <tr
                key={classification.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {cutString(classification.reference, 10)}
                </th>
                <td
                  className="px-6 py-4 w-80"
                  onClick={() => openClassification(classification?.id)}
                >
                  {classification?.classification_name}
                </td>
                <td
                  className="px-6 py-4 w-80"
                  onClick={() => openClassification(classification?.id)}
                >
                  {classification?.category?.name}
                </td>
                <td
                  className="px-6 py-4 w-80"
                  onClick={() => openClassification(classification?.id)}
                >
                  {classification?.subcategory?.name}
                </td>
                <td
                  className="px-6 py-4 w-20"
                  onClick={() => openClassification(classification?.id)}
                >
                  ₦ {classification?.application_fee}
                </td>
                <td
                  className="px-6 py-4"
                  onClick={() => openClassification(classification?.id)}
                >
                  ₦ {classification?.incidental_fee}
                </td>

                <td
                  className="px-6 py-4"
                  onClick={() => openClassification(classification?.id)}
                >
                  <p className="">
                    {time.formatDate(classification?.createdAt)}
                  </p>
                </td>
                <td className="px-6 py-4 w-26 gap-5 items-center flex flex-row ">
                  <img
                    className="w-5 h-5 text-blue-500"
                    src="/images/edit1.svg"
                    alt=""
                    onClick={() => openClassification(classification?.id)}
                  />
                  <img
                    className="w-5 h-5 text-red-500"
                    src="/images/delete.svg"
                    alt=""
                    onClick={() => handleDeleteClick(classification)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Classification"
        message={`Are you sure you want to delete "${selectedClassification?.classification_name}"? This action cannot be undone.`}
      />
    </div>
  ) : (
    <div className="flex flex-col items-center pt-20 gap-4 bg-white rounded-[4px] h-screen">
      <div className="animate-bounce">{EmptyRecord}</div>
      <h1 className="text-gray-500 lg:text-lg text-sm text-center">
        You haven't created any classification yet.
      </h1>
    </div>
  );
};

export default TransactionsTable;
