"use client";

import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import { Check } from "@/svgs";
import { document } from "@/svgs";
import Document from "@/app/user/application-type/[applicationId]/preview/Document";
import Btn from "@/components/Btn";
import { cloud_name, upload_preset } from "@/lib/configs";
import {
  useAddNewApplicationMutation,
  useReSubmitApplicationMutation,
} from "@/store/api/applicationApi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { normalizeErrors } from "@/utils/helpers";
import PaymentModal from "@/components/modals/paymentModal";
import { getDocuments } from "@/lib/indexDB";
import { ImageUpload } from "@/components/imageUpload";
import ImageUploadLoader from "@/components/loaders/imageUpload";
import { deleteAllDocuments } from "@/lib/indexDB";
import { validator } from "@/utils/validator";
import { convertToValidNumberType } from "@/utils/helpers";

const Preview = () => {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId;
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paynow, setPaynow] = useState(false);
  const form_name = JSON.parse(localStorage.getItem("form_name"));

  const generatedDocuments = localStorage.getItem("generatedEditDocuments");

  useEffect(() => {
    if (generatedDocuments !== "undefined") {
      getDocuments("applicationDocuments")
        .then((documents) => {
          setDocuments(documents);
          console.log(documents);
          console.log(generatedDocuments);
        })
        .catch((error) => {
          console.error("Failed to load documents from IndexedDB:", error);
        });
    }
  }, []);

  console.log(documents);

  // retrieve already stored data from localstorage
  const storedFormData = JSON.parse(localStorage.getItem("editFormData"));
  const formData = Object.keys(storedFormData);

  const generatedDocumentsArray =
    generatedDocuments !== "undefined" ? JSON.parse(generatedDocuments) : [];

  const replacedDocuments =
    documents?.length > 0
      ? documents?.filter((doc) => doc.data.length !== 0)
      : [];
  console.log(replacedDocuments);

  const unchangedDocuments =
    replacedDocuments?.length === 0
      ? generatedDocumentsArray
      : generatedDocumentsArray?.filter((doc) => {
          return replacedDocuments?.find(
            (replacedDoc) => replacedDoc.name !== doc?.form_field.name
          );
        });

  // const storedDocuments = JSON.parse(localStorage.getItem("documents"));
  // const documents = Object.keys(storedDocuments);

  const getFilesToBeUploaded = () => {
    if (replacedDocuments?.length === 0) {
      return [];
    } else {
      const allFiles = replacedDocuments
        ?.map((doc) => doc.data)
        .flat()
        .map((file) => new Blob([file.content], { type: file.type }));
      return allFiles;
    }
  };

  const documentNames = replacedDocuments?.map((doc) => doc.name);
  console.log(documentNames);

  // add new application
  const [
    addNewApplication,
    {
      isLoading: isApplicationLoading,
      isSuccess: isApplicationSuccess,
      error: applicationError,
      data: newApplication,
    },
  ] = useReSubmitApplicationMutation();

  console.log(newApplication);

  // get id of newly created application
  const new_application_id = newApplication?.data?.application?.id;

  // upload files to coudinary
  const handleUpload = async () => {
    const files = [];
    const formDatas = [];
    const preparedFiles = getFilesToBeUploaded();

    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    if (preparedFiles?.length !== 0 && documentNames?.length !== 0) {
      for (let i = 0; i < preparedFiles.length; i++) {
        let file = preparedFiles[i];
        let formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);
        formDatas.push(formData);
      }

      await Promise.all(
        formDatas.map(async (formData, index) => {
          setIsLoading(true);
          setIsUploading(true);
          try {
            const response = await fetch(url, {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            console.log(data);
            files.push({
              name: documentNames[index],
              value: data.secure_url,
            });
          } catch (err) {
            console.error("Error uploading file:", err);
            setIsLoading(false);
            toast.error(err, { autoClose: 30000 });
          } finally {
            console.log("done");
            setIsUploading(false);
          }
        })
      );
    }

    return files;
  };

  const createNewApplication = async () => {
    const formFieldTypesObj = JSON.parse(localStorage.getItem("editErrorFields"));
    const formData = convertToValidNumberType(
      storedFormData,
      formFieldTypesObj
    );
    // Add unchnged files to payload
    const getUnchangedFiles = () => {
      let unchangedFiles = {};
      if (unchangedDocuments?.length !== 0) {
        unchangedDocuments.forEach((file) => {
          unchangedFiles[file.form_field.name] = file.value;
        });
      } else {
        return {};
      }
      return unchangedFiles;
    };

    try {
      const files = await handleUpload();
      console.log(files);
      const unchangedFiles = getUnchangedFiles();
      console.log(unchangedFiles);
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
        { ...formData, ...unchangedFiles }
      );

      console.log(forms);

      const payload = {
        form_id: applicationId,
        as_draft: false,
        data: forms,
      };
      console.log(payload);
      await addNewApplication({ payload, applicationId });
    } catch (error) {
      console.log(error);
      toast.error(error, { autoClose: 30000 });
    }
  };

  const isPaid = newApplication?.data?.application?.transactions?.length > 0;

  useEffect(() => {
    if (applicationError) {
      const err = normalizeErrors(applicationError);
      toast.error(err, { autoClose: 30000 });
      setIsLoading(false);
    }
    if (isApplicationSuccess) {
      setIsLoading(false);
      if (isPaid) {
        router.push("/user");
      } else {
        setPaynow(true);
      }
      // Delete all documents from indexDB after upload
      deleteAllDocuments("applicationDocuments")
        .then(() => {
          console.log("All documents deleted successfully");
          // Optionally, update the state or perform any other actions after deletion
        })
        .catch((error) => {
          console.error("Failed to delete all documents:", error);
        });

      toast.success(newApplication?.message, { autoClose: 10000 });
    }
  }, [isApplicationSuccess, applicationError]);

  const atLeastOneDocument = documents?.some((doc) => doc.data.length !== 0);
  const noNewDocument = documents?.every((doc) => doc.data.length === 0);
  const allNewDocuments =
    generatedDocumentsArray?.length === documents?.length
      ? documents?.every((doc) => doc.data.length !== 0)
      : false;

  return (
    <>
      {paynow && (
        <PaymentModal
          application_id={new_application_id}
          setPaynow={setPaynow}
        />
      )}
      {isLoading && (
        <ImageUploadLoader
          isUploading={isUploading}
          isSubmitting={isApplicationLoading}
          isLoading={isLoading}
        />
      )}
      <DashboardLayout header={`Preview Application`} icon="">
        <div className="space-y- w-full">
          <div className="space-y-4">
            <div className="flex justify-between items-center w-full">
              <div className="">
                <h1 className="text-black font-bold">
                  Application Name:{" "}
                  <span className="text-[#46B038]"> {form_name}</span>
                </h1>
                <p className="text-gray-600 text-sm">
                  Preview all fields and documents before submission
                </p>
              </div>
            </div>
            <div className="bg-white w-full shadow-md rounded-md space-y-6 p-6 h-fit">
              <div className="flex items-center gap-1">
                <h1 className="text-[#46B038] font-bold">
                  APPLICATION DETAILS:
                </h1>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-6 gap-y-4 text-sm">
                {formData.map((name) => (
                  <div key={name} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {name.split("_").join(" ")}
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#69CB5C] w-4 h-4">
                        {Check}
                      </span>
                    </div>
                    <p className="text-gray-500">{storedFormData[name]}</p>
                  </div>
                ))}
              </div>
              {generatedDocuments !== "undefined" &&
                atLeastOneDocument &&
                !allNewDocuments && (
                  <>
                    <div className="pt-8 space-y-6">
                      <p className="font-semibold">Unchanged Documents</p>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-8 gap-y-6 text-sm">
                        {unchangedDocuments?.map((doc) => (
                          <div key={doc} className="space-y-3">
                            <p className="text-[#69CB5C]">
                              {doc?.form_field.name}
                            </p>
                            <div className="space-y-3">
                              <Document documentName={doc?.value} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-8 space-y-6">
                      <p className="font-semibold">Replaced Documents</p>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-8 gap-y-6 text-sm">
                        {replacedDocuments?.map((doc) => (
                          <div key={doc} className="space-y-3">
                            <p className="text-[#69CB5C]">{doc?.name}</p>
                            <div className="space-y-3">
                              {doc?.data?.length === 0 ? (
                                <p className="text-gray-500">
                                  No file selected.
                                </p>
                              ) : (
                                doc?.data?.map((file) => (
                                  <Document
                                    key={file.name}
                                    documentName={file.name}
                                  />
                                ))
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              {generatedDocuments !== "undefined" && noNewDocument && (
                <div className="pt-8 space-y-6">
                  <p className="font-semibold">Applicant's Documents</p>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-8 gap-y-6 text-sm">
                    {generatedDocumentsArray?.map((doc) => (
                      <div key={doc} className="space-y-3">
                        <p className="text-[#69CB5C]">{doc?.form_field.name}</p>
                        <div className="space-y-3">
                          <Document documentName={doc?.value} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {generatedDocuments !== "undefined" && allNewDocuments && (
                <div className="pt-8 space-y-6">
                  <p className="font-semibold">Applicant's Documents</p>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-8 gap-y-6 text-sm">
                    {documents?.map((doc) => (
                      <div key={doc} className="space-y-3">
                        <p className="text-[#69CB5C]">{doc?.name}</p>
                        <div className="space-y-3">
                          {doc?.data?.length === 0 ? (
                            <p className="text-gray-500">No file selected.</p>
                          ) : (
                            doc?.data?.map((file) => (
                              <Document
                                key={file.name}
                                documentName={file.name}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-12 space-x-3 flex items-center">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 bg-gray-700 text-white rounded-md hover:opacity-70 transform active:scale-75 transition-transform"
                >
                  Back
                </button>
                <Btn
                  text="Submit"
                  handleClick={() => createNewApplication()}
                  bgColorClass="bg-[#46B038]"
                  loading={isApplicationLoading}
                  loadingMsg="submitting..."
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default WithAuth(Preview);
