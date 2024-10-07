"use client";

import BgImgText from "@/components/BgImgText";
import PdfComp from "@/components/PdfComp";
import MainLayout from "@/components/mainLayout";
import { useGetlegislaionsQuery } from "@/store/api/generalApi";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "./loader";
import {
  legislationAndRules,
  subLegislationAndRules,
} from "@/utils/legislationAndRulesData";
import { ArrowDown } from "@/svgs";
import { useSearchParams, useRouter } from "next/navigation";

const Accordion = ({ boorderBottom, data, id, index, firstSubRuleId }) => {
  const param = useSearchParams();
  const tab = param.get("tab");
  const subId = param.get("subId");
  const router = useRouter();
  const isActive = (!tab && index === 0) || data.name === tab;

  return (
    <div
      className={`w-full cursor-pointer ${
        boorderBottom && !isActive && "border-b border-gray-500"
      } ${
        isActive && data.hasDrop ? "border-b border-[#D5B69A] rounded-xl" : ""
      }`}
    >
      <div
        onClick={() =>
          router.push(
            `/legislation_rules?tab=${data.name}&subId=${firstSubRuleId}`
          )
        }
        className={`${
          isActive ? "bg-[#D5B69A] text-slate-800" : "bg-transparent"
        } flex items-center justify-between py-3 px-3`}
      >
        <p className="">{data.name}</p>
        {data.hasDrop && (
          <p className={`w-fi ${isActive ? "rotate-180" : "rotate-0"}`}>
            {ArrowDown}
          </p>
        )}
      </div>
      {isActive &&
        data.hasDrop &&
        data.subRule?.map((rule, sub_index) => (
          <div key={index} className="px-3">
            <p
              className={`py-3 cursor-pointer ${
                rule.id === +subId ? "text-[#C7854A]" : "text-black"
              }`}
              onClick={() =>
                router.push(
                  `/legislation_rules?tab=${data.name}&subId=${rule.id}`
                )
              }
            >
              {rule.name}
            </p>
          </div>
        ))}
    </div>
  );
};

const LegislationRules = () => {
  const { data, isLoading, isSuccess } = useGetlegislaionsQuery();
  console.log(data);

  const param = useSearchParams();
  const tab = param.get("tab");
  const subId = param.get("subId");
  const [currentSubRule, setCurrentSubRule] = useState({});

  // const results = data?.data.legislations;
  // const description = data?.data.description;
  // const imgUrl = data?.data.image;

  // const currentRule = legislationAndRules.find((rule) => rule.name === tab);

  useEffect(() => {
    if (!tab) {
      const fisrt = subLegislationAndRules[0];
      setCurrentSubRule(fisrt);
    } else {
      const currentSubRuleData = subLegislationAndRules.find(
        (subRule) => subRule.id === +subId
      );
      setCurrentSubRule(currentSubRuleData);
    }
  }, [tab, subId]);

  return (
    <MainLayout>
      <BgImgText
        header="Legislations/Rules"
        text={currentSubRule?.name}
        isLoading={isLoading}
        url="/images/bg7.png"
      />
      <div className="py-10 px-12 grid grid-cols-[4fr_6fr] gap-10">
        <div className="rounded-xl w-[30rem] border border-gray-500 h-fit">
          <div className="bg-[#2056A7] w-full py-2 px-3 rounded-t-xl">
            <p className="font-semibold text-white">Legislations/Rules</p>
          </div>
          {legislationAndRules.map((data, index) => {
            const isNotLast = legislationAndRules.length - 1 !== index;
            return (
              <Suspense key={index}>
                <Accordion
                  id={index}
                  index={index}
                  boorderBottom={isNotLast}
                  data={data}
                  firstSubRuleId={data.hasDrop ? data.subRule[0]?.id : data.id}
                />
              </Suspense>
            );
          })}
        </div>

        <div>
          {currentSubRule?.details?.pdfs && (
            <div className="space-y-4 text-xs">
              {currentSubRule?.details?.pdfs?.map((pdf, id) => (
                <div
                  key={id}
                  className="bg-[#EFF0F3] flex justify-between shadow-sm rounded-md items-center px-4 py-4"
                >
                  <div className="flex gap-x-4 items-center">
                    <img className="w-5 h-5" src={pdf.icon} alt="" />
                    <p className="text-[1rem]">{pdf.des}</p>
                  </div>
                  {pdf.link && (
                    <a
                      href={pdf.link}
                      target="blank"
                      className="text-[#B12A27]"
                    >
                      Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

const Page = () => {
  return (
    <Suspense>
      <LegislationRules />
    </Suspense>
  );
};

export default Page;
