"use client";
import Btn from "@/components/Btn";
import FPI from "@/components/FPI";
import FormLayout from "@/components/FormLayout";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import {
  useRequestRegistrationOTPMutation,
  useRequestResetPasswordOTPMutation,
} from "@/store/api/authApi";
import { normalizeErrors } from "@/utils/helpers";
import { validator } from "@/utils/validator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "@/utils/authHelpers";
import { Checkbox } from "@/components/ui/checkbox";

const InitialData = {
  email: "",
  membership: "",
};

const ResetPassword = () => {
  const router = useRouter();
  const { formData, setFormData, handleChange } = useForm(InitialData);
  const [
    requestResetPasswordOTP,
    { isLoading, isSuccess, isError, error, data },
  ] = useRequestResetPasswordOTPMutation();
  const token = getToken();
  const isValid = validator.whiteSpaces(formData);
  const as_staff = formData.membership === "staff";
  //   const [isChecked, setIsChecked] = useState(false);

  //   const handleCheckboxChange = (e) => {
  //     setIsChecked(e.target.checked);
  //   };

  const handleRequestOTP = async () => {
    const emailIsInValid =
      !validator.validateEmail(formData.email) ||
      validator.whiteSpaces(formData);
    if (emailIsInValid) {
      toast.warning("Enter a valid email!", { autoClose: 10000 });
      return;
    }
    const { email, membership } = formData;
    // const as_staff = membership === "staff";
    await requestResetPasswordOTP({ email, as_staff });
  };

  useEffect(() => {
    if (error) {
      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }
    if (isSuccess) {
      toast.success(data?.message, { autoClose: 7000 });
      router.push(`/reset-password/verify-otp?email=${formData.email}&as_staff=${as_staff}`);
    }
  }, [isSuccess, isError, data?.message, error, router]);

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

        <div className="bg-white rounded-[12px] py-[3rem] px-4 lg:px-8 border border-[#E6E8EC] mt-[1.5rem] space-y-4 ">
          <h1 className="text-lg font-semibold">Reset Password</h1>

          <TextInput
            label="Email"
            placeholder="Enter Email"
            type="text"
            value={formData.email}
            handleChange={handleChange}
            name="email"
          />

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500 font-semibold">Account Type</p>
            <select
              onChange={handleChange}
              name="membership"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg lg:w-full p-2.5"
            >
              <option selected className="">
                Select your account type
              </option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div className="mt-[2.5rem] flex flex-col  space-y-[18px] w-full ">
            <Btn
              text="Next"
              handleClick={handleRequestOTP}
              loading={isLoading}
              loadingMsg="requesting..."
              disabled={isValid}
            />
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default ResetPassword;
