"use client";
import { Check } from "@/svgs";
import React, { useEffect, useState } from "react";

// FPI stands for form progress indicator
const FPI = ({ length, shade }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(shade ? shade : 1);
  }, [shade]);

  const circles = Array.from({ length: length }, (_, index) => (
    <div
      key={Math.random()}
      className={`w-6 h-6 rounded-full flex items-center justify-center p-1  ${
        index < currentPage ? "bg-[#46B038]" : "border border-gray-300"
      }`}
    >
      {(index + 1) <= currentPage && <span>{Check}</span>}
    </div>
  ));

  const lines = Array.from({ length: length - 1 }, (_, index) => (
    <div
      key={Math.random()}
      className={`flex-1 w-[65px] h-[2px] ${
        index < currentPage - 1
          ? "bg-[#46B038]"
          : "border-t border-b border-gray-300"
      }`}
    />
  ));

  return (
    <div className="flex items-center mx-auto">
      {circles.map((circle, index) => (
        <React.Fragment key={Math.random()}>
          {circle}
          {index < lines.length && lines[index]}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FPI;
