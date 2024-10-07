"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useSearchParams } from "next/navigation";
import useForm from "@/hooks/useForm";
import { useGetFormsQuery } from "@/store/api/applicationApi";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import WithAuth from "@/components/withAuth";
import FPI from "../FPI";
import { Suspense } from "react";
import { resetForm } from "@/utils/helpers";

const initialFormData = {
  application_type: "",
};

const ApplicationTypesSuspense = () => {
  const param = useSearchParams();
  const categories = param.get("categories");
  const { isLoading, isSuccess, isError, error, data } =
    useGetFormsQuery(categories);
  const { formData, handleChange, setFormData } = useForm(initialFormData);
  const forms = data?.data.forms;
  const selectedFormId = forms?.find(
    (form) => form.name === formData.application_type
  )?.id;
  const router = useRouter();
  console.log(forms);

  // let initialStoredFormData;
  const storageForm = localStorage.getItem("formData");

  // if (
  //   storageForm !== "undefined" &&
  //   storageForm !== "null" &&
  //   storageForm !== undefined &&
  //   storageForm !== null
  // ) {
  //   initialStoredFormData = JSON.parse(localStorage.getItem("formData"));
  // }

  // console.log("Type form", typeof localStorage.getItem("formData"));
  // console.log("type", typeof initialStoredFormData);
  // console.log("formadata", initialStoredFormData);
  // console.log(initialStoredFormData);

  const proceedToNextStep = () => {
    if (!formData.application_type) {
      toast("Select a field to proceed!", { autoClose: 30000 });
      return;
    }
    if (
      storageForm !== "undefined" &&
      storageForm !== "null" &&
      storageForm !== undefined &&
      storageForm !== null
    ) {
      const initialStoredFormData = JSON.parse(
        localStorage.getItem("formData")
      );
      resetForm(initialStoredFormData, "formData");
      console.log("i'm here");
    }
    router.push(`/user/application-type/${selectedFormId}`);
  };

  return (
    <DashboardLayout header="Application Details" icon="">
      <div className="space-y- w-full">
        <div className="space-y-4">
          <div className="flex justify-between items-center w-full">
            <div className="">
              <h1 className="text-black font-bold">NEW APPLICATION</h1>
              <p className="text-gray-600 text-sm">
                Please fill all information correctly
              </p>
            </div>
          </div>
          <div className="flex justify-auto mx-auto">
            <FPI length={4} shade={2} />
          </div>
          <div className="bg-white w-full shadow-md rounded-md space-y-8 p-6 h-screen">
            <h1 className="text-[#46B038] font-bold">APPLICATION DETAILS</h1>
            <form className="max-w-sm">
              <label
                htmlFor="applicationType"
                className="block mb-2 font-medium"
              >
                Application Type
              </label>
              <select
                onChange={handleChange}
                name="application_type"
                value={formData.application_type}
                id=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg lg:w-[70%] p-2.5"
              >
                <option selected className="">
                  Select a Type
                </option>
                {isSuccess &&
                  forms.length !== 0 &&
                  forms?.map((form) => (
                    <option key={form.id} value={form.name}>
                      {form.name}
                    </option>
                  ))}
              </select>
            </form>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="bg-black px-6 py-2.5 text-white text-sm font-medium rounded-md shadow-lg hover:opacity-70"
              >
                Back
              </button>
              <button
                onClick={proceedToNextStep}
                className="bg-[#46B038] px-6 py-2.5 text-white text-sm font-medium rounded-md shadow-lg hover:bg-lime-700 transform active:scale-75 transition-transform"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ApplicationTypes = () => {
  return (
    <Suspense>
      <ApplicationTypesSuspense />
    </Suspense>
  );
};

export default WithAuth(ApplicationTypes);
