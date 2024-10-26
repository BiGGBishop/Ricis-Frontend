"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StaffDetails from "../../staffDetails";
import { useGetFormsQuery } from "@/store/api/applicationApi";
import { ClipLoader } from "react-spinners";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useUpdateStaffMutation,
  useGetSingleStaffQuery,
  useUpdateStaffStatusMutation,
} from "@/store/api/userApi";
import Btn from "@/components/Btn";
import { toast } from "react-toastify";
import { normalizeErrors } from "@/utils/helpers";

const EditStaff = () => {
  const params = useParams();
  const staffId = params.staffId;
  const { data, isLoading, isSuccess, error } = useGetFormsQuery("");
  const [
    updateStaff,
    {
      isLoading: isUpdating,
      isSuccess: updateSuccess,
      error: updateError,
      data: updatedData,
    },
  ] = useUpdateStaffMutation();
  const forms = data?.data;
  console.log(data);
  const { data: staffData, refetch } = useGetSingleStaffQuery(staffId);

  const staff = staffData?.data;
  const status = staff?.user_status;
  const isAdmin = staff?.userroleId === 1 ? true : false;
  console.log({ status, isAdmin });
  const processable_forms = staff?.processableForms;
  const processable_forms_ids = processable_forms?.map((form) => form.id);
  console.log(staff);

  const [existingFormCategories, setExistingFormCategories] = useState([]);

  useEffect(() => {
    if (processable_forms_ids?.length > 0) {
      setExistingFormCategories(processable_forms_ids);
    }
  }, [processable_forms]);

  // Function to handle checkbox change
  const handleExistingCategories = (value) => {
    // Update the checkedItems array based on the checkbox state
    if (!existingFormCategories.includes(value)) {
      setExistingFormCategories([...existingFormCategories, value]);
      // setSelectedIds([...selectedIds, value]);
    } else {
      setExistingFormCategories(
        existingFormCategories.filter((item) => item !== value)
      );
    }
  };

  console.log(existingFormCategories);
  console.log(processable_forms_ids);

  const [
    updateStaffStatus,
    {
      isLoading: updatingStatus,
      error: updateStatusError,
      isSuccess: updateStatusSuccess,
    },
  ] = useUpdateStaffStatusMutation();

  const availableForms = forms?.filter(
    (form) => !processable_forms_ids?.includes(form.id)
  );

  const [checkedCategories, setCheckedCategories] = useState([]);
  // const [selectedIds, setSelectedIds] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (value) => {
    // Update the checkedItems array based on the checkbox state
    if (!checkedCategories.includes(value)) {
      setCheckedCategories([...checkedCategories, value]);
      // setSelectedIds([...selectedIds, value]);
    } else {
      setCheckedCategories(checkedCategories?.filter((item) => item !== value));
    }
  };

  console.log(checkedCategories);

  const updateStaffData = async () => {
    const forms = [...existingFormCategories, ...checkedCategories];
    const payload = {
      forms: forms,
      status: status,
      isAdmin: isAdmin,
    };
    console.log(payload);
    if (checkedCategories.length === 0) {
      return toast.error("Add atleast one role", { autoClose: 30000 });
    }
    await updateStaff({ staffId, payload });
  };

  const updateStaffCurrentStatus = async () => {
    const updatedStatus = status === "approved" ? "suspended" : "approved";
    const payload = { status: updatedStatus };
    console.log(payload);
    await updateStaffStatus({ staffId, payload });
  };

  useEffect(() => {
    if (updateError) {
      const err = normalizeErrors(updateError);
      toast.error(err, { autoClose: 30000 });
    }
    if (updateSuccess) {
      refetch();
      toast.success("Successfully updated staff data", { autoClose: 5000 });
    }
  }, [updateSuccess, updateError]);

  useEffect(() => {
    if (updateStatusError) {
      const err = normalizeErrors(updateStatusError);
      toast.error(err, { autoClose: 30000 });
    }
    if (updateStatusSuccess) {
      toast.success(
        `Successfully ${
          status === "approved" ? "suspended" : "unsuspended"
        } staff`,
        { autoClose: 5000 }
      );
      refetch();
    }
  }, [updateStatusError, updateStatusSuccess]);

  return (
    <DashboardLayout header="Admin">
      <div className="space-y-4">
        <div className="bg-white px-4 py-6">
          <StaffDetails staff={staff} staffId={staffId} />
          <div className="pt-12 pb-20">
            <h1 className="font-bold pb-3">Roles:</h1>
            <div className="space-y-2">
              {processable_forms?.length > 0 ? (
                processable_forms?.map((form) => (
                  <div
                    key={form.id}
                    className="flex text-[#46B038] items-center gap-4"
                  >
                    <Checkbox
                      value={form.id}
                      checked={existingFormCategories?.includes(form.id)}
                      onCheckedChange={() => handleExistingCategories(form?.id)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {form.name}
                    </label>
                  </div>
                  // <p key={form.id} className="text-[#46B038]">
                  //   {form?.name}
                  // </p>
                ))
              ) : (
                <p className="text-gray-500">No Role assigned</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4 bg-white px-4 py-8">
          <h1 className="font-bold">Add available Staff roles</h1>
          <div className="space-y-4">
            <div className="space-y-3">
              {isLoading ? (
                <ClipLoader size={40} />
              ) : (
                availableForms?.map((form) => (
                  <div key={form.id} className="flex items-center gap-4">
                    <Checkbox
                      value={form.id}
                      checked={checkedCategories.includes(form.id)}
                      onCheckedChange={() => handleCheckboxChange(form.id)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {form.name}
                    </label>
                  </div>
                ))
              )}
              {availableForms?.length === 0 ? (
                <p className="text-gray-500">Staff has all Roles</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-x-8 gap-y-4 pt-20">
          {availableForms?.length > 0 && (
            <Btn
              text="Save changes"
              loading={isUpdating}
              loadingMsg="updating data..."
              bgColorClass="bg-[#46B038]"
              handleClick={updateStaffData}
            />
          )}
          <button
            onClick={updateStaffCurrentStatus}
            className="bg-[#F0F2F2] text-gray-600 text-center shadow-md rounded-md flex justify-center gap-x-4 px-6 py-2 transform active:scale-75 transition-transform"
          >
            {updatingStatus && <ClipLoader size={20} />}
            <p className="font-medium text-sm">
              {updatingStatus
                ? "updating data..."
                : status === "ACTIVE"
                ? "Suspend"
                : "UnSuspend"}
            </p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditStaff;
