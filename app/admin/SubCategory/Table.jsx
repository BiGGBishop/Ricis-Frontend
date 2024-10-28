'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

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
import EditSubCategoryModal from './EditSubCategory';
import ConfirmationModal from '../category/ConfirmDeleteModal';

import {
  useGetAllSubCategoriesQuery,
  useUpdateSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
} from '@/store/api/categoriesApi';
import { toast } from 'react-toastify';

const tableHeader = ['Ref No', 'Category', 'Date Created', 'Action'];

const TransactionsTable = () => {
  const router = useRouter();
  const currentUser = useSelector(selectUser);
  const role = useSelector(selectRole);
  //  console.log(role);
  const { isLoading, isSuccess, isError, error, data, refetch } =
    useGetAllSubCategoriesQuery();
  console.log(data);
  const categories = data?.data;

  const [updateSubCategories, { isLoading: isUpdating }] =
    useUpdateSubCategoriesMutation();
  const [deleteSubCategories, { isLoading: isDeletingSubCategory }] =
    useDeleteSubCategoriesMutation();
  // console.log(categoryData);
  const transactions = useSelector(selectTransactons);
  const fetchingStates = useSelector(selectFetchingStates);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (subcategory, e) => {
    e.stopPropagation();
    setSelectedCategory(subcategory);
    setIsModalOpen(true);
  };

  const handleSaveSubCategory = async (updatedSubCategory) => {
    try {
      const result = await updateSubCategories({
        subcategoryId: selectedCategory.id,
        payload: { subcategory: updatedSubCategory.subcategory },
      }).unwrap();

      if (result) {
        setIsModalOpen(false);
        refetch();
        toast.success('Sub Category updated successfully', { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error updating sub category:', error);
      toast.error('Error updating sub category', error?.message, {
        autoClose: 2000,
      });
      throw error;
    }
  };

  const handleDeleteClick = (category, e) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      setIsDeleting(true);

      const result = await deleteSubCategories({
        subcategoryId: selectedCategory.id,
      }).unwrap();

      if (result) {
        refetch();
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
        toast.success(' Sub Category deleted successfully', {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error deleting sub category:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // const isLoading = fetchingStates?.isLoading;
  // const dispatch = useDispatch();
  //console.log(transactions);

  const openClassification = (classificationId) => {
    if (role !== 'USER') {
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
          {categories?.map((item, index) => {
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
                <td className="px-6 py-4 w-100">{item?.name}</td>

                <td className="px-6 py-4  ">
                  {/* <p className="">{time.formatDate(item?.createdAt)}</p> */}
                  <p className="">{item?.createdAt}</p>
                </td>
                {/* <td className="px-6 py-4 space-y-1 flex flex-col items-end ">
                  {/* <p className="">{time.formatDate(item?.createdAt)}</p> 
                </td> */}
                <td className="px-6 py-4 w-26 gap-5 items-center flex flex-row ">
                  <img
                    className="w-5 h-5 text-blue-500"
                    src="/images/edit1.svg"
                    alt=""
                    object
                    onClick={(e) => handleEditClick(item, e)}
                  />
                  <img
                    className="w-5 h-5 text-red-500"
                    src="/images/delete.svg"
                    alt=""
                    onClick={(e) => handleDeleteClick(item, e)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditSubCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subcategory={selectedCategory}
        onSave={handleSaveSubCategory}
        isLoading={isUpdating}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
      />
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
