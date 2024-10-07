import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsCard = ({ data }) => {
  return (
    <div className="lg:flex space-x-[12px] space-y-4 pb-5 lg:items-center">
      {/* <Image width="0" height="0" alt="" src={data?.img} className="w-full" /> */}
      <div className="lg:flex flex-col space-y-3 border-b pb-4">
        <h1 className="sf700 text-[1rem] lg:text-xl font-semibold leading-[20px] text-[#000000CC]">
          {data?.name}
        </h1>
        <h2 className="text-[#00000061]  text-[1rem] sf400 leading-[20px]  ">
          {data?.text}
        </h2>
        <Link href={data?.href}>
          <h2 className="sf400 text-[14px] leadiing-[20px] text-[#3361FF] ">
            Read more &rarr;
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
