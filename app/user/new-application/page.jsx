'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WithAuth from '@/components/withAuth';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('');

  const handleSelectionChange = (value, type) => {
    switch (type) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'subcategory':
        setSelectedSubCategory(value);
        break;
      case 'classification':
        setSelectedClassification(value);
        break;
    }
  };

  const validateSelections = () => {
    const missingSelections = [];
    if (!selectedCategory) missingSelections.push('Category');
    if (!selectedSubCategory) missingSelections.push('Sub Category');
    if (!selectedClassification) missingSelections.push('Classification');
    return missingSelections;
  };

  localStorage.setItem('checkedCategories', selectedCategory);
  localStorage.setItem('checkedSubCategories', selectedSubCategory);
  localStorage.setItem('checkedClassifications', selectedClassification);

  const navigateToNextStep = () => {
    const missingSelections = validateSelections();

    if (missingSelections.length > 0) {
      toast.error(`Please select a: ${missingSelections.join(', ')}`, {
        autoClose: 5000,
      });
      return;
    }
    router.push('/user/application-type');
  };

  const SelectionSection = ({ title, items, value, type, isLoading }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-500">{title}</h3>
      </div>
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center p-4">
            <ClipLoader size={40} />
          </div>
        ) : (
          <Select
            value={value}
            onValueChange={(newValue) => handleSelectionChange(newValue, type)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${title}`} />
            </SelectTrigger>
            <SelectContent>
              {items?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name || item.classification_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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
            * All selections are required
          </p>
        </div>

        <div className="flex justify-center">
          <FPI length={4} shade={1} />
        </div>

        <div className="flex-1 bg-white p-6 shadow-md rounded-md space-y-6">
          <h2 className="text-[#46B038] font-medium">APPLICATION DETAILS</h2>

          <div className="space-y-6">
            <SelectionSection
              title="Category *"
              items={categories}
              value={selectedCategory}
              type="category"
              isLoading={isLoadingCategories}
            />

            <SelectionSection
              title="Sub Category *"
              items={subCategories}
              value={selectedSubCategory}
              type="subcategory"
              isLoading={isLoadingSubCategories}
            />

            <SelectionSection
              title="Classification *"
              items={classifications}
              value={selectedClassification}
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
