"use client";
import Btn from "@/components/Btn";
import FPI from "@/components/FPI";
import FormLayout from "@/components/FormLayout";
import useForm from "@/hooks/useForm";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, Suspense, useState } from "react";
import { toast } from "react-toastify";
import { validator } from "@/utils/validator";
import { useRouter } from "next/navigation";
import { useVerifyResetPasswordOTPMutation } from "@/store/api/authApi";
import { otpNumbersFields } from ".";
import { decodeUrlQueryParams, normalizeErrors } from "@/utils/helpers";
import { getToken } from "@/utils/authHelpers";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const InitialData = {
  first_number: "",
  second_number: "",
  third_number: "",
  fourth_number: "",
};

const VerifyOTPSuspenseBoundary = () => {
  const [otpValue, setOtpValue] = useState("");

  const param = useSearchParams();
  const { formData, setFormData, handleChange } = useForm(InitialData);
  const [
    verifyResetPasswordOTP,
    { isLoading, isSuccess, isError, error, data },
  ] = useVerifyResetPasswordOTPMutation();
  const disableBtn = !validator.notEmpty(otpValue);
  const router = useRouter();

  const queryString = param.toString();

  const queryParams = decodeUrlQueryParams(queryString);
  const email = queryParams?.email;
  const as_staff = queryParams?.as_staff;


  const token = getToken(); 

  const handleVerifyOTP = async () => {
    const payload = { email, otp: otpValue };
    console.log(payload);
    if (!validator.validateOTPCode(otpValue)) {
      toast.error("Enter valid otp codes!", { autoClose: 10000 });
      return;
    }
    await verifyResetPasswordOTP(payload);
  };
  console.log(error);

  useEffect(() => {
    if (error) {
      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }
    if (isSuccess) {
      toast.success(data?.message, { autoClose: 7000 });
      router.push(
        `/reset-password/new-password?email=${email}&otp=${otpValue}&as_staff=${as_staff}`
      );
    }
  }, [isSuccess, data?.message, email, error, router]);

  //   useEffect(() => {
  //     if (token) {
  //       router.replace("/user");
  //     }
  //   }, [token, router]);

  return (
    <FormLayout>
      <div className="w-full lg:w-[35rem] mx-auto mt-8 px-4 space-y-8">
        {/* <FPI length={3} shade={2} /> */}

        <div className="bg-white rounded-[12px] py-[3rem] px-4 lg:px-8 border border-[#E6E8EC] space-y-4 lg:space-y-8 mt-[1.5rem]  ">
          <h1 className="text-lg font-semibold">Verification Code</h1>

          <div className="space-y-3">
            <h2 className=" text-md text-[#8D8D8D] ">OTP</h2>
            <div className="flex justify-center space-x-4">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(otpValue) => setOtpValue(otpValue)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="mt-[2.5rem] flex flex-col  space-y-[18px] w-full ">
            <Btn
              text="Next"
              handleClick={handleVerifyOTP}
              loading={isLoading}
              disabled={disableBtn}
              loadingMsg="Verifying..."
            />
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

const VerifyOTP = () => {
  return (
    <Suspense>
      <VerifyOTPSuspenseBoundary />
    </Suspense>
  );
};

export default VerifyOTP;
