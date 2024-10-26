'use client';
import WithAuth from '@/components/withAuth';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useGetFormsQuery } from '@/store/api/applicationApi';
import useForm from '@/hooks/useForm';
import Btn from '@/components/Btn';

import { validator } from '@/utils/validator';
import { normalizeErrors } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { useGetAllCategoriesQuery } from '@/store/api/categoriesApi';

// import Table from './Table';
import { useCreateSubCategoriesMutation } from '@/store/api/categoriesApi';
import Paginations from '@/components/Pagination';

const InitialData = {
  name: '',
  categoryId: '',
};

const SubCategory = () => {
  const router = useRouter();

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();
  const categories = categoriesData?.data || [];

  const [
    createSubCategories,
    {
      isLoading: creatingSubCategories,
      isSuccess: createSubCategoriesSuccess,
      error: createSubCategoriesError,
    },
  ] = useCreateSubCategoriesMutation();

  const { formData, setFormData, handleChange } = useForm(InitialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createNewSubCategories = async () => {
    const { name, categoryId } = formData;

    // Validate category selection
    if (!categoryId) {
      toast.error('Please select a category before creating a sub-category', {
        autoClose: 5000,
      });
      return;
    }

    if (validator.whiteSpaces({ name })) {
      toast.error('Please select a sub-category name', {
        autoClose: 5000,
      });
      return;
    }

    const payload = {
      name: name.trim(),
      categoryId: parseInt(formData.categoryId),
    };

    try {
      await createSubCategories(payload);
    } catch (error) {
      toast.error('Failed to create sub-category', { autoClose: 5000 });
    }
  };

  useEffect(() => {
    if (createSubCategoriesError) {
      const err = normalizeErrors(createSubCategoriesError);
      toast.error(err, { autoClose: 5000 });
    }
    if (createSubCategoriesSuccess) {
      toast.success('Successfully created new sub-category', {
        autoClose: 5000,
      });
      setFormData(InitialData);
    }
  }, [createSubCategoriesSuccess, createSubCategoriesError]);

  return (
    <DashboardLayout header="Admin">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between w-full pb-8">
          <div className="w-full">
            <h1 className="text-black font-bold text-xl">
              Create Sub Category
            </h1>
            <p className="text-gray-600 text-sm">
              Create a Sub Category by filling the information below
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md space-y-8 p-6">
          <h1 className="text-[#46B038] font-bold">DETAILS</h1>
          <div className="lg:flex gap-x-6 items-start w-full gap-y-6 lg:flex-wrap">
            <div className="space-y-2.5 min-w-[350px]">
              <p className="font-bold">Sub Category Name</p>
              <input
                type="text"
                name="name"
                className="py-2 px-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter sub-category name"
              />
            </div>

            <div className="space-y-2.5 min-w-[200px]">
              <label htmlFor="categoryId" className="block font-bold">
                Choose a Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-x-4 w-full">
            <Btn
              text="Create Sub-Category"
              loading={creatingSubCategories}
              loadingMsg="Creating sub-category..."
              bgColorClass="bg-[#46B038]"
              handleClick={createNewSubCategories}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg space-y-6 p-4">
          <h1 className="text-black font-bold">
            Manage Sub-Category Information
          </h1>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(SubCategory);
