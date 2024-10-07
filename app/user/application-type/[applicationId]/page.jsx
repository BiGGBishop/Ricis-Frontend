"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import FPI from "../../FPI";
import { useParams, useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import {
  useCreateDraftMutation,
  useGetSingleFormFieldsQuery,
} from "@/store/api/applicationApi";
import TextFieldSkeleton from "@/components/skeleton-loaders/TextFieldSkeleton";
import { validator } from "@/utils/validator";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import DatePicker from "./DatePicker";
import { FieldTypes } from ".";
import SaveDraftLoader from "@/components/loaders/saveDraftLoader";
import { toast } from "react-toastify";
import EmptyApplication from "@/components/modals/EmptyApplication";
import useValidateForm from "@/hooks/useValidateForm";
import { convertToValidNumberType, removeEmptyFields } from "@/utils/helpers";
import { useDispatch } from "react-redux";
import { setFormName } from "@/store/features/formSlice";

const ApplicationFormFields = () => {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId;
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error, data } =
    useGetSingleFormFieldsQuery(applicationId);
  const fields = data?.data?.fields;
  const isEmptyApplication = data?.data?.fields?.length === 0;
  // const [errorFields, setErrorFields] = useState()
  const form_name = data?.data?.form_name;

  console.log(data);

  const [
    createNewDraft,
    { data: draftData, isLoading: isDraftLoading, isSuccess: isDraftSuccess },
  ] = useCreateDraftMutation();

  console.log(fields);

  const formFields = useMemo(() => {
    return fields?.filter((field) => field.page === 1 || field.page === 2);
  }, [fields]);

  // forms fields are on page one and 2 of fields data
  // const formFields = fields?.filter(
  //   (field) => field.page === 1 || field.page === 2
  // );

  // documents are on page 3 of fiels data
  const generatedDocuments = fields?.filter((field) => field.page === 3);
  console.log(generatedDocuments);

  useEffect(() => {
    if (generatedDocuments?.length !== 0) {
      localStorage.setItem(
        "generatedDocuments",
        JSON.stringify(generatedDocuments)
      );
    }
  }, [fields]);

  useEffect(() => {
    if (form_name) {
      localStorage.setItem("form_name", JSON.stringify(form_name));
    }
  }, [fields]);

  console.log(data);
  let InitialData = {};
  let fieldsInitialErrorStates = {};
  // const [errorFields, setErrorFields] = useState(fieldsInitialErrorStates);
  // auto generate form Fields object of dynamic form field
  useEffect(() => {
    const createInitialObject = () => {
      if (formFields?.length !== 0) {
        formFields?.forEach((field) => {
          InitialData[field?.name] = "";
          fieldsInitialErrorStates[field?.name] = {
            value: true,
            type: field.type,
            message: "",
          };
        });
        return { InitialData, fieldsInitialErrorStates };
      }
      return {};
    };
    if (formFields?.length !== 0) {
      const { InitialData, fieldsInitialErrorStates } = createInitialObject();
      setFormData(InitialData);
      setErrorFields(fieldsInitialErrorStates);
    }
  }, [fields]);

  // console.log(errorFields);

  // persist form fields object
  const initializer = () =>
    JSON.parse(localStorage.getItem("formData")) || InitialData;
  const { formData, setFormData, handleChange } = useForm(initializer);
  const { validateForm, errorFields, setErrorFields } = useValidateForm(
    fieldsInitialErrorStates,
    "errorFields"
  );

  // fetch persisted data from local storage
  useEffect(() => {
    const storedErrorStates = localStorage.getItem("errorFields");
    if (storedErrorStates) {
      setFormData(JSON.parse(storedErrorStates));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("errorFields", JSON.stringify(errorFields));
  }, [formData, errorFields]);

  // fetch persisted data from local storage
  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // const fieldNotEmpty = validator.notEmpty();

  useEffect(() => {
    if (isDraftSuccess) {
      console.log(draftData);
      router.push(`/user/drafts`);
    }
  }, [isDraftSuccess]);

  const createDraft = async () => {
    const nonEmptyFields = removeEmptyFields(formData);
    const validate = validateForm(nonEmptyFields);
    const isInValidDraft = validator.atLeastOneValueNotEmpty(nonEmptyFields);

    if (isInValidDraft) {
      return toast.error("Fill at least one field to save as draft", {
        autoClose: 20000,
      });
    }

    if (validate) {
      const formFieldTypesObj = JSON.parse(localStorage.getItem("errorFields"));
      const transformedFormData = convertToValidNumberType(
        nonEmptyFields,
        formFieldTypesObj
      );
      const payload = {
        form_id: applicationId,
        data: transformedFormData,
      };
      await createNewDraft(payload);
    } else {
      toast.error("Fill entered fields correctly", { autoClose: 20000 });
    }
    console.log(nonEmptyFields);
  };

  const navigateToNextStep = () => {
    const validate = validateForm(formData);
    if (validate) {
      if (generatedDocuments?.length === 0) {
        router.push(`/user/application-type/${applicationId}/preview`);
        return;
      } else {
        router.push(`/user/application-type/${applicationId}/documents`);
        return;
      }
    } else {
      toast.error(
        "You're required to correctly fill all fields, before you proceed.",
        { autoClose: 10000 }
      );
    }
  };

  return (
    <>
      {isDraftLoading && <SaveDraftLoader />}
      <DashboardLayout header="Application Details" icon="">
        {isEmptyApplication ? (
          <EmptyApplication />
        ) : (
          <div className="space-y- w-full">
            <div className="space-y-6">
              <div className="flex justify-between items-center w-full">
                <div className="">
                  <h1 className="text-black font-bold">
                    Application Name:{" "}
                    <span className="text-[#46B038]">{form_name}</span>
                  </h1>
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
                  <h1 className="text-[#46B038] font-bold">
                    APPLICATION DETAILS:
                  </h1>
                  {/* <span className="">{applicationId}</span> */}
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-8 lg:gap-y-10 w-full">
                  {isSuccess &&
                    formFields?.map((field) => {
                      const fieldNotEmpty = validator.notEmpty(
                        formData[field.name]
                      );
                      return field.type === "SHORT_TEXT" ||
                        field.type === "EMAIL" ||
                        field.type === "NUMBER" ||
                        field.type === "PHONE" ? (
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
                          // isValid={isValid}
                          // onFocus={}
                        />
                      ) : field.type === "LONG_TEXT" ? (
                        <TextArea
                          key={field.id}
                          id={field.id}
                          name={field.name}
                          onChange={handleChange}
                          value={formData[field.name]}
                          isValid={errorFields[field.name]?.value}
                          error={errorFields[field.name]?.message}
                          required={field.required}
                          // isValid={isValid}
                        />
                      ) : field.type === "DATE" ? (
                        <DatePicker
                          key={field.id}
                          id={field.id}
                          name={field.name}
                          onChange={handleChange}
                          value={formData[field.name]}
                          isValid={errorFields[field.name]?.value}
                          error={errorFields[field.name]?.message}
                          required={field.required}
                          // isValid={isValid}
                        />
                      ) : (
                        ""
                      );
                    })}{" "}
                  {(isLoading || !data) &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((loader) => (
                      <TextFieldSkeleton key={loader} />
                    ))}
                </div>
                <div className="flex lg:flex-row flex-col gap-2">
                  <div className="flex gap-3 lg:w-fit w-full">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-2 bg-gray-900 text-white rounded-md hover:opacity-70 w-full lg:w-fit transform active:scale-75 transition-transform "
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={createDraft}
                      className="w-full lg:w-fit  px-4 py-2 border border-[#46B038] text-gray-600 rounded-md hover:opacity-70 transform active:scale-75 transition-transform"
                    >
                      Save as Draft
                    </button>
                  </div>
                  <button
                    // disabled={allfieldsNotFilled}
                    type="button"
                    onClick={navigateToNextStep}
                    className="w-full lg:w-fit lg:px-8 px-6 py-2 bg-[#46B038] hover:opacity-70 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70 transform active:scale-75 transition-transform"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default WithAuth(ApplicationFormFields);
