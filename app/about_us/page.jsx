"use client";

import BgImgText from "@/components/BgImgText";
import MainLayout from "@/components/mainLayout";
import React, { useEffect, useState } from "react";
import { aboutUs, subActs } from "@/utils/aboutUsData";
import { ArrowDown } from "@/svgs";

const Accordion = ({
  boorderBottom,
  isOpen,
  toggleAccordion,
  data,
  id,
  currentAccordion,
  setCurrentAccordion,
  currentServiceId,
  changeDefault,
}) => {
  return (
    <div
      className={`w-full ${
        boorderBottom && !isOpen && "border-b border-gray-500"
      } ${
        isOpen && data.hasDrop ? "border-b border-[#D5B69A] rounded-xl" : ""
      }`}
    >
      <div
        onClick={() => {
          toggleAccordion();
          !data.hasDrop && changeDefault(data.id);
          setCurrentAccordion(id);
        }}
        className={`${
          isOpen || currentAccordion === id
            ? "bg-[#D5B69A] text-slate-800"
            : "bg-transparent"
        } flex items-center justify-between py-3 px-3`}
      >
        <p className="">{data.name}</p>
        {data.hasDrop && (
          <p className={`w-fi ${isOpen ? "rotate-180" : "rotate-0"}`}>
            {ArrowDown}
          </p>
        )}
      </div>
      {isOpen &&
        data.hasDrop &&
        data.subActs?.map((abtData, index) => (
          <div key={index} className="px-3">
            <p
              className={`py-3 cursor-pointer ${
                abtData.id === currentServiceId
                  ? "text-[#C7854A]"
                  : "text-black"
              }`}
              onClick={() => {
                changeDefault(abtData.id);
                // setSelectedId(abtData.id);
              }}
            >
              {abtData.name}
            </p>
          </div>
        ))}
    </div>
  );
};

const Activities = () => {
  const [openedAccordion, setOpenedAccordion] = useState([""]);
  const [selectedAct, setSelectedAct] = useState([]);
  const [currentServiceId, setCurrentServiceId] = useState(1);
  const [currentAccordion, setCurrentAccordion] = useState(0);

  const toggleAccordion = (accordion_id) => {
    if (openedAccordion.includes(accordion_id)) {
      setOpenedAccordion([]);
    } else {
      setOpenedAccordion([accordion_id]);
    }
  };

  useEffect(() => {
    const newAct = subActs.filter((act) => currentServiceId === act.id);
    setSelectedAct(newAct);
  }, [currentServiceId]);

  const changeDefault = (id) => {
    console.log(id);
    setCurrentServiceId(id);
  };

  return (
    <MainLayout>
      <BgImgText
        header="About Us"
        text={selectedAct.length === 0 ? "Activities" : selectedAct[0]?.name}
        url="/images/bg4.png"
      />
      <div className="py-10 px-12 grid grid-cols-[4fr_6fr] gap-10">
        <div className="rounded-xl w-[30rem] border border-gray-500 h-fit">
          <div className="bg-[#2056A7] w-full py-2 px-3 rounded-t-xl">
            <p className="font-semibold text-white">About Us</p>
          </div>
          {aboutUs.map((data, index) => {
            const isNotLast = aboutUs.length - 1 !== index;
            return (
              <Accordion
                key={index}
                id={index}
                currentServiceId={currentServiceId}
                currentAccordion={currentAccordion}
                setCurrentAccordion={setCurrentAccordion}
                isOpen={openedAccordion.includes(data)}
                boorderBottom={isNotLast}
                data={data}
                changeDefault={changeDefault}
                toggleAccordion={() => toggleAccordion(data)}
              />
            );
          })}
        </div>

        <div className="text-gray-500">
          {selectedAct[0]?.name === "Administrative Structure" && (
            <div>
              <img src={selectedAct[0]?.details.admin1} alt="" />
              <img src={selectedAct[0]?.details.admin2} alt="" />
            </div>
          )}
          {selectedAct.map((data, index) => (
            <>
              <div>
                {data.details.image && <img src={data.details.image} alt="" />}
              </div>
              <div className="space-y-6" key={data.id}>
                <h1 className="font-bold text-black text-lg">
                  {data.details.mainHeader}
                </h1>
                <ol className="text-sm list-disc space-y-4 pl-4 list-inside">
                  {data.details.mainLists &&
                    data.details.mainLists.map((mainList, id) => (
                      <li key={id}>{mainList.des}</li>
                    ))}
                </ol>
                {data.details.sections &&
                  data.details.sections.map((section, id) => (
                    <div key={id} className="space-y-4">
                      <h1 className="font-medium text-black">
                        {section.subHeader}
                      </h1>
                      <p className="text-sm">{section.subTitle}</p>
                      <ol className="text-sm list-disc space-y-4 pl-4 list-inside">
                        {section.lists.map((list, id) => (
                          <li key={id}>{list}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Activities;
