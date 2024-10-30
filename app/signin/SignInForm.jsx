'use client';

import { useRouter } from 'next/navigation';
import useForm from '@/hooks/useForm';
import {
  useSignInStaffMutation,
  useSignInUserMutation,
} from '@/store/api/authApi';
import { getToken, setToken, setLoginTime } from '@/utils/authHelpers';
import { validator } from '@/utils/validator';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import TextInput from '@/components/TextInput';
import Btn from '@/components/Btn';
import Link from 'next/link';
import FormLayout from '@/components/FormLayout';
import { ArrowLeft } from '@/svgs';
import { normalizeErrors } from '@/utils/helpers';
import { useDispatch } from 'react-redux';
import { setRole, setUser } from '@/store/features/userSlice';

const InitialData = {
  email: '',
  password: '',
};

const SignInForm = ({ heading, as_staff }) => {
  const { formData, handleChange } = useForm(InitialData);
  const [signInUser, { isLoading, isSuccess, isError, error, data }] =
    useSignInUserMutation();
  const [
    signInStaff,
    {
      isLoading: isLoadingStaff,
      isSuccess: isSuccessStaff,
      isError: isErrorStaff,
      error: errorStaff,
      data: dataStaff,
    },
  ] = useSignInStaffMutation();
  const disableBtn = validator.whiteSpaces(formData);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAuthSuccess = async (userData, token, userRole, redirectPath) => {
    try {
      // First set all the necessary data
      setToken(token);
      dispatch(setUser(userData));
      dispatch(setRole(userRole));
      setLoginTime();

      // Small delay to ensure token is set before redirect
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Show success message
      toast.success('Login successful!', { autoClose: 1000 });

      // Finally redirect
      router.replace(redirectPath);
    } catch (err) {
      console.error('Auth success handling error:', err);
      toast.error('Something went wrong during login');
    }
  };

  const handleSignIn = async () => {
    try {
      const IsInValid = validator.whiteSpaces(formData);

      if (IsInValid) {
        toast.warning('Enter valid credentials!', { autoClose: 30000 });
        return;
      }

      if (!as_staff) {
        await signInUser(formData);
        if (error) {
          const err = normalizeErrors(error);
          toast.error(err, { autoClose: 30000 });
        }
        if (isSuccess) {
          toast.success(data?.message, { autoClose: 1000 });
          router.replace('/user');
          setToken(data?.data?.token);
          dispatch(setUser(data?.data?.user));
          dispatch(setRole('USER'));
          setLoginTime();
        }
      } else {
        await signInStaff(formData);
        if (isSuccessStaff) {
          toast.success(dataStaff?.message, { autoClose: 1000 });
          router.replace('/admin');
          setToken(dataStaff?.data?.token);
          dispatch(setUser(dataStaff?.data?.user));
          dispatch(
            setRole(dataStaff?.data?.user?.userroleId === 1 ? 'ADMIN' : 'STAFF')
          );
          setLoginTime();
        }
        if (errorStaff) {
          console.log('errorStaff', errorStaff);
          const err = normalizeErrors(errorStaff);
          toast.error(err, { autoClose: 30000 });
        }
      }
    } catch (error) {
      console.log('error', error);

      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }
  };

  useEffect(() => {
    if (!as_staff) {
      if (error) {
        const err = normalizeErrors(error);
        toast.error(err, { autoClose: 30000 });
      }
      if (isSuccess) {
        toast.success(data?.message, { autoClose: 1000 });
        dispatch(setUser(data?.data?.user));
        dispatch(setRole('USER'));
        setToken(data?.data?.token);
        setLoginTime();
        router.push('/user');
      }
    } else {
      if (isSuccessStaff) {
        toast.success(dataStaff?.message, { autoClose: 1000 });
        dispatch(setUser(dataStaff?.data?.user));
        setToken(dataStaff?.data?.token);
        dispatch(
          setRole(dataStaff?.data?.user?.userroleId === 1 ? 'ADMIN' : 'STAFF')
        )
        setLoginTime();
        router.push('/admin');
      }
      if (errorStaff) {
        const err = normalizeErrors(errorStaff);
        toast.error(err, { autoClose: 30000 });
      }
    }
  }, [
    isSuccess,
    data,
    error,
    router,
    as_staff,
    isSuccessStaff,
    errorStaff,
    dataStaff,
    dispatch,
  ]);


  return (
    <FormLayout>
      <div className="w-full lg:w-[32rem] px-4 mx-auto mt-8 space-y-8">
        <div className="bg-white rounded-[12px] py-[3rem] lg:px-[3rem] px-4 border border-[#E6E8EC] space-y-8">
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
              value={formData?.email}
              handleChange={handleChange}
              name="email"
            />
            <TextInput
              label="Password"
              type="password"
              value={formData?.password}
              handleChange={handleChange}
              placeholder="Enter Password"
              name="password"
            />
            <Link
              href="/reset-password"
              className="inter600 text-[12px] text-center leading-[18px] text-[#0000008A]"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-[2.5rem] flex flex-col space-y-[18px] w-full">
            <Btn
              text="Login"
              handleClick={handleSignIn}
              loading={as_staff ? isLoadingStaff : isLoading}
              disabled={disableBtn}
              loadingMsg="Hold on..."
            />
            <h2 className="text-[12px] leading-[14px] text-[#3361FF] inter600 text-center">
              <Link href="/signup">Dont have an account? Sign up</Link>
            </h2>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default SignInForm;
