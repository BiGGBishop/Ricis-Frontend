import React from "react";
import FooterText from "./FooterText";
import { FacebookIcon, LinkedInIcon, TwitterIcon, headerRound } from "../svgs";
import Image from "next/image";
import {
  useGetInformationQuery,
  useGetServicesQuery,
  useGetlegislaionsQuery,
} from "@/store/api/generalApi";
import { usePathname } from "next/navigation";
import { services } from "@/utils/servicesData";
import { legislationAndRules } from "@/utils/legislationAndRulesData";

const Footer = () => {
  const { data: servicesData } = useGetServicesQuery();
  const { data: informationData } = useGetInformationQuery();
  const { data: legislationData } = useGetlegislaionsQuery();

  // const services = services;
  const legislation = legislationData?.data.legislations;
  const information = informationData?.data.information;

  console.log(legislation);

  const pathname = usePathname();

  return (
    <footer
      className={`lg:space-y-0 bg-[#2056A7] ${
        pathname === "/" ? "pt-[15rem]" : "pt-20"
      } pb-[3rem] px-4 lg:px-[4rem]`}
    >
      <div className="space-y-20">
        <div className="lg:grid grid-cols-[3fr_3fr_2fr_3fr] lg:gap-x-24">
          <div className="space-y-20">
            <div className="flex flex-col space-y-5 w-full lg:max-w-sm">
              <img src="/images/logo2.svg" className="w-16 h-16" alt="" />
              <div className="text-[0.75rem] font-bold">
                <h2 className="sf700 mb-[4px] uppercase leading-[19.2px] tracking-[-0.2px] text-white">
                  Technical Consultant
                </h2>
                <h2 className="sf700 mb-[4px] uppercase leading-[19.2px] tracking-[-0.2px] text-white">
                  Boiler & Pressure Vessel Regulation
                </h2>
                <h2 className="sf700 mb-[4px] uppercase leading-[19.2px] tracking-[-0.2px] text-white">
                  Lifting & Allied Work Equipment (Safety) Regulation
                </h2>
              </div>
            </div>
          </div>

          <FooterText
            header="Legislation/Rules"
            data={legislationAndRules}
          />
          <FooterText header="Services" data={services} />
          <div>
            <FooterText
              header="Contact Us"
              data={[
                {
                  name: "P.O BOX 2500, 48 George Street, Houston, Texas.B.C.USA",
                  href: "/contact",
                },
                {
                  name: "+2349019133316",
                  href: "/contact",
                },
                {
                  name: "info@technical.consultant.com",
                  href: "/contact",
                },
              ]}
            />
            <div className="flex space-x-[16px] items-center pt-8 lg:pt-4">
              <span>{FacebookIcon}</span>
              <span>{LinkedInIcon}</span>
              <span>{TwitterIcon}</span>
            </div>
          </div>
        </div>

        {/* <div className="lg:grid grid-cols-[4fr_3fr_3fr] lg:gap-x-24">
          <div className="space-y-[0.5rem] items-start md:mt-[2rem] lg:max-w-sm  ">
            <img
              alt=""
              src="/images/logo.svg"
              className="pb-4 w-[100px] h-[90px]"
            />
            <div className="flex flex-col font-bold w-ful space-y-2 text-[0.75rem]">
              <h2 className="text-white leading-[19.2px] uppercase text-left">
                Regulatory IMPLEMentation & compliance scheme
              </h2>
              <h2 className="text-[#018839] leading-[19.2px] uppercase text-left">
                OCCUPATIONAL SAFETY & HEALTH DEPARTMENT
              </h2>
              <h2 className="text-[#018839] leading-[19.2px] uppercase text-left">
                FEDERAL MINISTRY OF LABOUR & EMPLOYMENT
              </h2>
            </div>
            <div className="flex space-x-[16px] items-center pt-8 lg:pt-4">
              <span>{FacebookIcon}</span>
              <span>{LinkedInIcon}</span>
              <span>{TwitterIcon}</span>
            </div>
          </div>
          <FooterText
            header="Legislation/Rules"
            data={legislation && [...legislation]}
          />
          <FooterText
            header="Information"
            data={information && [...information]}
          />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
