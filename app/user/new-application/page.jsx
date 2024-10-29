'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WithAuth from '@/components/withAuth';
import { Checkbox } from '@/components/ui/checkbox';
import Btn from '@/components/Btn';
import FPI from '../FPI';
import { useRouter } from 'next/navigation';
import { useGetCategoriesQuery } from '@/store/api/applicationApi';
import {
  useGetAllClassificationsQuery,
  useGetAllSubCategoriesQuery,
} from '@/store/api/categoriesApi';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const NewApplication = () => {
  const router = useRouter();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const { data: subCategoriesData, isLoading: isLoadingSubCategories } =
    useGetAllSubCategoriesQuery();
  const { data: classificationsData, isLoading: isLoadingClassifications } =
    useGetAllClassificationsQuery();

  const categories = categoriesData?.data;
  const subCategories = subCategoriesData?.data;
  const classifications = classificationsData?.data;

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedSubCategories, setCheckedSubCategories] = useState([]);
  const [checkedClassifications, setCheckedClassifications] = useState([]);

  const handleCheckboxChange = (value, type) => {
    switch (type) {
      case 'category':
        setCheckedCategories(
          checkedCategories.includes(value)
            ? checkedCategories.filter((item) => item !== value)
            : [...checkedCategories, value]
        );
        break;
      case 'subcategory':
        setCheckedSubCategories(
          checkedSubCategories.includes(value)
            ? checkedSubCategories.filter((item) => item !== value)
            : [...checkedSubCategories, value]
        );
        break;
      case 'classification':
        setCheckedClassifications(
          checkedClassifications.includes(value)
            ? checkedClassifications.filter((item) => item !== value)
            : [...checkedClassifications, value]
        );
        break;
    }
  };

  const validateSelections = () => {
    const missingSelections = [];
    if (checkedCategories.length === 0) missingSelections.push('Categories');
    if (checkedSubCategories.length === 0)
      missingSelections.push('Sub Categories');
    if (checkedClassifications.length === 0)
      missingSelections.push('Classifications');
    return missingSelections;
  };

  localStorage.setItem('checkedCategories', JSON.stringify(checkedCategories));
  localStorage.setItem(
    'checkedSubCategories',
    JSON.stringify(checkedSubCategories)
  );
  localStorage.setItem(
    'checkedClassifications',
    JSON.stringify(checkedClassifications)
  );

  const navigateToNextStep = () => {
    const missingSelections = validateSelections();
    if (missingSelections.length > 0) {
      toast.error(
        `Please select at least one item from: ${missingSelections.join(', ')}`,
        {
          autoClose: 5000,
        }
      );
      return;
    }
    router.push('/user/application-type');
  };

  const CategorySection = ({ title, items, checkedItems, type, isLoading }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-500">{title}</h3>
        <span className="text-sm text-gray-500">
          {checkedItems.length} selected
        </span>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="max-h-80 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <ClipLoader size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Checkbox
                    value={item.id}
                    checked={checkedItems.includes(item.id)}
                    onCheckedChange={() => handleCheckboxChange(item.id, type)}
                    className="mt-1"
                  />
                  <label className="text-sm font-medium leading-tight cursor-pointer">
                    {item.name || item.classification_name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const isLoading =
    isLoadingCategories || isLoadingSubCategories || isLoadingClassifications;

  return (
    <DashboardLayout header="New Application" icon="">
      <div className="flex flex-col min-h-screen space-y-4 w-full max-w-7xl mx-auto px-4">
        <div>
          <h1 className="font-semibold text-lg">New Application</h1>
          <p className="text-sm">Select your preferred application category</p>
          <p className="text-sm text-gray-500 mt-1">
            * All sections require at least one selection
          </p>
        </div>

        <div className="flex justify-center">
          <FPI length={4} shade={1} />
        </div>

        <div className="flex-1 bg-white p-6 shadow-md rounded-md space-y-6">
          <h2 className="text-[#46B038] font-medium">APPLICATION DETAILS</h2>

          <div className="space-y-6">
            <CategorySection
              title="Categories *"
              items={categories}
              checkedItems={checkedCategories}
              type="category"
              isLoading={isLoadingCategories}
            />

            <CategorySection
              title="Sub Categories *"
              items={subCategories}
              checkedItems={checkedSubCategories}
              type="subcategory"
              isLoading={isLoadingSubCategories}
            />

            <CategorySection
              title="Classifications *"
              items={classifications}
              checkedItems={checkedClassifications}
              type="classification"
              isLoading={isLoadingClassifications}
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => router.back()}
              className="bg-black px-6 py-2.5 text-white text-sm font-medium rounded-md shadow-lg hover:opacity-70 transform active:scale-75 transition-transform"
            >
              Back
            </button>
            <Btn
              handleClick={navigateToNextStep}
              bgColorClass="bg-[#46B038]"
              text="Next"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(NewApplication);
