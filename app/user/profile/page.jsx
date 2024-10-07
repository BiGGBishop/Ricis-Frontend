"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "@/store/api/userApi";
import { userBioData } from ".";
import useForm from "@/hooks/useForm";
import TextInput from "@/components/TextInput";
import Btn from "@/components/Btn";
import { useUpdateUserBioDataMutation } from "@/store/api/userApi";
import { normalizeErrors } from "@/utils/helpers";
import { validator } from "@/utils/validator";
import { toast } from "react-toastify";
import TextFieldSkeleton from "@/components/skeleton-loaders/TextFieldSkeleton";
import WithAuth from "@/components/withAuth";

const InitialData = {
  first_name: "",
  company_name: "",
  company_location: "",
  last_name: "",
  company_role: "",
  company_email: "",
  address: "",
  phone: "",
};

const Profile = () => {
  // const currentUser = useSelector(selectUser);
  // console.log(currentUser);

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
  const btnIsdisabled = validator.atLeastOneValueNotEmpty(formData);

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
  }, [isUpdated, bioError, refetchUser]);

  return (
    <DashboardLayout
      isSidebarLink={true}
      header={currentUser?.user?.fullName || currentUser?.user?.name}
    >
      <div className="w-full pb-6">
        <h1 className="text-black font-bold text-lg">{currentUser?.user?.fullName || currentUser?.user?.name} Profile</h1>
        <p className="text-gray-600 text-sm">
          view all user account details below
        </p>
      </div>
      <div className="bg-white rounded-lg px-3 lg:pl-6 pb-6">
        <h1 className="text-[#46B038] font-bold pt-4 pb-4">USER DETAILS:</h1>
        <div className="w-full space-y-8">
          <h2 className="text-gray-600 text-lg font-semibold">My Profile</h2>
          <div className="space-y-6 lg:w-1/2 w-full">
            {isSuccess &&
              userBioData.map((bio_data, index) => (
                <TextInput
                  key={bio_data.id}
                  label={bio_data.label}
                  placeholder={currentUser?.user[bio_data.name]}
                  type={bio_data.type}
                  value={formData[bio_data.name]}
                  handleChange={handleChange}
                  name={bio_data.name}
                  disabled={bio_data.type === "email"}
                  className="w-full"
                />
              ))}
            {(isLoading || !data) &&
              [1, 2, 3, 4, 5, 6, 7, 8].map((loader) => (
                <TextFieldSkeleton key={loader} />
              ))}
          </div>
          <div className="flex flex-col lg:flex-row w-full items-center gap-4">
            <Btn
              text="Save changes"
              loading={isUpdatingBioData}
              loadingMsg="saving.."
              handleClick={updateBio}
              disabled={btnIsdisabled}
              className="w-full"
              bgColorClass="bg-[#46B038]"
            ></Btn>
            <Btn
              text="Change Password"
              handleClick={() => router.push("/user/profile/change-password")}
            ></Btn>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Profile);
