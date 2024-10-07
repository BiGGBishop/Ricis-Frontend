"use client";

import BgImgText from "@/components/BgImgText";
import MainLayout from "@/components/mainLayout";
import { useGetServicesQuery } from "@/store/api/generalApi";
import { ArrowDown } from "@/svgs";
import React, { Suspense, useEffect, useState } from "react";
import { services, subServices } from "@/utils/servicesData";
import { useRouter, useSearchParams } from "next/navigation";

const faqs = ["f1", "f2", "f3"];

const Accordion = ({
  boorderBottom,
  service,
  id,
  firstSubServiceId,
  index,
}) => {
  const param = useSearchParams();
  const tab = param.get("tab");
  const subId = param.get("subId");
  const router = useRouter();
  const isActive = (!tab && index === 0) || service.name === tab;

  return (
    <div
      className={`w-full ${
        boorderBottom && isActive && "border-b border-gray-500"
      } ${isActive ? "border-b border-[#D5B69A] rounded-xl" : ""}`}
    >
      <div
        onClick={() =>
          router.push(
            `/services?tab=${service.name}&subId=${firstSubServiceId}`
          )
        }
        className={`${
          isActive ? "bg-[#D5B69A] text-slate-800" : "bg-transparent"
        } flex items-center justify-between py-3 px-3 cursor-pointer`}
      >
        <p className="">{service.name}</p>
        <p className={`w-fi ${isActive ? "rotate-180" : "rotate-0"}`}>
          {ArrowDown}
        </p>
      </div>
      {isActive &&
        service.subServices?.map((equip, sub_index) => (
          <div key={index} className="px-3">
            <p
              className={`py-3 cursor-pointer ${
                (!subId && index === 0 && sub_index === 0) ||
                equip.id === +subId
                  ? "text-[#C7854A]"
                  : "text-black"
              }`}
              onClick={() => {
                router.push(`/services?tab=${service.name}&subId=${equip.id}`);
              }}
            >
              {equip.name}
            </p>
          </div>
        ))}
    </div>
  );
};

const ServicesBoundary = () => {
  const param = useSearchParams();
  const tab = param.get("tab");
  const subId = param.get("subId");
  const [currentSubService, setCurrentSubService] = useState({});

  const { data, isLoading, isSuccess } = useGetServicesQuery();

  const currentService = !tab
    ? services[0]
    : services.find((service) => service.name === tab);

  useEffect(() => {
    if (!tab) {
      const fisrt = subServices[0];
      setCurrentSubService(fisrt);
    } else {
      const currentSubServiceData = subServices.find(
        (subService) => subService.id === +subId
      );
      setCurrentSubService(currentSubServiceData);
    }
  }, [tab, subId]);

  const imgUrl = data?.data.image;

  return (
    <MainLayout>
      <BgImgText
        header="Our Services"
        text={currentService?.name}
        url="/images/bg6.png"
      />
      <div className="py-10 px-10 grid grid-cols-[4fr_6fr] gap-10">
        <div className="rounded-xl w-[30rem] border border-gray-500 h-fit">
          <div className="bg-[#2056A7] w-full py-2 px-3 rounded-t-xl">
            <p className="font-semibold text-white">Services</p>
          </div>
          {services?.map((service, index) => {
            const isNotLast = services.length - 1 !== index;
            return (
              <Suspense key={index}>
                <Accordion
                  id={index}
                  boorderBottom={isNotLast}
                  service={service}
                  firstSubServiceId={service.subServices[0]?.id}
                  index={index}
                />
              </Suspense>
            );
          })}
        </div>

        <div className="space-y-4 max-w-2xl">
          <h1 className="text-md font-bold">
            {currentSubService?.details?.header}
          </h1>
          {currentSubService?.details?.title && (
            <p className="text-sm text-gray-500">
              {currentSubService.details.title}
            </p>
          )}
          <ol className="text-gray-500 ml-6 space-y-10 text-sm list-decimal">
            {currentSubService?.details?.lists?.map((list, id) => (
              <li key={id} className="space-y-4">
                {list.des}
                {list.subLists &&
                  list.subLists.map((data, id) => (
                    <ol key={id} className="text-sm list-disc list-inside">
                      <li
                        key={Math.ceil(Math.random()) * id}
                        className="pt-2 text-gray-500"
                      >
                        {data}
                      </li>
                    </ol>
                  ))}
                {list.subDetails && (
                  <div className="space-y-4 py-4">
                    <h2 className="text-black font-bold">
                      {list.subDetails.subHeader}
                    </h2>
                    <p>{list.subDetails.subTitle}</p>
                    <ol className="text-sm list-disc list-inside space-y-2">
                      {list.subDetails.subLists.map((el, id) => (
                        <li key={Date.now()}>{el}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {list.mainSubLists &&
                  list.mainSubLists.map((mainSubList, id) => (
                    <ol
                      key={id}
                      className="space-y-4 text-sm list-inside alphaListStyle"
                    >
                      <li className="space-y-2">
                        <span className="text-sm">{mainSubList.name}</span>
                        {mainSubList.subLists &&
                          mainSubList.subLists.map((subList, id) => (
                            <ol
                              key={id}
                              className="text-sm list-disc list-inside ml-4"
                            >
                              <li>{subList}</li>
                            </ol>
                          ))}
                      </li>
                    </ol>
                  ))}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </MainLayout>
  );
};

const Services = () => {
  return (
    <Suspense>
      <ServicesBoundary />
    </Suspense>
  );
};

export default Services;
