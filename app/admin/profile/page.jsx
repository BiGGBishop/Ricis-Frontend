"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  useGetCurrentUserQuery,
  useUpdateUserBioDataMutation,
} from "@/store/api/userApi";
import { adminBioData } from ".";
import useForm from "@/hooks/useForm";
import TextInput from "@/components/TextInput";
import Btn from "@/components/Btn";
import { validator } from "@/utils/validator";
import { useEffect } from "react";
import { toast } from "react-toastify";
import TextFieldSkeleton from "@/components/skeleton-loaders/TextFieldSkeleton";
import WithAuth from "@/components/withAuth";
import { useRouter } from "next/navigation";
import { normalizeErrors } from "@/utils/helpers";

const InitialData = {
  name: "",
};

const Profile = () => {
  const router = useRouter();
  const { formData, setFormData, handleChange } = useForm(InitialData);
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();
  const currentUser = data?.data;
  const [
    updateUserBioData,
    {
      isLoading: isUpdatingBioData,
      isError: isBioError,
      error: bioError,
      data: bioData,
      isSuccess: isUpdated,
    },
  ] = useUpdateUserBioDataMutation();
  const btnIsdisabled = validator.whiteSpaces(formData);

  const updateBio = async () => {
    await updateUserBioData(formData);
  };

  useEffect(() => {
    if (bioError) {
      const err = normalizeErrors(bioError);
      toast.error(err, { autoClose: 10000 });
    }
    if (isUpdated) {
      toast.success("Bio data updated successfully", { autoClose: 5000 });
      refetchUser();
      setFormData(InitialData);
    }
  }, [isUpdated, refetchUser, setFormData]);

  return (
    <DashboardLayout header={isSuccess ? currentUser?.user.name : ""}>
      <div className="w-full pb-8">
        <h1 className="text-black font-bold text-2xl">User Profile</h1>
        <p className="text-gray-600 text-sm">
          view all user account details below
        </p>
      </div>
      <div className="bg-white rounded-lg space-y-8 px-4 lg:px-6 py-8">
        <div className="space-y-1.5">
          <h1 className="text-[#46B038] font-bold">USER DETAILS:</h1>
          {isLoading || !data ? (
            <h1 className="w-32 h-8 bg-gray-200 animate-pulse"></h1>
          ) : (
            <h1 className="text-gray-400 font-medium lg:text-xl text-lg">
              {currentUser?.role}
            </h1>
          )}
        </div>
        <div className="w-full space-y-6">
          <div className="space-y-6 lg:w-1/2 w-full">
            {isSuccess &&
              adminBioData.map((bio_data, index) => (
                <TextInput
                  key={bio_data.id}
                  label={bio_data.label}
                  placeholder={currentUser?.user[bio_data.name]}
                  type={bio_data.type}
                  value={formData[bio_data.name]}
                  handleChange={handleChange}
                  name={bio_data.name}
                  disabled={bio_data.type === "email"}
                />
              ))}
            {(isLoading || !data) &&
              [1, 2].map((loader) => <TextFieldSkeleton key={loader} />)}
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:items-center gap-4">
            <Btn
              text="Save changes"
              loading={isUpdatingBioData}
              loadingMsg="saving..."
              disabled={btnIsdisabled}
              handleClick={updateBio}
            ></Btn>
            <Btn
              text="Change Password"
              // loading={isUpdatingBioData}
              // loadingMsg="saving.."
              handleClick={() => router.push("/admin/profile/change-password")}
              // disabled={btnIsdisabled}
            ></Btn>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Profile);
