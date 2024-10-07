"use client";

import BgImgText from "@/components/BgImgText";
import React, { useEffect, useState } from "react";
import FAQ from "./FAQ";
import MainLayout from "@/components/mainLayout";
import { useGetFAQSQuery } from "@/store/api/generalApi";
import { faqs, faqsTypes } from "@/utils/faqData";

const Accordion = ({
  data,
  id,
  setCurrentAccordion,
  currentAccordion,
  changeDefault,
}) => {
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
        }  py-3 px-3 cursor-pointer`}
      >
        <p className="">{data.name}</p>
      </div>
    </div>
  );
};

const FAQs = () => {
  const { isLoading, isSuccess, isError, error, data } = useGetFAQSQuery();
  const description = data?.data.description;
  const imgUrl = data?.data.image;

  const [selectedFaqType, setSelectedFaqType] = useState([]);
  const [currentFaqTypeId, setCurrentFaqTypeId] = useState("faq1");
  const [currentAccordion, setCurrentAccordion] = useState(0);

  useEffect(() => {
    const newFaqType = faqs.filter((faq) => faq.faqTypeId === currentFaqTypeId);
    setSelectedFaqType(newFaqType);
    console.log(selectedFaqType);
  }, [currentFaqTypeId]);

  const changeDefault = (id) => {
    console.log(id);
    setCurrentFaqTypeId(id);
  };

  return (
    <MainLayout>
      <BgImgText
        // isLoading={isLoading}
        header="FAQS"
        url="/images/homeBg1.png"
        text={selectedFaqType[0]?.name}
      />
      <div className="py-10 px-12 grid grid-cols-[4fr_6fr] gap-10">
        <div className="rounded-xl w-[30rem] border border-gray-500 h-fit">
          <div className="bg-[#2056A7] w-full py-2 px-3 rounded-t-xl">
            <p className="font-semibold text-white">FAQS</p>
          </div>
          {faqsTypes.map((data, index) => {
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
        <FAQ selectedFaqType={selectedFaqType} />
      </div>
    </MainLayout>
  );
};

export default FAQs;
