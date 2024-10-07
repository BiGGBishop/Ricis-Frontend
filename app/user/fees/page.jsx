"use client";

import BgImgText from "@/components/BgImgText";
import React, { useEffect, useState } from "react";
import { feesData } from "@/utils/feesData";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Accordion = ({
  data,
  id,
  setCurrentAccordion,
  currentAccordion,
  changeDefault,
  borderBottom,
}) => {
  return (
    <div className={`w-full border-[#D5B69A] ${borderBottom ? "border-b rounded-b-xl" : ""}`}>
      <div
        onClick={() => {
          setCurrentAccordion(id);
          changeDefault(data.id);
        }}
        className={`${
          currentAccordion === id
            ? "bg-[#D5B69A] text-slate-800 "
            : "bg-transparent"
        }  py-3 px-3 cursor-pointer ${borderBottom ? "rounded-b-xl" : ""}`}
      >
        <p className="">{data.name}</p>
      </div>
    </div>
  );
};

const Fees = () => {
  const [selectedFee, setSelectedFee] = useState([]);
  const [currentFeeId, setCurrentFeeId] = useState(1);
  const [currentAccordion, setCurrentAccordion] = useState(0);

  useEffect(() => {
    const newFee = feesData.filter((fee) => fee.id === currentFeeId);
    setSelectedFee(newFee);
    console.log(selectedFee);
  }, [currentFeeId]);

  const changeDefault = (id) => {
    console.log(id);
    setCurrentFeeId(id);
  };

  return (
    <DashboardLayout>
      {" "}
      <BgImgText
        header="Fees"
        url="/images/homeBg2.png"
        text={selectedFee[0]?.name}
      />
      <div className="py-10 grid grid-cols-[3fr_7fr] gap-10">
        <div className="rounded-xl w-[20rem] border border-gray-500 h-fit">
          <div className="bg-[#2056A7] w-full py-2 px-3 rounded-t-xl">
            <p className="font-semibold text-white">Application Fees</p>
          </div>
          {feesData.map((data, index) => {
            const isNotLast = feesData.length - 1 !== index;
            return (
              <Accordion
                key={data.id}
                id={index}
                data={data}
                currentAccordion={currentAccordion}
                setCurrentAccordion={setCurrentAccordion}
                changeDefault={changeDefault}
                borderBottom={!isNotLast}
              />
            );
          })}
        </div>

        <div>
          {selectedFee[0]?.lists && (
            <div className="space-y-4 text-xs">
              {selectedFee[0]?.lists.map((list, id) => (
                <div
                  key={id}
                  className="bg-[#EFF0F3] flex justify-between shadow-sm rounded-md items-center px-4 py-4"
                >
                  <div className="flex gap-x-4 items-center">
                    <img className="w-5 h-5" src={list.icon} alt="" />
                    <p className="text-[0.9rem]">{list.title}</p>
                  </div>
                  {list.link && (
                    <a
                      href={list.link}
                      target="blank"
                      className="text-[#B12A27] border-[#B12A27] border-solid border-[1px] rounded-sm font-medium p-2 bg-white"
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
    </DashboardLayout>
  );
};

export default Fees;
