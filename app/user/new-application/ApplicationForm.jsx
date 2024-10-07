"use client";

import {
  useAddNewApplicationMutation,
  useGetSingleFormFieldsQuery,
} from "@/store/api/applicationApi";
import { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/helpers";
import Pagination from "@/components/Pagination";
import TextFieldSkeleton from "@/components/skeleton-loaders/TextFieldSkeleton";
import Btn from "@/components/Btn";
import useForm from "@/hooks/useForm";
import { validator } from "@/utils/validator";
import { toast } from "react-toastify";
import { normalizeErrors } from "@/utils/helpers";
import PaymentModal from "@/components/modals/paymentModal";
import { cloud_name, upload_preset } from "@/lib/configs";
import axios from "axios";
import { ImageUpload } from "@/components/imageUpload";
// import cloudinary from "cloudinary-core";
// import { v2 as cloudinary } from "cloudinary";

const ApplicationForm = () => {
  const param = useSearchParams();
  const formFile = useRef();
  const router = useRouter();
  const formId = param.get("form_id");
  const userId = param.get("user_id");
  const currentPageNum = param.get("page");
  const { isLoading, isSuccess, isError, error, data } =
    useGetSingleFormFieldsQuery(formId);
  const [fields, setFields] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const localStorageFields = userId
      ? JSON.parse(window.localStorage.getItem(userId))
      : data?.data.fields;
    setFields(localStorageFields || []);
  }, [userId, data]);

  console.log(fields);
  const total_pages = data?.data.total_pages;
  const [
    addNewApplication,
    {
      isLoading: isApplicationLoading,
      isSuccess: isApplicationSuccess,
      error: applicationError,
      data: newApplication,
    },
  ] = useAddNewApplicationMutation();
  const application_id = newApplication?.data?.application?.id;

  let InitialData = {};
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  // const cloudinaryInstance = cloudinary.Cloudinary.new({
  //   cloud_name: cloud_name,
  // });

  useEffect(() => {
    const createInitialObject = () => {
      if (fields?.length !== 0) {
        const initialData = {};
        fields.forEach((field) => {
          userId
            ? (initialData[field?.form_field.name] = field.value)
            : (initialData[field?.name] = "");
        });
        return initialData;
      }
      return {};
    };
    if (fields?.length !== 0) {
      const initialData = createInitialObject();
      setFormData(initialData);
    }
  }, [fields, userId]);

  const { formData, setFormData, handleChange } = useForm(InitialData);
  console.log(formData);

  const allfieldsNotFilled = validator.whiteSpaces(formData);

  const createNewApplication = async () => {
    const files = await handleUpload();
    console.log(files);
    // Assuming formData is an object and files is an array of objects
    const forms = files.reduce(
      (acc, file) => {
        // Check if the file object has the same key as formData
        if (acc.hasOwnProperty(file.name)) {
          // If yes, replace the value with the file object's value
          acc[file.name] = file.value;
        } else {
          // If not, add the file object to the accumulator
          acc[file.name] = file.value;
        }
        return acc;
      },
      { ...formData }
    );

    const payload = {
      form_id: formId,
      as_draft: allfieldsNotFilled,
      data: forms,
    };
    console.log(payload);
    await addNewApplication(payload);
  };

  const handleImage = (e, names) => {
    const file = e.target.files[0];
    images.push(file);
    imageNames.push(names);
  };

  const handleUpload = async () => {
    const files = [];
    const formDatas = [];

    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", upload_preset);
      formDatas.push(formData);
    }

    await Promise.all(
      formDatas.map(async (formData, index) => {
        try {
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data);
          files.push({
            name: imageNames[index],
            value: data.secure_url,
          });
        } catch (err) {
          console.error("Error uploading file:", err);
        }
      })
    );

    return files;
  };

  console.log(applicationError);

  useEffect(() => {
    if (applicationError) {
      const err = normalizeErrors(applicationError);
      toast.error(err, { autoClose: 2000 });
    }
    if (isApplicationSuccess) {
      toast.success(
        `${
          allfieldsNotFilled
            ? "Saved form to drafts"
            : "Successfully created form!"
        }`,
        {
          autoClose: 2000,
        }
      );
      if (allfieldsNotFilled) {
        router.push("/user/drafts");
      }
    }
  }, [isApplicationSuccess, applicationError]);

  // get inputfields for currentpage
  const currentPage = fields?.filter((field) => {
    if (!currentPageNum) {
      return +field.page === 1;
    } else {
      return +field.page === +currentPageNum;
    }
  });

  useEffect(() => {
    if (allfieldsNotFilled) {
      setIsVisible(false);
    }
    if (!allfieldsNotFilled) {
      setIsVisible(true);
    }
  }, [allfieldsNotFilled]);

  return (
    <>
      {isVisible && isApplicationSuccess && (
        <PaymentModal application_id={application_id} />
      )}
      <div className="w-full">
        <div className="flex justify-between items-center min-w-[95%] m-auto pb-8">
          <div className="">
            <h1 className="text-black font-bold">NEW APPLICATION</h1>
            <p className="text-gray-600 text-sm">
              Please fill all information correctly
            </p>
          </div>
          <Pagination
            totalPages={total_pages}
            form_Id={formId}
            currentPageNum={currentPageNum}
          />
        </div>
        <div className="bg-white w-fit  min-w-[95%] m-auto shadow-md rounded-md space-y-8 py-6 px-6">
          <h1 className="text-[#46B038] font-bold">APPLICATION DETAILS</h1>
          <form className="">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-3 md:grid-cols-2 align-items-center gap-y-8 w-full">
              {isSuccess && userId
                ? fields?.map((field, i) => (
                    <div key={field.id} className="w-full">
                      <label
                        className="block mb-3 font-medium max-w-[17rem]"
                        htmlFor={userId ? field.form_field.name : field.name}
                      >
                        {capitalizeFirstLetter(
                          userId ? field.form_field.name : field.name
                        )}
                      </label>
                      {userId ? (
                        field.form_field.type === "LONG_TEXT" ? (
                          <textarea
                            className="border boder-gray-200 outline-none w-full p-2 "
                            row={10}
                            onChange={handleChange}
                            name={field.form_field.name}
                            value={formData[field.form_field.name]}
                            placeholder={`Enter ${field.form_field.name}`}
                          ></textarea>
                        ) : field.form_field.type === "FILE" ? (
                          <div className="flex items-center">
                            <input
                              id={field.form_field.id}
                              name={field.form_field.name}
                              type="file"
                              ref={formFile}
                              onChange={(e) => {
                                handleImage(e, field.form_field.name);
                                const newFiles = [
                                  ...fileNames,
                                  {
                                    name: field.form_field.name,

                                    value: e.target.files[0].name,
                                  },
                                ];

                                setFileNames(newFiles);

                                handleChange(e);
                              }}
                              className="hidden"
                            />
                            <label
                              htmlFor={field.form_field.id}
                              className="text-sm p-2 min-w-[120px] rounded-full bg-gray-100 text-gray-500 cursor-pointer w-fit text-center "
                            >
                              Choose a file
                            </label>

                            <span className="ml-2 truncate ">
                              {fileNames.find(
                                (obj) => obj.name === field.form_field.name
                              )?.value || field.value}
                            </span>
                          </div>
                        ) : (
                          <InputField
                            id={field.form_field.id}
                            type={field.form_field.type.toLowerCase()}
                            required={field.form_field.required}
                            value={formData[field.form_field.name]}
                            name={field.form_field.name}
                            placeholder={`Enter ${capitalizeFirstLetter(
                              field.form_field.name
                            )}`}
                            handleChange={handleChange}
                            // value={field.value}
                          />
                        )
                      ) : field.type === "LONG_TEXT" ? (
                        <textarea
                          className="border boder-gray-200 outline-none w-full p-2 "
                          row={10}
                          onChange={handleChange}
                          value={userId && field.value}
                          name={userId ? field.form_field.name : field.name}
                          placeholder={`Enter ${field.name}`}
                        ></textarea>
                      ) : field.type === "FILE" ? (
                        <div className="flex items-center">
                          <input
                            id={field.id}
                            name={field.name}
                            type="file"
                            ref={formFile}
                            onChange={(e) => {
                              handleImage(e, field.name);
                              const newFiles = [
                                ...fileNames,
                                {
                                  name: field.name,
                                  value: e.target.files[0].name,
                                },
                              ];

                              setFileNames(newFiles);

                              handleChange(e);
                            }}
                            className="hidden"
                          />
                          <label
                            htmlFor={field.id}
                            className="text-sm p-2 w-[90%] rounded-full bg-gray-100 text-gray-500 cursor-pointer w-fit"
                          >
                            Choose a file
                          </label>

                          <span className="ml-2">
                            {fileNames.find((obj) => obj.name === field.name)
                              ?.value || ""}
                          </span>
                        </div>
                      ) : (
                        <InputField
                          id={field.id}
                          type={field?.type.toLowerCase()}
                          required={field.required}
                          name={field.name}
                          placeholder={`Enter ${capitalizeFirstLetter(
                            field.name
                          )}`}
                          handleChange={handleChange}
                          value={formData[field.name]}
                        />
                      )}
                    </div>
                  ))
                : currentPage?.map((field, i) => (
                    <div key={field.id} className="w-full">
                      <label
                        className="block mb-3 font-medium max-w-[17rem]"
                        htmlFor={userId ? field.form_field.name : field.name}
                      >
                        {capitalizeFirstLetter(
                          userId ? field.form_field.name : field.name
                        )}
                      </label>
                      {userId ? (
                        field.form_field.type === "LONG_TEXT" ? (
                          <textarea
                            className="border boder-gray-200 outline-none w-full p-2 "
                            row={10}
                            onChange={handleChange}
                            name={field.form_field.name}
                            value={formData[field.form_field.name]}
                            placeholder={`Enter ${field.form_field.name}`}
                          ></textarea>
                        ) : field.form_field.type === "FILE" ? (
                          <div className="flex items-center">
                            <input
                              id={field.form_field.id}
                              name={field.form_field.name}
                              type="file"
                              ref={formFile}
                              onChange={(e) => {
                                handleImage(e, field.form_field.name);
                                const newFiles = [
                                  ...fileNames,
                                  {
                                    name: field.form_field.name,

                                    value: e.target.files[0].name,
                                  },
                                ];

                                setFileNames(newFiles);

                                handleChange(e);
                              }}
                              className="hidden"
                            />
                            <label
                              htmlFor={field.form_field.id}
                              className="text-sm p-2 min-w-[120px] rounded-full bg-gray-100 text-gray-500 cursor-pointer w-fit text-center "
                            >
                              Choose a file
                            </label>

                            <span className="ml-2 truncate ">
                              {fileNames.find(
                                (obj) => obj.name === field.form_field.name
                              )?.value || field.value}
                            </span>
                          </div>
                        ) : (
                          <InputField
                            id={field.form_field.id}
                            type={field.form_field.type.toLowerCase()}
                            required={field.form_field.required}
                            value={formData[field.form_field.name]}
                            name={field.form_field.name}
                            placeholder={`Enter ${capitalizeFirstLetter(
                              field.form_field.name
                            )}`}
                            handleChange={handleChange}
                            // value={field.value}
                          />
                        )
                      ) : field.type === "LONG_TEXT" ? (
                        <textarea
                          className="border boder-gray-200 outline-none w-full p-2 "
                          row={10}
                          onChange={handleChange}
                          value={userId && field.value}
                          name={userId ? field.form_field.name : field.name}
                          placeholder={`Enter ${field.name}`}
                        ></textarea>
                      ) : field.type === "FILE" ? (
                        <div className="flex items-center">
                          <input
                            id={field.id}
                            name={field.name}
                            type="file"
                            ref={formFile}
                            onChange={(e) => {
                              handleImage(e, field.name);
                              const newFiles = [
                                ...fileNames,
                                {
                                  name: field.name,
                                  value: e.target.files[0].name,
                                },
                              ];

                              setFileNames(newFiles);

                              handleChange(e);
                            }}
                            className="hidden"
                          />
                          <label
                            htmlFor={field.id}
                            className="text-sm p-2 w-[90%] rounded-full bg-gray-100 text-gray-500 cursor-pointer w-fit"
                          >
                            Choose a file
                          </label>

                          <span className="ml-2">
                            {fileNames.find((obj) => obj.name === field.name)
                              ?.value || ""}
                          </span>
                        </div>
                      ) : (
                        <InputField
                          id={field.id}
                          type={field?.type.toLowerCase()}
                          required={field.required}
                          name={field.name}
                          placeholder={`Enter ${capitalizeFirstLetter(
                            field.name
                          )}`}
                          handleChange={handleChange}
                          value={formData[field.name]}
                        />
                      )}
                    </div>
                  ))}
              {(isLoading || !data) &&
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((loader) => (
                  <TextFieldSkeleton key={loader} />
                ))}
            </div>
            <div className="flex gap-x-2 mt-8">
              <Btn
                text="save as daft"
                loadingMsg="saving to drafts..."
                disabled={!allfieldsNotFilled}
                loading={allfieldsNotFilled && isApplicationLoading}
                handleClick={() => {
                  createNewApplication();
                }}
                bgColorClass="bg-[#46B038]"
              />
              <Btn
                text="save and continue"
                loadingMsg="submitting..."
                loading={!allfieldsNotFilled && isApplicationLoading}
                handleClick={() => {
                  createNewApplication();
                }}
                disabled={allfieldsNotFilled}
                bgColorClass="bg-[#46B038]"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
