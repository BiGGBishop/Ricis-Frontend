'use client';
import WithAuth from '@/components/withAuth';

import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useGetFormsQuery } from '@/store/api/applicationApi';
import useForm from '@/hooks/useForm';

import Btn from '@/components/Btn';

import { validator } from '@/utils/validator';
import { normalizeErrors } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import {
  useGetAllCategoriesQuery,
  useAddClassificationMutation,
  useGetSubCategoriesQuery,
} from '@/store/api/categoriesApi';

import { add, sub } from 'date-fns';

const InitialData = {
  category: '',
  sub_category: '',
  classification_name: '',
  application_fee: '',
  incidental_fee: '',
};

const CreateClassification = () => {
  const router = useRouter();

  const { data, isLoading, isSuccess, error } = useGetFormsQuery('');
  const forms = data?.data?.forms;
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();
  const categories = categoriesData?.data || [];
  const [
    addClassification,
    {
      isLoading: creatingClassification,
      isSuccess: CreateClassificationSuccess,
      error: CreateClassificationError,
    },
  ] = useAddClassificationMutation();

  const [checkedCategories, setCheckedCategories] = useState([]);
  const { formData, setFormData } = useForm(InitialData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const fieldMapping = {
      categoryId: 'category',
      sub_categoryId: 'sub_category',
    };

    const mappedName = fieldMapping[name] || name;

    setFormData((prev) => ({
      ...prev,
      [mappedName]: value,
      ...(name === 'categoryId' && { sub_category: '' }), // Reset sub_category when category changes
    }));
  };

  const handleCheckboxChange = (value) => {
    if (!checkedCategories.includes(value)) {
      setCheckedCategories([...checkedCategories, value]);
    } else {
      setCheckedCategories(checkedCategories.filter((item) => item !== value));
    }
  };

  const CreateClassification = async () => {
    const {
      category,
      sub_category,
      classification_name,
      application_fee,
      incidental_fee,
    } = formData;

    // Validate category selection
    if (!category || !sub_category) {
      toast.error(
        'Please select a category and sub-category before creating a classification',
        {
          autoClose: 5000,
        }
      );
      return;
    }

    if (validator.whiteSpaces({ classification_name })) {
      toast.error('Please select a classification name', {
        autoClose: 5000,
      });
      return;
    }

    const payload = {
      category: parseInt(category),
      sub_category: parseInt(sub_category),
      classification_name: classification_name.trim(),
      application_fee: parseFloat(application_fee),
      incidental_fee: parseFloat(incidental_fee),
    };

    try {
      await addClassification(payload);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create classification', { autoClose: 5000 });
    }
  };

  useEffect(() => {
    if (CreateClassificationError) {
      const err = normalizeErrors(CreateClassificationError);
      toast.error(err, { autoClose: 5000 });
    }
    if (CreateClassificationSuccess) {
      toast.success('Successfully created new classification', {
        autoClose: 5000,
      });
      setFormData(InitialData);
    }
  }, [CreateClassificationSuccess, CreateClassificationError]);

  const { data: subCategoriesData, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesQuery(formData.category || '', {
      skip: !formData.category,
    });
  const subCategories = subCategoriesData?.data || [];

  return (
    <DashboardLayout header="Admin">
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between w-full m-auto pb-8">
          <div className="w-full">
            <h1 className="text-black font-bold text-xl">
              Create Classification
            </h1>
            <p className="text-gray-600 text-sm">
              create a classification by filling the information below
            </p>
          </div>
          {/* <button
            onClick={() => router.push('/admin/category')}
            className="bg-blue-700 text-white shadow-md rounded-md flex gap-x-4 px-6 whitespace-nowrap items-center justify-center py-2 transform active:scale-75 transition-transform"
          >
            <img className="w-4 h-4" src="/images/transactionIcon.svg" alt="" />
            <p className="font-medium text-sm">Add Category</p>
          </button> */}
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
                <option value="" disabled>
                  {isSubCategoriesLoading
                    ? 'Loading sub-categories...'
                    : 'Select sub-category'}
                </option>
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
                type="text"
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
                type="text"
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
              text="Create Classification"
              loading={creatingClassification}
              loadingMsg="creating classification..."
              bgColorClass="bg-[#46B038]"
              handleClick={CreateClassification}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(CreateClassification);
