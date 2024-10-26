'use client';

import Btn from '@/components/Btn';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WithAuth from '@/components/withAuth';
import { useParams } from 'next/navigation';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categoryData } from '@/utils/categoryData';
import {
  useGetAllCategoriesQuery,
  useAddClassificationMutation,
} from '@/store/api/categoriesApi';

const InitialData = {
  role: '',
  staff_name: '',
  staff_email: '',
};

const ManageClassification = () => {
  const params = useParams();
  const classificationId = params.classificationId;

  const [checkedCategories, setCheckedCategories] = useState([]);
  const { formData, setFormData, handleChange } = useForm(InitialData);
  // const [selectedIds, setSelectedIds] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (value) => {
    // Update the checkedItems array based on the checkbox state
    if (!checkedCategories.includes(value)) {
      setCheckedCategories([...checkedCategories, value]);
      // setSelectedIds([...selectedIds, value]);
    } else {
      setCheckedCategories(checkedCategories.filter((item) => item !== value));
    }
  };

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
              name="staff_name"
              className="py-2 px-4 border-[1px] border-solid border-gray-300 rounded-lg"
              value={formData.staff_name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </div>
          <div className="max-w-s">
            <label htmlFor="applicationType" className="block mb-2 font-bold">
              Category
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>
                Select category
              </option>
              {categoryData?.map((item) => (
                <option key={item?.id} value={item?.value}>
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-s">
            <label htmlFor="applicationType" className="block mb-2 font-bold">
              Sub Category
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>
                Select sub-category
              </option>
              <option value="sub-cat-1">Sub Category 1</option>
              <option value="sub-cat-2">Sub Category 2</option>
            </select>
          </div>

          <div className="space-y-2.5">
            <p className="font-bold">Application Fee</p>
            <input
              type="text"
              name="staff_email"
              className="py-2 px-4 border-[1px] border-solid border-gray-300 rounded-lg"
              placeholder="Enter Amount"
              value={formData.staff_email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2.5">
            <p className="font-bold">Incidental Fee</p>
            <input
              type="text"
              name="staff_email"
              className="py-2 px-4 border-[1px] border-solid border-gray-300 rounded-lg"
              placeholder="Enter Amount"
              value={formData.staff_email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div
          className="flex gap-x-4 w-full cursor-pointer"
          // onClick={() => {
          //   // createStaff();
          // }}
        >
          <Btn
            text="Update Classification"
            loading={false}
            loadingMsg="update category..."
            bgColorClass="bg-[#46B038]"
            handleClick={() => console.log('update classification')}
          />
          {/* <button className="text-sm bg-[#46B038] h-[50%] text-white py-2 px-4 w-fit rounded-md flex items-center justify-center">
              {btnLoad ? (
                <ClipLoader color="#fff" size={20} />
              ) : btnLoad ? (
                "Creating..."
              ) : (
                "Create Account"
              )}
            </button> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(ManageClassification);
