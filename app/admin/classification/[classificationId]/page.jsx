'use client';

import Btn from '@/components/Btn';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WithAuth from '@/components/withAuth';
import { useParams } from 'next/navigation';
import useForm from '@/hooks/useForm';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categoryData } from '@/utils/categoryData';
import { toast } from 'react-toastify';
import {
  useGetAllCategoriesQuery,
  useUpdateClassificationsMutation,
  useGetSubCategoriesQuery,
} from '@/store/api/categoriesApi';

const InitialData = {
  category: '',
  sub_category: '',
  classification_name: '',
  application_fee: '',
  incidental_fee: '',
};

const ManageClassification = () => {
  const params = useParams();
  const classificationId = params.classificationId;
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();
  const [
    updateClassifications,
    {
      isLoading: updatingClassification,
      isSuccess: updateClassificationSuccess,
      isError: updateClassificationError,
    },
  ] = useUpdateClassificationsMutation();
  const categories = categoriesData?.data || [];
  const [checkedCategories, setCheckedCategories] = useState([]);
  const { formData, setFormData, handleChange } = useForm(InitialData);

  const handleCheckboxChange = (value) => {
    if (!checkedCategories.includes(value)) {
      setCheckedCategories([...checkedCategories, value]);
    } else {
      setCheckedCategories(checkedCategories.filter((item) => item !== value));
    }
  };

  const UpdateTheClassification = async () => {
    const {
      category,
      sub_category,
      classification_name,
      application_fee,
      incidental_fee,
    } = formData;

    const payload = {
      category: parseInt(category),
      sub_category: parseInt(sub_category),
      classification_name: classification_name.trim(),
      application_fee: parseFloat(application_fee),
      incidental_fee: parseFloat(incidental_fee),
    };

    try {
      await updateClassifications({
        classificationId,
        payload,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to update classification', error?.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    if (updateClassificationError) {
      const err = normalizeErrors(updateClassificationError);
      toast.error(err, { autoClose: 5000 });
    }
    if (updateClassificationSuccess) {
      toast.success('Successfully updated classification', {
        autoClose: 5000,
      });
      setFormData(InitialData);
    }
  }, [updateClassificationSuccess, updateClassificationError]);

  const { data: subCategoriesData, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesQuery(formData.category || '', {
      skip: !formData.category,
    });
  const subCategories = subCategoriesData?.data || [];

  return (
    <DashboardLayout header={`Classification #${classificationId}`}>
      <div className="w-full pb-8">
        <h1 className="text-black font-bold text-lg">Manage Classification</h1>
        <p className="text-gray-600 text-sm">Update classification below</p>
      </div>
      <div className="bg-white w-full m-aut shadow-md rounded-md space-y-8 py-6 pl-6">
        <h1 className="text-[#46B038] font-bold">DETAILS</h1>
        <div className="lg:flex gap-x-6 items-center w-full gap-y-6 lg:flex-wrap">
          <div className="space-y-2.5">
            <p className="font-bold">Classification</p>
            <input
              type="text"
              name="classification_name"
              className="py-2 px-4 border-[1px] border-solid border-gray-300 rounded-lg"
              value={formData.classification_name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </div>
          <div className="max-w-s">
            <label htmlFor="applicationType" className="block mb-2 font-bold">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-s">
            <label htmlFor="applicationType" className="block mb-2 font-bold">
              Sub Category
            </label>
            <select
              name="sub_category"
              value={formData.sub_category}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select sub-category</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2.5">
            <p className="font-bold">Application Fee</p>
            <input
              type="number"
              name="application_fee"
              className="py-2 px-4 border-[1px] border-solid border-gray-300 rounded-lg"
              placeholder="Enter Amount"
              value={formData.application_fee}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2.5">
            <p className="font-bold">Incidental Fee</p>
            <input
              type="number"
              name="incidental_fee"
              className="py-2 px-4 border-[1px] border-solid border-gray-300 rounded-lg"
              placeholder="Enter Amount"
              value={formData.incidental_fee}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-x-4 w-full cursor-pointer">
          <Btn
            text="Update Classification"
            loading={updatingClassification}
            loadingMsg="Updating classification..."
            bgColorClass="bg-[#46B038]"
            handleClick={UpdateTheClassification}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(ManageClassification);
