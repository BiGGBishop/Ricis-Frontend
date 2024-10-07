"use client";

import Btn from "@/components/Btn";
import FPI from "@/components/FPI";
import FormLayout from "@/components/FormLayout";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import {
  useRequestRegistrationOTPMutation,
  useRequestResetPasswordOTPMutation,
  useResetPasswordMutation,
} from "@/store/api/authApi";
import { decodeUrlQueryParams, normalizeErrors } from "@/utils/helpers";
import { validator } from "@/utils/validator";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "@/utils/authHelpers";
import { Checkbox } from "@/components/ui/checkbox";

const InitialData = {
  new_password: "",
  confirm_password: "",
};

const NewPasswordSuspense = () => {
  const param = useSearchParams();
  const router = useRouter();
  const { formData, setFormData, handleChange } = useForm(InitialData);
  const [resetPassword, { isLoading, isSuccess, isError, error, data }] =
    useResetPasswordMutation();
  const token = getToken();
  const isValid = validator.whiteSpaces(formData);
  const [isInvalid, setIsInvalid] = useState(false);

  const queryString = param.toString();

  const queryParams = decodeUrlQueryParams(queryString);
  const email = queryParams?.email;
  const as_staff = queryParams?.as_staff;
  const otp = queryParams?.otp;

  const handleResetPassword = async () => {
    const { new_password, confirm_password } = formData;
    const isMatch = validator.confirmPassword(new_password, confirm_password);

    if (!isMatch) {
      setIsInvalid(true);
      return;
    }
    await resetPassword({ email, otp, new_password, as_staff });
  };

  useEffect(() => {
    if (error) {
      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }
    if (isSuccess) {
      toast.success(data?.message, { autoClose: 7000 });
      router.push("/signin");
    }
  }, [isSuccess, isError, data?.message, error, formData.email, router]);

  useEffect(() => {
    const { new_password, confirm_password } = formData;
    const isMatch = validator.confirmPassword(new_password, confirm_password);
    if (isMatch) {
      setIsInvalid(false);
    }
  }, [formData]);

  //   useEffect(() => {
  //     if (token) {
  //       router.replace("/user");
  //     }
  //   }, [token, router]);
  console.log(formData);

  return (
    <FormLayout>
      <div className="w-full lg:w-[35rem] px-4 mx-auto mt-8 space-y-8">
        {/* <FPI length={3} shade={1} /> */}

        <div className="bg-white rounded-[12px] py-[3rem] px-4 lg:px-8 border border-[#E6E8EC] mt-[1.5rem] space-y-6 ">
          <h1 className="text-lg font-semibold">Reset Password</h1>

          <div className="">
            <TextInput
              label="New Password"
              placeholder="Enter new password"
              type="password"
              value={formData.new_password}
              handleChange={handleChange}
              name="new_password"
            />
          </div>

          <div className="space-y-2">
            <TextInput
              label="Confirm Password"
              placeholder="Confirm new password"
              type="password"
              value={formData.confirm_password}
              handleChange={handleChange}
              name="confirm_password"
              className={`${isInvalid ? "ring-2 ring-red-400" : ""}`}
            />
            <p className="text-xs text-red-500 italic">
              {isInvalid ? "Password don't Match!" : ""}
            </p>
          </div>

          <div className="mt-[2.5rem] flex flex-col  space-y-[18px] w-full ">
            <Btn
              text="Change password"
              handleClick={handleResetPassword}
              loading={isLoading}
              loadingMsg="sending request..."
              disabled={isValid}
            />
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

// export default NewPassword;

const NewPassword = () => {
  return (
    <Suspense>
      <NewPasswordSuspense />
    </Suspense>
  );
};

export default NewPassword;
