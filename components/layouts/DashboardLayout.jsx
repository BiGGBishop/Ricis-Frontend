"use client";

import Sidebar from "./Sidebar";
import { useState } from "react";
import { ArrowLeft, BellIcon } from "@/svgs";
import Image from "next/image";
import Hamburger from "../../public/images/hamburger.svg";
import Avatar from "../Avatar";
import { useSelector } from "react-redux";
import { selectRole, selectUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { Offline } from "@/svgs";

const DashboardLayout = ({ children, header, icon, isSidebarLink }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState("hidden");

  const currentUser = useSelector(selectUser);

  const role = useSelector(selectRole);
  const isUser = role === "USER";
  const isOnline = useNetworkStatus();

  // console.log("currentUser 1 ", selectUser);
  // console.log("currentUser here ", currentUser);
  // console.log("gottend here ", role);

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <>
      <div className={`h-full w-full mt-28`}>
        {showSidebar === "block" && (
          <div className="items-center gap-4 fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[999]"></div>
        )}
        <Sidebar
          display="block"
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
        <div className={`space-y-6 lg:px-6 px-3 lg:pr-20 pb-12`}>
          <div
            className={`flex justify-between py-5 px-5 w-full lg:w-[calc(100%-12rem)] lg:left-[12rem] left-0 lg:r-56 shadow-sm fixed top-0 bg-nav-bg backdrop-blur-md  transition ease-out delay-100 duration-500 z-[100]`}
          >
            <Image
              width="0"
              height="0"
              alt=""
              onClick={() => setShowSidebar("block")}
              className="w-8 h-8 lg:hidden"
              src={Hamburger}
            />
            <div className="w-full flex justify-between items-center">
              <div className="items-center gap-x-3 hidden lg:flex">
                {!isSidebarLink && (
                  <span
                    className="cursor-pointer hover:opacity-70 p-1 rounded-full border-2 border-dashed"
                    onClick={() => router.back()}
                  >
                    {ArrowLeft}
                  </span>
                )}
                {isOnline ? (
                  <h1 className="text-slate-800 text-lg font-semibold inline whitespace-nowrap">
                    {header}
                  </h1>
                ) : (
                  <div className="flex items-center gap-2 text-slate-800 text-lg font-semibold inline whitespace-nowrap">
                    <span className="">{Offline}</span>
                    <span className="">Offline</span>
                  </div>
                )}
              </div>
              <div className="flex items-center w-full justify-end gap-4">
                {isUser && (
                  <div
                    onClick={() => router.push("/user/notifications")}
                    className="p-2 border-2 rounded-full cursor-pointer"
                  >
                    <span className="">{BellIcon}</span>
                  </div>
                )}
                <div className="p-1 border-2 rounded-full">
                  <Avatar currentUser={currentUser} role={role} />
                </div>
              </div>
            </div>
          </div>
          <main className="lg:w-[calc(100%-8.5rem)] overflow-none lg:ml-[12rem]">
            {isOnline ? (
              children
            ) : (
              <div className="w-full bg-white h-screen justify-center flex flex-col items-center gap-2 text-slate-800 text-lg font-semibold inline whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <span className="">{Offline}</span>
                  <span className="">No Internet Connection</span>
                </div>
                <button
                  onClick={refreshPage}
                  className="bg-blue-800 px-4 py-2 text-white text-sm rounded-md shadow-md hover:opacity-70"
                >
                  Refresh
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
