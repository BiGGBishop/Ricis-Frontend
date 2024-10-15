"use client";
import WithAuth from "@/components/withAuth";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useGetFormsQuery } from "@/store/api/applicationApi";
import useForm from "@/hooks/useForm";
import { Checkbox } from "@/components/ui/checkbox";
import Btn from "@/components/Btn";
import { useCreateStaffMutation } from "@/store/api/userApi";
import { validator } from "@/utils/validator";
import { normalizeErrors } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { categoryData } from "@/utils/categoryData";
import Table from "./Table";
import Paginations from "@/components/Pagination";

const InitialData = {
  role: "",
  status: "",
  category: "",
  id: "",
  createdAt: "",
};

const Category = () => {
  const router = useRouter();

  const { data, isLoading, isSuccess, error } = useGetFormsQuery("");
  const forms = data?.data?.forms;

  const [
    createStaff,
    {
      isLoading: creatingStaff,
      isSuccess: createStaffSuccess,
      error: createStaffError,
    },
  ] = useCreateStaffMutation();

  const [checkedCategories, setCheckedCategories] = useState([]);
  const { formData, setFormData, handleChange } = useForm(InitialData);
  // const [selectedIds, setSelectedIds] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (value) => {
    // Update the checkedItems array based on the checkbox state
    if (!checkedCategories.includes(value)) {
      setCheckedCategories([...checkedCategories, value]);
      // setSelectedIds([...selectedIds, value]);
    } else {
      setCheckedCategories(checkedCategories.filter((item) => item !== value));
    }
  };

  const createNewStaff = async () => {
    const { role, staff_name, staff_email } = formData;
    const is_admin = role === "admin-staff";
    const isInValid = validator.whiteSpaces(formData);
    const emailIsValid = validator.validateEmail(staff_email);
    if (isInValid) {
      return toast.error("Fill in all fields correctly", { autoClose: 10000 });
    }
    if (!emailIsValid) {
      return toast.error("Fill in a valid email address pls.", {
        autoClose: 10000,
      });
    }
    if (checkedCategories.length === 0) {
      return toast.error("Add atleast one role", { autoClose: 10000 });
    }
    const payload = {
      name: staff_name,
      email: staff_email,
      password: "",
      is_admin,
      forms: checkedCategories,
    };
    await createStaff(payload);
  };

  useEffect(() => {
    if (createStaffError) {
      const err = normalizeErrors(createStaffError);
      toast.error(err, { autoClose: 30000 });
    }
    if (createStaffSuccess) {
      toast.success("Successfully created new staff", { autoClose: 5000 });
      router.push("/admin/staff-management");
    }
  }, [createStaffError, createStaffSuccess]);

  return (
    <DashboardLayout header="Admin">
      <div className="">
        {/* <div className="w-full m-auto pb-8 flex items-start justify-between ">
        <div className="">
          <h1 className="text-black font-bold text-xl">
            Create Classification
          </h1>
          <p className="text-gray-600 text-sm">
            create a classification by filling the information below
          </p>
        </div>
        <div className="">
          nn
        </div>
        </div> */}
        <div className="flex flex-col lg:flex-row justify-between w-full m-auto pb-8">
          <div className="w-full">
            <h1 className="text-black font-bold text-xl">Create Category</h1>
            <p className="text-gray-600 text-sm">
              create a category by filling the information below
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/category")}
            className="bg-blue-700 text-white shadow-md rounded-md flex gap-x-4 px-6 whitespace-nowrap items-center justify-center py-2 transform active:scale-75 transition-transform"
          >
            <img className="w-4 h-4" src="/images/transactionIcon.svg" alt="" />
            <p className="font-medium text-sm">Add SubCategory</p>
          </button>
        </div>
        <div className="bg-white w-full m-aut shadow-md rounded-md space-y-8 py-6 pl-6">
          <h1 className="text-[#46B038] font-bold">DETAILS</h1>
          <div className="lg:flex gap-x-6 items-center w-full gap-y-6 lg:flex-wrap">
            <div className="space-y-2.5 min-w-[350px]">
              <p className="font-bold">Category</p>
              <input
                type="text"
                name="staff_name"
                className="py-2 px-4 border-[1px] border-solid border-gray-300 rounded-lg w-full"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </div>
            <div className="max-w-s space-y-2.5 min-w-[200px]">
              <label htmlFor="applicationType" className="block mb-2 font-bold">
                Sub Category
              </label>
              <select
                name="role"
                value={formData.status}
                onChange={handleChange}
                id="countries"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected disabled>
                  Select status
                </option>
                <option value="sub-cat-1">Enabled</option>
                <option value="sub-cat-2">Disabled</option>
              </select>
            </div>
          </div>

          <div
            className="flex gap-x-4 w-full cursor-pointer"
            // onClick={() => {
            //   // createStaff();
            // }}
          >
            <Btn
              text="Create Category"
              loading={creatingStaff}
              loadingMsg="creating category..."
              bgColorClass="bg-[#46B038]"
              handleClick={createNewStaff}
            />
            {/* <button className="text-sm bg-[#46B038] h-[50%] text-white py-2 px-4 w-fit rounded-md flex items-center justify-center">
              {btnLoad ? (
                <ClipLoader color="#fff" size={20} />
              ) : btnLoad ? (
                "Creating..."
              ) : (
                "Create Account"
              )}
            </button> */}
          </div>
        </div>
        <div className="bg-white rounded-lg space-y-6 p-4">
          <h1 className="text-black font-bold">Manage Category Information</h1>
          {/* <Search /> */}
          <Table />
        </div>
        <div className="mt-8">
          {/* <Paginations
            pageCount={10}
            setPage={(event) => dispatch(setPage(event.selected + 1))}
          /> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Category);
