'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import TableSkeleton from '@/components/skeleton-loaders/TableSkeleton';
import {
  selectFetchingStates,
  selectTransactons,
} from '@/store/features/transactionSlice';
import { selectUser, selectRole } from '@/store/features/userSlice';
import { EmptyRecord } from '@/svgs';
import EditCategoryModal from './EditCategoryModal';
import ConfirmationModal from './ConfirmDeleteModal';
import {
  useGetAllCategoriesQuery,
  useUpdateCategoriesMutation,
  useDeleteCategoriesMutation,
} from '@/store/api/categoriesApi';
import { toast } from 'react-toastify';

const tableHeader = ['Ref No', 'Category', 'Date Created', 'Action'];

const TransactionsTable = () => {
  const router = useRouter();
  const currentUser = useSelector(selectUser);
  const role = useSelector(selectRole);

  const { isLoading, data, refetch } = useGetAllCategoriesQuery();
  const categories = data?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [updateCategories, { isLoading: isUpdating }] =
    useUpdateCategoriesMutation();
  const [deletCategories, { isLoading: isDeletingCategory }] =
    useDeleteCategoriesMutation();

  const handleEditClick = (category, e) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (updatedCategory) => {
    try {
      const result = await updateCategories({
        categoryId: selectedCategory.id,
        payload: { category: updatedCategory.category },
      }).unwrap();

      if (result) {
        setIsModalOpen(false);
        refetch();
        toast.success('Category updated successfully', { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Error updating category', error?.message, {
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

      const result = await deletCategories({
        categoryId: selectedCategory.id,
      }).unwrap();

      if (result) {
        refetch();
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
        toast.success('Category deleted successfully', { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openClassification = (classificationId) => {
    if (role !== 'USER') {
      // router.push(`/admin/classification/${classificationId}`);
    }
  };

  if (isLoading) return <TableSkeleton />;

  return categories?.length ? (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg text-xs">
      <table className="w-full text-left rtl:text-right">
        <thead className="bg-dark-gray text-gray-400 py-4 bg-gray-100">
          <tr className="whitespace-nowrap">
            {tableHeader.map((data, index) => (
              <th key={index} scope="col" className="lg:px-6 px-4 py-3">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories?.map((item) => (
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
              </th>
              <td className="px-6 py-4 w-100">{item?.name}</td>
              <td className="px-6 py-4">{item?.createdAt}</td>
              <td className="px-6 py-4 w-26 gap-5 items-center flex flex-row">
                <img
                  className="w-5 h-5 text-blue-500"
                  src="/images/edit1.svg"
                  alt=""
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
          ))}
        </tbody>
      </table>

      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        onSave={handleSaveCategory}
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
