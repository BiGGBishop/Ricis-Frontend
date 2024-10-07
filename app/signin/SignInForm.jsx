"use client";

import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import { useSignInUserMutation } from "@/store/api/authApi";
import { getToken, setToken, setLoginTime } from "@/utils/authHelpers";
import { validator } from "@/utils/validator";
import { toast } from "react-toastify";
import { useEffect } from "react";
import TextInput from "@/components/TextInput";
import Btn from "@/components/Btn";
import Link from "next/link";
import FormLayout from "@/components/FormLayout";
import { ArrowLeft } from "@/svgs";
import { normalizeErrors } from "@/utils/helpers";

const InitialData = {
  email: "",
  password: "",
};

const SignInForm = ({ heading, as_staff }) => {
  const { formData, setFormData, handleChange } = useForm(InitialData);
  const [signInuser, { isLoading, isSuccess, isError, error, data }] =
    useSignInUserMutation();
  const disableBtn = validator.whiteSpaces(formData);
  const router = useRouter();
  const token = getToken();

  const handleSignIn = async () => {
    const IsInValid = validator.whiteSpaces(formData);
    const payload = { ...formData, as_staff };
    if (IsInValid) {
      toast.warning("Enter valid credentials!", { autoClose: 30000 });
      return;
    }
    await signInuser(payload);
  };

  useEffect(() => {
    console.log(token, "ttok");
    if (error) {
      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }
    if (isSuccess) {
      toast.success(data?.message, { autoClose: 1000 });
      router.replace(`${as_staff ? "/admin" : "/user"}`);
      setToken(data?.data?.token.token);
      setLoginTime();
    }
  }, [
    isSuccess,
    isError,
    data?.data?.token.token,
    data?.message,
    error,
    router,
  ]);

  return (
    <FormLayout>
      <div className="w-full lg:w-[32rem] px-4 mx-auto mt-8 space-y-8">
        <div className="bg-white rounded-[12px] py-[3rem] lg:px-[3rem] px-4 border border-[#E6E8EC] space-y-8  ">
          <div className="flex items-center gap-1">
            <span onClick={() => router.back()} className="cursor-pointer">
              {ArrowLeft}
            </span>
            <h1 className="text-gray-800 text-lg font-semibold">{heading}</h1>
          </div>
          <div className="flex flex-col gap-6">
            <TextInput
              label="Email"
              placeholder="Your Email"
              type="email"
              value={formData.email}
              handleChange={handleChange}
              name="email"
            />
            <TextInput
              label="Password"
              type="password"
              value={formData.password}
              handleChange={handleChange}
              placeholder="Enter Password"
              name="password"
            />
            <Link
              href="/reset-password"
              className="inter600 text-[12px] text-center leading-[18px] text-[#0000008A] "
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-[2.5rem] flex flex-col  space-y-[18px] w-full ">
            <Btn
              text="Login"
              handleClick={handleSignIn}
              loading={isLoading}
              disabled={disableBtn}
              loadingMsg="Hold on..."
            />
            <h2 className="text-[12px] leading-[14px] text-[#3361FF] inter600 text-center ">
              <Link href="/signup">Dont have an account? Sign up </Link>
            </h2>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default SignInForm;
