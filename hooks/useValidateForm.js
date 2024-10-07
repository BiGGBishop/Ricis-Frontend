import { useState } from "react";
import { validator } from "@/utils/validator";

const useValidateForm = (fieldsInitialErrorStates, formType) => {
  const errorInitializer = () =>
    JSON.parse(localStorage.getItem(formType)) || fieldsInitialErrorStates;
  const [errorFields, setErrorFields] = useState(errorInitializer);

  const validateForm = (formData) => {
    let validate = true;
    Object?.keys(formData).forEach((key) => {
      const currentValue = formData[key];
      const notEmpty = validator.notEmpty(currentValue);
      const phoneIsValid = validator.validatePhoneNumber(currentValue);
      const emailIsValid = validator.validateEmail(currentValue);
      const isValidNumber = validator.validateNumber(currentValue);
      const currentErrorKey = errorFields[key];

      if (validate) {
        if (currentErrorKey?.type === "EMAIL") {
          validate = notEmpty && emailIsValid;
        } else if (currentErrorKey?.type === "PHONE") {
          validate = notEmpty && phoneIsValid;
        } else if (currentErrorKey?.type === "NUMBER") {
          validate = notEmpty && isValidNumber;
        } else {
          validate = notEmpty;
        }
        console.log(`validate ${key} : ${validate} `);
      }

      if (currentErrorKey?.type === "EMAIL") {
        const updatedErrorState = {
          value: notEmpty && emailIsValid,
          message:
            !notEmpty && !emailIsValid
              ? "Invalid Field"
              : !emailIsValid
              ? "Inavlid Email"
              : "",
          type: currentErrorKey?.type,
        };
        setErrorFields((prev) => {
          return { ...prev, [key]: updatedErrorState };
        });
      } else if (currentErrorKey?.type === "PHONE") {
        const updatedErrorState = {
          value: notEmpty && phoneIsValid,
          message:
            !notEmpty && !phoneIsValid
              ? "Invalid Field"
              : !phoneIsValid
              ? "Inavlid Phone"
              : "",
          type: currentErrorKey?.type,
        };
        setErrorFields((prev) => {
          return { ...prev, [key]: updatedErrorState };
        });
      } else if (currentErrorKey?.type === "NUMBER") {
        const updatedErrorState = {
          value: notEmpty && isValidNumber,
          message:
            !notEmpty && !isValidNumber
              ? "Invalid Field"
              : !isValidNumber
              ? "Inavlid Number(This field must be a valid number)"
              : "",
          type: currentErrorKey?.type,
        };
        setErrorFields((prev) => {
          return { ...prev, [key]: updatedErrorState };
        });
      } else {
        // if (!notEmpty) {
        setErrorFields((prev) => {
          return {
            ...prev,
            [key]: {
              value: notEmpty,
              message: notEmpty ? "" : "Invalid Field",
              type: currentErrorKey?.type,
            },
          };
        });
        // }
        return;
      }
    });

    return validate;
  };

  return { validateForm, errorFields, setErrorFields };
};

export default useValidateForm;
