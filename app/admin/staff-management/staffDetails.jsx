"use client";

import Avatar from "@/components/Avatar";
import DeleteStaff from "@/components/modals/DeleteStaff";
import { useGetSingleStaffQuery } from "@/store/api/userApi";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const StaffDetails = ({ staff, staffId }) => {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const pathname = usePathname();
  const isEditPage = pathname.includes("edit");

  const router = useRouter();

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const formattedDate = formatDate(staff?.created_at);

  return (
    <>
      {displayDeleteModal && (
        <DeleteStaff setDisplayDeleteModal={setDisplayDeleteModal} />
      )}
      <div>
        <div className="w-full lg:flex justify-between pb-8">
          <div>
            <h1 className="text-black font-bold text-lg">{staff?.name} Profile</h1>
            <p className="text-gray-600 text-sm">
              view staff account details below
            </p>
          </div>
          {!isEditPage && (
            <div className="flex gap-x-8 pt-8 lg:pt-20">
              <button
                onClick={() =>
                  router.push(`/admin/staff-management/${staffId}/edit`)
                }
                className="bg-[#46B038] shadow-md rounded-md text-sm text-white py-2 px-6 transform active:scale-75 transition-transform"
              >
                Edit
              </button>
              {/* <button
                onClick={() => setDisplayDeleteModal(true)}
                className="bg-[#F0F2F2] shadow-md rounded-md flex gap-x-4 px-6 py-2"
              >
                <img
                  className="w-4 h-4"
                  src="/images/deleteStaffIcon.svg"
                  alt=""
                />
                <p className="font-medium text-sm">Delete staff</p>
              </button> */}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-4 lg:space-y-0 lg:grid-cols-4 gap-x-8">
          <div className="shadow-md relative flex space-x-4 items-center py-4 px-2 bg-[#3361FF] bg-opacity-40">
            <Avatar />
            <div>
              <p className="text-sm">{staff?.name}</p>
              <p className="text-sm font-semibold text-gray-700">Staff Name</p>
            </div>
            <img className="w-4 h-4" src="/images/userIcon.svg" alt="" />
          </div>

          <div className="shadow-md relative flex space-x-4 items-center py-4 px-2 bg-[#46B038] bg-opacity-30">
            <img className="w-6 h-6" src="/images/emailIcon.svg" alt="" />
            <div className="w-[80%]">
              <p className="text-sm break-words">{staff?.email}</p>
              <p className="text-sm font-semibold text-gray-700">Staff Email</p>
            </div>
          </div>

          <div className="shadow-md relative flex space-x-4 items-center py-4 px-2 bg-[#C40E0E] bg-opacity-20">
            <img className="w-6 h-6" src="/images/fingerprintIcon.svg" alt="" />
            <div className="w-[80%]">
              <p className="text-sm break-words">{staff?.ref}</p>
              <p className="text-sm font-semibold text-gray-700">Staff Ref</p>
            </div>
          </div>

          <div className="shadow-md relative flex space-x-4 items-center py-4 px-2 bg-[#EABD52] bg-opacity-20">
            <img className="w-6 h-6" src="/images/calenderIcon.svg" alt="" />
            <div>
              <p className="text-sm">{formattedDate}</p>
              <p className="text-sm font-semibold text-gray-700">
                Staff Creation Date
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffDetails;
