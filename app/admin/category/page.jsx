'use client';
import WithAuth from '@/components/withAuth';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useGetFormsQuery } from '@/store/api/applicationApi';
import useForm from '@/hooks/useForm';

import Btn from '@/components/Btn';

import { validator } from '@/utils/validator';
import { normalizeErrors } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

import Table from './Table';
import { useCreateCategoriesMutation } from '@/store/api/categoriesApi';
import Paginations from '@/components/Pagination';

const InitialData = {
  name: '',
};

const Category = () => {
  const router = useRouter();

  const { data, isLoading, isSuccess, error } = useGetFormsQuery('');
  const forms = data?.data?.forms;

  const [
    createCategories,
    {
      isLoading: creatingCategories,
      isSuccess: createCategoriesSuccess,
      error: createCategoriesError,
    },
  ] = useCreateCategoriesMutation();

  const [checkedCategories, setCheckedCategories] = useState([]);
  const { formData, setFormData, handleChange } = useForm(InitialData);

  const handleCheckboxChange = (value) => {
    if (!checkedCategories.includes(value)) {
      setCheckedCategories([...checkedCategories, value]);
    } else {
      setCheckedCategories(checkedCategories.filter((item) => item !== value));
    }
  };

  const createNewCategories = async () => {
    const { name } = formData;

    const isInValid = validator.whiteSpaces(formData);

    if (isInValid) {
      return toast.error('Fill in all fields correctly', { autoClose: 10000 });
    }

    const payload = {
      name: [name],
    };
    await createCategories(payload);
  };

  useEffect(() => {
    if (createCategoriesError) {
      const err = normalizeErrors(createCategoriesError);
      toast.error(err, { autoClose: 30000 });
    }
    if (createCategoriesSuccess) {
      toast.success('Successfully created new Category', { autoClose: 5000 });
      setFormData(InitialData);
    }
  }, [createCategoriesSuccess, createCategoriesError]);

  return (
    <DashboardLayout header="Admin">
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between w-full m-auto pb-8">
          <div className="w-full">
            <h1 className="text-black font-bold text-xl">Create Category</h1>
            <p className="text-gray-600 text-sm">
              create a category by filling the information below
            </p>
          </div>
        </div>
        <div className="bg-white w-full m-aut shadow-md rounded-md space-y-8 py-6 pl-6">
          <h1 className="text-[#46B038] font-bold">DETAILS</h1>
          <div className="space-y-2.5 min-w-[350px]">
            <p className="font-bold">Category</p>
            <input
              type="text"
              name="name"
              className="py-2 px-4 border-[1px] border-solid border-gray-300 rounded-lg w-full"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </div>

          <div className="flex gap-x-4 w-full cursor-pointer">
            <Btn
              text="Create Category"
              loading={creatingCategories}
              loadingMsg="creating category..."
              bgColorClass="bg-[#46B038]"
              handleClick={createNewCategories}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg space-y-6 p-4">
          <h1 className="text-black font-bold">Manage Category Information</h1>
          <Table />
        </div>
        <div className="mt-8"></div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Category);
