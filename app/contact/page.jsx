"use client";

import BgImgText from "@/components/BgImgText";
import MainLayout from "@/components/mainLayout";
import { useGetContactInfosQuery } from "@/store/api/generalApi";
import React from "react";
import { FacebookIcon, LinkedInIcon, TwitterIcon } from "@/svgs";
// import {Display} from "next/font/google"

const Contact = () => {
  const { data, isLoading, isSuccess } = useGetContactInfosQuery();
  const contactInfos = data?.data.contactInfo;
  const imgUrl = data?.data.image;

  console.log(data);

  // const inter = SFP({ subsets: ["latin"] });

  return (
    <MainLayout>
      <section className="bg-[#2056A7] px-32 py-24 space-y-20">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <div className="w-ful space-y-5">
            <img
              alt=""
              className="self-center w-[100px] h-[90px]"
              src="/images/logo.svg"
            />
            <div className="text-white">
              <h3 className="font-bold">
                Regulatory IMPLEMentation & compliance scheme
              </h3>
              <p className="text-[#018839]">
                OCCUPATIONAL SAFETY & HEALTH DEPARTMENT
              </p>
              <p className="text-[#018839]">
                FEDERAL MINISTRY OF LABOUR & EMPLOYMENT
              </p>
            </div>
            <p className="text-white w-[20rem] text-sm">
              P.M.B. 04, Federal Secretariat Complex Phase I, Annex II, Shehu
              Shagari Way, Abuja FCT. Nigeria info@labour.gov.ng
            </p>
          </div>
          <div className="w-ful space-y-5">
            <img src="/images/logo2.svg" className="w-16 h-16" alt="" />
            <div className="text-white font-bold">
              <p className="">Regulatory IMPLEMentation & compliance scheme</p>
              <p className="">Boiler & Pressure Vessel Regulation </p>
              <p className="">
                Lifting & Allied Work Equipment (Safety) Regulation
              </p>
            </div>
            <div className="text-white space-y-1 w-[15rem] text-sm">
              <p className="">
                9 Community Road, Off Allen Avenue, Ikeja. Lagos
              </p>
              <p className="">info@technical.consultant.com</p>
              <p className="">09019133316</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-[16px] items-center pt-8 lg:pt-4">
          <span>{FacebookIcon}</span>
          <span>{LinkedInIcon}</span>
          <span>{TwitterIcon}</span>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
