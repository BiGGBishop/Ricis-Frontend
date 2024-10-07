// import React from "react";
import { ClipLoader, FadeLoader } from "react-spinners";

const Btn = ({
  text,
  disabled,
  handleClick,
  loading,
  loadingMsg,
  bgColorClass = "bg-[#3361FF]",
  textColor,
}) => {
  return (
    <button
      className={`${textColor} py-2 px-[1.725rem] h-10 cursor-pointer flex items-center justify-center hover:opacity-70 shadow-md ${
        disabled ? "bg-gray-200" : bgColorClass
      } rounded-[4px] whitespace-nowrap transform active:scale-75 transition-transform`}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {loading ? (
        <div className="flex items-center gap-4">
          <ClipLoader color="#fff" size={20} />
          <span className="text-white">{loadingMsg}</span>
        </div>
      ) : (
        <h1
          className={`sf600 text-[0.825rem] leading-[21px] text-center ${
            disabled ? "text-gray-500" : "text-white"
          } `}
        >
          {text}
        </h1>
      )}
    </button>
  );
};

export default Btn;
