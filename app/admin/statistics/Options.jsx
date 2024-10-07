"use client"

import {
  selectOption,
  setSelectedOption,
} from "@/store/features/statisticsSlice";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { useDispatch, useSelector } from "react-redux";

const selects = ["day", "week", "month", "year"];

const Options = () => {
  const dispatch = useDispatch();
  const selected = useSelector(selectOption);
  console.log(selected);

  const activeClass = "bg-[#1E1B39] text-white rounded-2xl";
  const InactiveClass = "bg-transparent text-gray-400";

  return (
    <div className="rounded-2xl border-slate-500 border lg:w-fit py-3 px-3 text-gray-400 space-x-3 w-full overflow-x-auto">
      {selects.map((value) => (
        <span
          key={value}
          onClick={()=> dispatch(setSelectedOption(value))}
          className={`${
            selected === value ? activeClass : InactiveClass
          } cursor-pointer py-3 px-4 text-xs whitespace-nowrap`}
        >
          {capitalizeFirstLetter(value)}
        </span>
      ))}
    </div>
  );
};

export default Options;
