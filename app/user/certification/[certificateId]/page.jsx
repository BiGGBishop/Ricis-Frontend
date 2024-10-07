"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useGetSingleApplicationQuery } from "@/store/api/applicationApi";
import { useParams, useRouter } from "next/navigation";
import TextInput from "../../application-type/[applicationId]/TextInput";
import TextArea from "../../application-type/[applicationId]/TextArea";
import DatePicker from "../../application-type/[applicationId]/DatePicker";
import TextFieldSkeleton from "@/components/skeleton-loaders/TextFieldSkeleton";
import { FieldTypes } from "../../application-type/[applicationId]";
import useForm from "@/hooks/useForm";
import useValidateForm from "@/hooks/useValidateForm";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RenewApplication = () => {
  const params = useParams();
  const certificateId = params.certificateId;
  const router = useRouter();

  const { data, isSuccess, isLoading } =
    useGetSingleApplicationQuery(certificateId);
  const certificate = data?.data.application;
  console.log(data);

  const formFields = certificate?.data?.filter(
    (field) => field?.form_field?.page === 1 || field?.form_field?.page === 2
  );

  // documents are on page 3 of fiels data
  const generatedCertificateDocuments = certificate?.data?.filter(
    (field) => field.form_field.page === 3
  );
  console.log(generatedCertificateDocuments);

  useEffect(() => {
    if (generatedCertificateDocuments?.length !== 0) {
      localStorage.setItem(
        "generatedCertificateDocuments",
        JSON.stringify(generatedCertificateDocuments)
      );
    }
  }, [certificate]);

  let InitialData = {};
  let fieldsInitialErrorStates = {};

  // auto generate form Fields object of dynamic form field
  useEffect(() => {
    const createInitialObject = () => {
      if (formFields?.length !== 0) {
        formFields?.forEach((field) => {
          InitialData[field?.form_field?.name] =
            field.value === null
              ? ""
              : typeof field.value === "number"
              ? String(field.value)
              : field.value;
          fieldsInitialErrorStates[field?.form_field?.name] = {
            value: true,
            type: field?.form_field.type,
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
  }, [certificate]);

  // persist form fields object
  const initializer = () =>
    JSON.parse(localStorage.getItem("certificateFormData")) || InitialData;
  const { formData, setFormData, handleChange } = useForm(initializer);
  const { validateForm, errorFields, setErrorFields } = useValidateForm(
    fieldsInitialErrorStates,
    "certificateErrorFields"
  );

  // fetch persisted data from local storage
  useEffect(() => {
    const storedErrorStates = localStorage.getItem("certificateErrorFields");
    if (storedErrorStates) {
      setFormData(JSON.parse(storedErrorStates));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("certificateErrorFields", JSON.stringify(errorFields));
  }, [formData, errorFields]);

  // fetch persisted data from local storage
  useEffect(() => {
    const storedFormData = localStorage.getItem("certificateFormData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("certificateFormData", JSON.stringify(formData));
  }, [formData]);

  // const [inputValues, setInputValues] = useState({});

  // const handleChange = (id, value) => {
  //   setInputValues(prevState => ({
  //     ...prevState,
  //     [id]: value
  //   }));
  // };

  // const payload = {
  //   form_id: applicationId,
  //   as_draft: false,
  //   data: forms,
  // };

  // const renewApplicationRequest = () => {
  //   const validate = validateForm(formData);
  // }

  const navigateToNextStep = () => {
    const validate = validateForm(formData);
    if (validate) {
      if (generatedCertificateDocuments?.length === 0) {
        router.push(`/user/certification/${certificateId}/preview`);
        return;
      } else {
        // router.push(`/user/application-type/${applicationId}/documents`);
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
    <DashboardLayout header="Renew Application" icon="">
      <form
        autoComplete="off"
        className="grid lg:grid-cols-2 grid-cols-1 gap-y-8 lg:gap-y-10 w-full"
      >
        {isSuccess &&
          certificate?.data?.map((field) => {
            return field.form_field.type === "SHORT_TEXT" ||
              field.form_field.type === "EMAIL" ||
              field.form_field.type === "NUMBER" ||
              field.form_field.type === "PHONE" ? (
              <TextInput
                key={field.id}
                id={field.id}
                type={field.form_field.type}
                name={field.form_field.name}
                onChange={handleChange}
                value={formData[field.form_field.name]}
                isValid={errorFields[field?.form_field.name]?.value}
                error={errorFields[field?.form_field.name]?.message}
                fieldCustomType={field.form_field.type}
                required={field.form_field.required}
                // isValid={isValid}
                // onFocus={}
              />
            ) : field.form_field.type === "LONG_TEXT" ? (
              <TextArea
                key={field.id}
                id={field.id}
                name={field.form_field.name}
                onChange={handleChange}
                value={formData[field.form_field.name]}
                isValid={errorFields[field?.form_field.name]?.value}
                error={errorFields[field?.form_field.name]?.message}
                required={field.form_field.required}
                // isValid={isValid}
              />
            ) : field.form_field.type === "DATE" ? (
              <DatePicker
                key={field.id}
                id={field.id}
                name={field.form_field.name}
                onChange={handleChange}
                value={formData[field.form_field.name]}
                isValid={errorFields[field?.form_field.name]?.value}
                error={errorFields[field?.form_field.name]?.message}
                required={field.form_field.required}
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
        <button
          onClick={navigateToNextStep}
          // disabled={allfieldsNotFilled}
          type="button"
          className="w-[30%] lg:px-8 px-6 py-2 bg-[#46B038] hover:opacity-70 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70 transform active:scale-75 transition-transform"
        >
          Renew
        </button>
      </form>
    </DashboardLayout>
  );
};

export default RenewApplication;
