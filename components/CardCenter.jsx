import Link from "next/link";
import React from "react";
import Image from "next/image";
import MotionComponent from "./MotionComponent";
import { fadeInVariants } from "@/utils/variants";
import { useRouter } from "next/navigation";

const CardCenter = ({ header, img, id, index, data }) => {
  const router = useRouter();

  return (
    <MotionComponent
      as="div"
      variants={fadeInVariants("up", (index + 1) / 10, 0.5)}
      className="flex items-center flex-col z-[1000] justify-center bg-white rounded-t-[15px] px-[4px] pt-[4px] cursor-pointer"
      onClick={() =>
        router.push(`/services?tab=${header}&subId=${data.firtServiceId}`)
      }
    >
      <div className="relative rounded-t-[12px]">
        <img src={img} className="w-[20rem] rounded-t-[12px] h-[150px]" />
        <div className="absolute rounded-t-[12px] inset-0 bg-black opacity-40 h-full"></div>
      </div>
      <div className="bw-full h-full text-black pt-2">
        <h1
          className="sf700 text-sm font-medium leading-[24px] tracking-[-0.64px] text-center"
          onClick={() => console.log("hiiii")}
        >
          {header}
        </h1>
      </div>
    </MotionComponent>
  );
};

export default CardCenter;
