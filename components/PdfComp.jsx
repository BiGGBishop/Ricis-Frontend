"use client";

import { file, grid } from "@/svgs";
import React from "react";

const PdfComp = ({ data }) => {
  return (
    <div
      className={`p-[20px] h-auto w-full  flex flex-col space-y-[20px] border rounded-[10px] border-[#E0E0E0] border-t-[4px] ${
        data?.type === "excel" ? "border-t-[#3CD35D]" : "border-t-[#3361FF]"
      }`}
    >
      <div className="flex space-x-[10px]">
        <div
          className={`${
            data?.type === "EXCEL" ? "bg-[#6DCC81]" : "bg-[#3361FF]"
          } rounded-[4px] h-[48px] w-[48px] flex items-center justify-center`}
        >
          <span>{data?.ftype === "EXCEL" ? grid : file}</span>
        </div>
        <div className="flex flex-col justify-between items-start">
          <h2 className="sf500 text-[12px] leading-[18px]">
            {data?.page} {data?.type === "EXCEL" ? "SHEETS" : "PAGES"}
          </h2>
          <h1
            className={`${
              data?.type === "EXCEL" ? "text-[#6DCC81]" : "text-[#3361FF]"
            } sf500 lg:text-[18px] leading-[27px]`}
          >
            {data?.name}
          </h1>
        </div>
      </div>
      <div className="bg-[#F8F9FA] rounded-[20px] w-full">
        <img
          alt=""
          src={data?.img}
          className="w-[20%] max-h-[500px] lg:max-h-[300px] rounded-[12px]"
        />
      </div>
      <div className="w-full flex justify-end">
        <a href={data?.url} target="_blank" download>
          <button
            className={`py-[8px] px-[16px] ${
              data?.type === "EXCEL"
                ? "border-[#6DCC81] text-[#6DCC81] hover:bg-[#6DCC81] hover:text-white"
                : "border-[#3361FF] text-[#3361FF] hover:bg-[#3361FF] hover:text-white"
            } border rounded-[6px]`}
          >
            <h2
              className="
               inter700 text-[14px] leading-[21px]"
            >
              Download
            </h2>
          </button>
        </a>
      </div>
    </div>
  );
};

export default PdfComp;
