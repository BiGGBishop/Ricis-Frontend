"use client";
import Btn from "@/components/Btn";
import FPI from "@/components/FPI";
import FormLayout from "@/components/FormLayout";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import { useSearchParams } from "next/navigation";
import { validator } from "@/utils/validator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "@/store/api/authApi";
import { setLoginTime, setToken } from "@/utils/authHelpers";
import { registrationFormFields } from ".";
import { decodeUrlQueryParams, normalizeErrors } from "@/utils/helpers";

const CreateAccoutSuspenseBoundary = () => {
  const router = useRouter();
  const param = useSearchParams();
  const queryString = param.toString();

  const queryParams = decodeUrlQueryParams(queryString);

  const InitialData = {
    first_name: "",
    last_name: "",
    company_name: "",
    company_location: "",
    // otp: "__",
    company_role: "",
    address: "",
    phone_number: "",
    email: queryParams?.email,
    password: "",
  };
  const { formData, setFormData, handleChange } = useForm(InitialData);
  const [registerUser, { isLoading, isSuccess, error, data }] =
    useRegisterUserMutation();

  console.log("formData", formData);

  const disableBtn = validator.whiteSpaces(formData);
  console.log("disableBtn", disableBtn);

  const email = queryParams?.email;
  // const otp = queryParams?.otp;

  const handleRegisterUser = async () => {
    const isInValid = validator.whiteSpaces(formData);
    // const payload = { ...formData, email };
    if (isInValid) {
      toast.error(validator.errorMessage, { autoClose: 30000 });
      return;
    }
    const dataX = await registerUser(formData);
    console.log("dataX", dataX);
    if (error) {
      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }
    if (isSuccess) {
      toast.success(dataX?.data?.message, { autoClose: 1000 });
      console.log("asss", dataX?.data?.token);
      console.log("data?", dataX?.data);
      router.replace("/user");
      setLoginTime();
    }
  };

  useEffect(() => {
    if (error) {
      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }
    if (isSuccess) {
      toast.success(data?.message, { autoClose: 1000 });
      setToken(data?.data?.token);
      console.log("data", data?.data);
      router.replace("/user");
      setLoginTime();
    }
  }, [isSuccess, data?.data?.token, data?.message, error, router, data?.data]);

  return (
    <FormLayout>
      <div className="w-full lg:w-[35rem] px-4 mx-auto  mt-8 space-y-8">
        <FPI length={3} shade={3} />

        <div className="bg-white rounded-[12px] p-6 border border-[#E6E8EC] space-y-4 ">
          <h1 className="text-lg font-semibold text-gray-700">
            Create Account
          </h1>

          <div className="flex flex-col space-y-[1.5rem]">
            {registrationFormFields.map((field) => (
              <TextInput
                key={field.id}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                value={formData[field.name]}
                handleChange={handleChange}
                name={field.name}
              />
            ))}
          </div>
          <div className="mt-[2.5rem] flex flex-col  space-y-[18px] w-full ">
            <Btn
              text="Next"
              handleClick={handleRegisterUser}
              loading={isLoading}
              loadingMsg="creating account..."
              disabled={disableBtn}
            />
            <h2 className="text-[12px] leading-[14px] text-[#3361FF] inter600 text-center ">
              <Link href="/signin"> Already have an account? Sign In </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default CreateAccoutSuspenseBoundary;
