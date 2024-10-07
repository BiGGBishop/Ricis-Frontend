"use client";

import BgImgText from "@/components/BgImgText";
import PdfComp from "@/components/PdfComp";
import MainLayout from "@/components/mainLayout";
import { useGetInformationQuery } from "@/store/api/generalApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "../legislation_rules/loader";
import { information } from "@/utils/informationPageData";

const Accordion = ({
  data,
  id,
  setCurrentAccordion,
  currentAccordion,
  changeDefault,
}) => {

 if (data.name === "Fees") return 

  return (
    <div className={`w-full border-b border-[#D5B69A] rounded-xl`}>
      <div
        onClick={() => {
          setCurrentAccordion(id);
          changeDefault(data.id);
        }}
        className={`${
          currentAccordion === id
            ? "bg-[#D5B69A] text-slate-800"
            : "bg-transparent"
        }  py-3 px-3`}
      >
        <p className="">{data.name}</p>
      </div>
    </div>
  );
};

const Information = () => {
  const { data, isLoading, isSuccess } = useGetInformationQuery();

  console.log(data);

  const results = data?.data.information;
  const description = data?.data.description;
  const imgUrl = data?.data.image;

  const [selectedInformation, setSelectedInformation] = useState([]);
  const [currentInformationId, setCurrentInformationId] = useState(1);
  const [currentAccordion, setCurrentAccordion] = useState(0);

  useEffect(() => {
    const newInformation = information.filter(
      (info) => info.id === currentInformationId
    );
    setSelectedInformation(newInformation);
  }, [currentInformationId]);

  const changeDefault = (id) => {
    console.log(id);
    setCurrentInformationId(id);
  };

  console.log(selectedInformation);

  return (
    <MainLayout>
      <BgImgText
        header="Information"
        text={selectedInformation[0]?.name}
        url="/images/bg4.png"
        isLoading={isLoading}
      />
      <div className="py-10 px-12 grid grid-cols-[4fr_6fr] gap-10">
        <div className="rounded-xl w-[30rem] border border-gray-500 h-fit">
          <div className="bg-[#2056A7] w-full py-2 px-3 rounded-t-xl">
            <p className="font-semibold text-white">FAQS</p>
          </div>
          {information.map((data, index) => {
            return (
              <Accordion
                key={data.id}
                id={index}
                data={data}
                currentAccordion={currentAccordion}
                setCurrentAccordion={setCurrentAccordion}
                changeDefault={changeDefault}
              />
            );
          })}
        </div>

        <div>
          {selectedInformation[0]?.lists && (
            <div className="space-y-4 text-xs">
              {selectedInformation[0]?.lists.map((list, id) => (
                <div
                  key={id}
                  className="bg-[#EFF0F3] flex justify-between shadow-sm rounded-md items-center px-4 py-4"
                >
                  <div className="flex gap-x-4 items-center">
                    <img className="w-5 h-5" src={list.icon} alt="" />
                    <p className="text-[1rem]">{list.title}</p>
                  </div>
                  {list.link && (
                    <a
                      href={list.link}
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

export default Information;
