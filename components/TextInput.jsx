"use client";
import { Visibility, VisibilityOff } from "@/svgs";
import React, { useRef, useState } from "react";

const TextInput = ({
  label,
  type,
  placeholder,
  startIcon,
  value,
  name,
  handleChange,
  disabled,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div className="w-full">
      <h2 className="inter500 text-[14px] text-[#8D8D8D] leading-[21px] mb-[4px] font-semibold ">
        {label}
      </h2>
      <div
        className={` ${className} border items-center border-[#F0F0F0] outline:border-[2px] outline:border-[#3361FF] outline:cursor-[#3361FF]  rounded-[8px] flex px-[1rem] `}
      >
        <input
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          placeholder={placeholder}
          name={name}
          value={value && value}
          onChange={handleChange}
          disabled={disabled}
          className={` placeholder:text-gray-400 placeholder:text-[14px] inter500 text-md text-gray-500  py-3  leading-[21px] w-full flex-grow-1 outline-none h-full`}
        />
        {type === "password" && (
          <span onClick={toggleVisibility} className="">
            {isVisible ? VisibilityOff : Visibility}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
