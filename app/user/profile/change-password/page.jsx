"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import useForm from "@/hooks/useForm";
import { selectUser } from "@/store/features/userSlice";
import { useSelector } from "react-redux";
import { changePasswordFields } from "..";
import TextInput from "@/components/TextInput";
import Btn from "@/components/Btn";
import { validator } from "@/utils/validator";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "@/store/api/authApi";
import { normalizeErrors } from "@/utils/helpers";

const InitialData = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const ChangePassword = () => {
  const { formData, setFormData, handleChange } = useForm(InitialData);
  const currentUser = useSelector(selectUser);
  const [isInvalid, setIsInvalid] = useState(false);
  console.log(currentUser);
  const [changePassword, { isLoading, isSuccess, error, data }] =
    useChangePasswordMutation();

  const handleSubmit = async () => {
    // event.preventDefault();
    const { old_password, new_password, confirm_password } = formData;
    const isMatch = validator.confirmPassword(new_password, confirm_password);
    const isInValid = validator.whiteSpaces(formData);

    if (isInValid) {
      return toast.warning("Enter all fields", { autoClose: 10000 });
    }

    if (!isMatch) {
      setIsInvalid(true);
      return;
    }

    await changePassword({ old_password, new_password });
  };

  useEffect(() => {
    const { new_password, confirm_password } = formData;
    const isMatch = validator.confirmPassword(new_password, confirm_password);
    if (isMatch) {
      setIsInvalid(false);
    }
  }, [formData]);
  console.log(error);

  useEffect(() => {
    if (error) {
      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }

    if (isSuccess) {
      toast.success("Password successfully changed", { autoClose: 5000 });
      // refetchUser();
      setFormData(InitialData);
    }
  }, [isSuccess, setFormData, error]);

  return (
    <DashboardLayout header={currentUser?.fullName}>
      <div className="w-full pb-8">
        <h1 className="text-black font-bold text-2xl">User Profile</h1>
        <p className="text-gray-600 text-sm">
          view all user account details below
        </p>
      </div>
      <div className="bg-white rounded-lg px-3 lg:pl-6 py-6">
        <h1 className="text-[#46B038] font-bold pt-4 pb-8">Change Password</h1>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="w-full space-y-6"
        >
          <div className="space-y-8 lg:w-1/3 w-full">
            {changePasswordFields.map((data, index) => (
              <div key={data.id} className="space-y-2">
                <TextInput
                  label={data.label}
                  placeholder={data.placeholder}
                  type={data.type}
                  value={formData[data.name]}
                  handleChange={handleChange}
                  name={data.name}
                  className={`${
                    data.name === "confirm_password" && isInvalid
                      ? "ring-2 ring-red-400"
                      : ""
                  }`}
                />
                <p className="text-xs text-red-500 italic">
                  {data.name === "confirm_password" && isInvalid
                    ? "Password don't Match!"
                    : ""}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row w-full items-center gap-4">
            {/* <Btn text="cancel" bgColorClass="bg-gray-500"></Btn> */}
            <Btn
              text="Save changes"
              type="submit"
              loading={isLoading}
              loadingMsg="saving.."
              handleClick={handleSubmit}
              //   disabled={btnIsdisabled}
              className="w-full"
            ></Btn>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
