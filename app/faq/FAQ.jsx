"use client";
import React, { useState } from "react";
import { chevUp, chevDown } from "@/svgs";
import { useGetFAQSQuery } from "@/store/api/generalApi";
import { faqs } from "@/utils/faqData";

const FAQItem = ({ question, answer, isOpen, toggleAccordion }) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleOpen = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="border-b border-[#0000001F] w-full py-2 ">
      <div
        className="flex items-center justify-between w-full focus:outline-none cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="sf600 text-[0.8rem] font-bold leading-[30px] text-[#000000CC]">
          {question}
        </span>
        {isOpen ? chevUp : chevDown}
      </div>
      {isOpen && (
        <div className="py-4">
          <p className="text-[0.8rem] leading-[20px] text-[#0000008A] ">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQ = ({ selectedFaqType }) => {
  console.log(selectedFaqType);
  // const { isLoading, isSuccess, isError, error, data } = useGetFAQSQuery();
  // const faqs = data?.data.faqs;
  // const description = data?.des;

  // console.log(data);
  const [openedAccordions, setOpenedAccordions] = useState([""]);

  const toggleAccordion = (accordion_id) => {
    if (openedAccordions.includes(accordion_id)) {
      setOpenedAccordions([]);
    } else {
      setOpenedAccordions([accordion_id]);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      {selectedFaqType[0]?.data.map((faq) => (
        <FAQItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isOpen={openedAccordions.includes(faq.id)}
          toggleAccordion={() => toggleAccordion(faq.id)}
        />
      ))}
      {/* {(isLoading || faqs?.length === 0) &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((loader) => (
          <div key={loader} className="flex jstify-between gap-4 w-full">
            <div className="w-full h-16 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="w-10 h-4 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        ))} */}
    </div>
  );
};

export default FAQ;
