'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WithAuth from '@/components/withAuth';
import FPI from '../FPI';
import { useRouter } from 'next/navigation';
import useForm from '@/hooks/useForm';
import TextInput from './[applicationId]/TextInput';
import TextArea from './[applicationId]/TextArea';
import DatePicker from './[applicationId]/DatePicker';
import { toast } from 'react-toastify';
import { convertToValidNumberType, removeEmptyFields } from '@/utils/helpers';
import useValidateForm from '@/hooks/useValidateForm';
import { useAddNewApplicationMutation } from '@/store/api/applicationApi';
import PaymentModal from '@/components/modals/paymentModal';

const ApplicationFormFields = () => {
  const router = useRouter();
  const [addNewApplication, { isLoading }] = useAddNewApplicationMutation();

  const formFields = [
    { id: 1, name: 'equipment_incidental', type: 'SHORT_TEXT', required: true },
    { id: 2, name: 'type_of_facility', type: 'SHORT_TEXT', required: true },
    { id: 3, name: 'code_of_construction', type: 'SHORT_TEXT', required: true },
    { id: 4, name: 'year_of_manufacturer', type: 'DATE', required: true },
    { id: 5, name: 'place_of_manufacture', type: 'SHORT_TEXT', required: true },
    { id: 6, name: 'hydro_test_pressure', type: 'SHORT_TEXT', required: true },
    { id: 7, name: 'date_of_hydro_test', type: 'DATE', required: true },
    { id: 8, name: 'inspection_agency', type: 'SHORT_TEXT', required: true },
    { id: 9, name: 'aia_authorization', type: 'SHORT_TEXT', required: true },
    {
      id: 10,
      name: 'equipment_distinctive',
      type: 'SHORT_TEXT',
      required: true,
    },
    { id: 11, name: 'equipment_type', type: 'SHORT_TEXT', required: true },
    { id: 12, name: 'mawp_or_mdmt', type: 'SHORT_TEXT', required: true },

    { id: 14, name: 'design_presure', type: 'SHORT_TEXT', required: true },
    { id: 15, name: 'operating_medium', type: 'SHORT_TEXT', required: true },
    { id: 16, name: 'equipment_line', type: 'NUMBER', required: true },

    { id: 19, name: 'manufacturer', type: 'SHORT_TEXT', required: true },
    { id: 20, name: 'new_or_used', type: 'SHORT_TEXT', required: true },
    {
      id: 21,
      name: 'intended_use_of_equipment',
      type: 'SHORT_TEXT',
      required: true,
    },
    { id: 22, name: 'object_use', type: 'SHORT_TEXT', required: true },
    { id: 23, name: 'installation_start_date', type: 'DATE', required: true },
    {
      id: 24,
      name: 'installation_complete_date',
      type: 'DATE',
      required: true,
    },
    { id: 25, name: 'installer_name', type: 'SHORT_TEXT', required: true },
    {
      id: 26,
      name: 'installer_physical_address',
      type: 'LONG_TEXT',
      required: true,
    },
    {
      id: 27,
      name: 'quality_cert_of_installer_comppany',
      type: 'SHORT_TEXT',
      required: true,
    },
    {
      id: 28,
      name: 'installer_authorization',
      type: 'SHORT_TEXT',
      required: true,
    },
    {
      id: 29,
      name: 'installer_contact_person',
      type: 'SHORT_TEXT',
      required: true,
    },
    { id: 30, name: 'installer_telephone', type: 'NUMBER', required: true },
    { id: 31, name: 'installer_email', type: 'EMAIL', required: true },
    {
      id: 32,
      name: 'name_of_occupier_or_owner',
      type: 'SHORT_TEXT',
      required: true,
    },
    {
      id: 33,
      name: 'nature_of_manufacturing_process',
      type: 'LONG_TEXT',
      required: true,
    },
    { id: 34, name: 'owner_factory_reg', type: 'SHORT_TEXT', required: true },
    {
      id: 35,
      name: 'owner_quality_cert_of_company',
      type: 'SHORT_TEXT',
      required: true,
    },
    { id: 36, name: 'owner_email', type: 'EMAIL', required: true },
    { id: 37, name: 'owner_telephone', type: 'NUMBER', required: true },
    { id: 38, name: 'contact_person', type: 'NUMBER', required: true },
  ];

  let InitialData = {};
  let fieldsInitialErrorStates = {};

  useEffect(() => {
    formFields.forEach((field) => {
      InitialData[field.name] = '';
      fieldsInitialErrorStates[field.name] = {
        value: true,
        type: field.type,
        message: '',
      };
    });
    setFormData(InitialData);
    setErrorFields(fieldsInitialErrorStates);
  }, []);

  const initializer = () =>
    JSON.parse(localStorage.getItem('formData')) || InitialData;
  const { formData, setFormData, handleChange } = useForm(initializer);
  const { validateForm, errorFields, setErrorFields } = useValidateForm(
    fieldsInitialErrorStates,
    'errorFields'
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState(null);

  const [savedCategories, setSavedCategories] = useState({
    categories: [],
    subCategories: [],
    classifications: [],
  });

  useEffect(() => {
    const categories = JSON.parse(
      localStorage.getItem('checkedCategories') || '[]'
    );
    const subCategories = JSON.parse(
      localStorage.getItem('checkedSubCategories') || '[]'
    );
    const classifications = JSON.parse(
      localStorage.getItem('checkedClassifications') || '[]'
    );
    setSavedCategories({
      categories,
      subCategories,
      classifications,
    });
  }, []);

  const handleSubmit = async (isDraft = false) => {
    // For draft, only validate non-empty fields
    // For final submission, validate all fields
    const dataToValidate = isDraft ? removeEmptyFields(formData) : formData;
    const validate = validateForm(dataToValidate);

    if (validate) {
      const formFieldTypesObj = JSON.parse(localStorage.getItem('errorFields'));
      const transformedFormData = convertToValidNumberType(
        dataToValidate,
        formFieldTypesObj
      );

      // Create payload matching backend expectations
      const payload = {
        save_as_draft: isDraft,
        category: parseInt(savedCategories.categories[0], 10),
        sub_category: parseInt(savedCategories.subCategories[0], 10),
        classifications: parseInt(savedCategories.classifications[0], 10),
        ...transformedFormData,
      };
      try {
        await addNewApplication(payload).unwrap();
        toast.success(
          isDraft
            ? 'Draft saved successfully!'
            : 'Application submitted successfully!'
        );

        setShowPaymentModal(true);

        // router.push(isDraft ? '/user/drafts' : '/user/preview');
      } catch (error) {
        toast.error(
          error?.error.message ||
            'An error occurred while saving the application'
        );
      }
    } else {
      toast.error(
        isDraft
          ? 'Fill entered fields correctly'
          : "You're required to correctly fill all fields before you proceed.",
        { autoClose: isDraft ? 20000 : 10000 }
      );
    }
  };

  const FieldTypes = {
    SHORT_TEXT: 'text',
    EMAIL: 'email',
    NUMBER: 'number',
    PHONE: 'tel',
    DATE: 'date',
    LONG_TEXT: 'textarea',
  };

  return (
    <DashboardLayout header="Application Details" icon="">
      <div className="space-y- w-full">
        <div className="space-y-6">
          <div className="flex justify-between items-center w-full">
            <div className="">
              <h1 className="text-black font-bold">Application Details</h1>
              <p className="text-gray-600 text-sm">
                Please fill all information correctly
              </p>
            </div>
          </div>
          <div className="flex justify-auto mx-auto">
            <FPI length={4} shade={3} />
          </div>
          <div className="bg-white w-full shadow-md rounded-md space-y-16 lg:p-6 py-6 px-4 h-fit">
            <div className="flex items-center gap-2">
              <h1 className="text-[#46B038] font-bold">APPLICATION DETAILS:</h1>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-8 lg:gap-y-10 w-full">
              {formFields.map((field) => {
                return field.type === 'SHORT_TEXT' ||
                  field.type === 'EMAIL' ||
                  field.type === 'NUMBER' ||
                  field.type === 'PHONE' ? (
                  <TextInput
                    key={field.id}
                    id={field.id}
                    type={FieldTypes[field.type]}
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name]}
                    fieldCustomType={field.type}
                    isValid={errorFields[field.name]?.value}
                    error={errorFields[field.name]?.message}
                    required={field.required}
                  />
                ) : field.type === 'LONG_TEXT' ? (
                  <TextArea
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name]}
                    isValid={errorFields[field.name]?.value}
                    error={errorFields[field.name]?.message}
                    required={field.required}
                  />
                ) : field.type === 'DATE' ? (
                  <DatePicker
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name]}
                    isValid={errorFields[field.name]?.value}
                    error={errorFields[field.name]?.message}
                    required={field.required}
                  />
                ) : null;
              })}
            </div>
            <div className="flex lg:flex-row flex-col gap-2">
              <div className="flex gap-3 lg:w-fit w-full">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 bg-gray-900 text-white rounded-md hover:opacity-70 w-full lg:w-fit transform active:scale-75 transition-transform"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  disabled={isLoading}
                  className="w-full lg:w-fit px-4 py-2 border border-[#46B038] text-gray-600 rounded-md hover:opacity-70 transform active:scale-75 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save as Draft'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={isLoading}
                className="w-full lg:w-fit lg:px-8 px-6 py-2 bg-[#46B038] hover:opacity-70 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70 transform active:scale-75 transition-transform"
              >
                {isLoading ? 'Submitting...' : 'Next'}
              </button>
            </div>
          </div>
        </div>
        {showPaymentModal && <PaymentModal setPaynow={setShowPaymentModal} />}
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(ApplicationFormFields);
