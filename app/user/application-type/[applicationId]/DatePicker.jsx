import { CalendarIcon } from "@/svgs";
import { useState, useEffect } from "react";
import { validator } from "@/utils/validator";

const DatePicker = ({
  name,
  value,
  onChange,
  id,
  isValid,
  error,
  required,
}) => {
  // const [isValid, setIsValid] = useState(true);
  // const [isFocus, setIsFocus] = useState(false);

  // const handleFocus = () => {
  //   setIsFocus(true);
  //   const notEmpty = validator.notEmpty(value);
  //   setIsValid(notEmpty);
  // };

  // useEffect(() => {
  //   if (isFocus) {
  //     handleFocus();
  //   }
  // }, [value]);

  return (
    <div class="w-full max-w-sm space-y-2 ">
      <div className="">
        <span className="font-semibold text-gray-600 text-sm"> {name}</span>
        {required && <span className="text-red-500 text-xl">*</span>}
      </div>
      <div className="">
        <p className="text-sm font-semibold">{value}</p>
        <input
          datepicker
          datepicker-autohide
          type="date"
          className={` ${
            !isValid ? "border-2 border-red-600" : "border-gray-300"
          } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`}
          placeholder="Select date"
          name={name}
          id="date-picker"
          onChange={onChange}
          value={value}
          required={required}
          autoComplete="off"
        />
      </div>
      {!isValid && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default DatePicker;
