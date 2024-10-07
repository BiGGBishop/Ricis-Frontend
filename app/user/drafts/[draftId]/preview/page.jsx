"use client";

import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import { Check } from "@/svgs";
import { document } from "@/svgs";
import Document from "@/app/user/application-type/[applicationId]/preview/Document";
import Btn from "@/components/Btn";
import { cloud_name, upload_preset } from "@/lib/configs";
import { useAddNewApplicationMutation } from "@/store/api/applicationApi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { normalizeErrors } from "@/utils/helpers";
import PaymentModal from "@/components/modals/paymentModal";
import { deleteDocumentsByDraftId, getDocuments } from "@/lib/indexDB";
import { ImageUpload } from "@/components/imageUpload";
import ImageUploadLoader from "@/components/loaders/imageUpload";
import { deleteAllDocuments } from "@/lib/indexDB";
import { convertToValidNumberType } from "@/utils/helpers";

const Preview = () => {
  const router = useRouter();
  const params = useParams();
  const param = params.draftId;
  const draftId = param.split("-")[0];
  const applicationId = param.split("-")[1];
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paynow, setPaynow] = useState(false);

  const form_name = JSON.parse(localStorage.getItem("form_name"));

  useEffect(() => {
    getDocuments("draftDocuments")
      .then((documents) => {
        const singleDraftDocuments = documents?.filter(
          (doc) => doc.docId === draftId
        );
        setDocuments(singleDraftDocuments);
      })
      .catch((error) => {
        console.error("Failed to load documents from IndexedDB:", error);
      });
  }, []);

  // retrieve already stored data from localstorage
  const storedFormData = JSON.parse(localStorage.getItem("draftFormData"));
  const formData = Object.keys(storedFormData);

  // const storedDocuments = JSON.parse(localStorage.getItem("documents"));
  // const documents = Object.keys(storedDocuments);

  // convert file content stored in local storage to blob to be uploaded to cloudinary
  const allFiles = documents
    ?.map((doc) => doc.data)
    .flat()
    .map((file) => new Blob([file.content], { type: file.type }));
  // );
  console.log(allFiles);

  const documentNames = documents?.map((doc) => doc.name);
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
  ] = useAddNewApplicationMutation();

  // get id of newly created application
  const new_application_id = newApplication?.data?.application?.id;

  // upload files to coudinary
  const handleUpload = async () => {
    const files = [];
    const formDatas = [];

    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    if (allFiles?.length !== 0 && documentNames?.length !== 0) {
      for (let i = 0; i < allFiles.length; i++) {
        let file = allFiles[i];
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
    const formFieldTypesObj = JSON.parse(
      localStorage.getItem("draftErrorFields")
    );
    const formData = convertToValidNumberType(
      storedFormData,
      formFieldTypesObj
    );
    try {
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

      console.log(forms);

      const payload = {
        draft_id: draftId,
        form_id: applicationId,
        data: forms,
      };
      console.log(payload);
      await addNewApplication(payload);
    } catch (error) {
      console.log(error);
      toast.error(error, { autoClose: 30000 });
    }
  };

  useEffect(() => {
    if (applicationError) {
      const err = normalizeErrors(applicationError);
      toast.error(err, { autoClose: 30000 });
      setIsLoading(false);
    }
    if (isApplicationSuccess) {
      toast.success("Successfully created form!", { autoClose: 5000 });
      setIsLoading(false);
      setPaynow(true);
      // Delete all documents from indexDB after upload
      deleteDocumentsByDraftId(draftId)
        .then(() => {
          console.log("All documents deleted successfully");
          // Optionally, update the state or perform any other actions after deletion
        })
        .catch((error) => {
          console.error("Failed to delete all documents:", error);
        });
    }
  }, [isApplicationSuccess, applicationError]);

  // const isLoading = isUploading || isApplicationLoading;

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
      <DashboardLayout header={`Application`} icon="">
        <div className="space-y- w-full">
          <div className="space-y-4">
            <div className="flex justify-between items-center w-full">
              <div className="">
                <h1 className="text-black font-bold">
                  Application Name:{" "}
                  <span className="text-[#46B038]"> {form_name}</span>
                </h1>
                <p className="text-gray-600 text-sm">
                  Please fill all information correctly
                </p>
              </div>
            </div>
            <div className="bg-white w-full shadow-md rounded-md space-y-6 p-6 h-fit">
              <div className="flex items-center gap-1">
                <h1 className="text-[#46B038] font-bold">
                  APPLICATION DETAILS:
                </h1>
              </div>
              <div className="grid grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-6 gap-y-4 text-sm">
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
              {documents?.length > 0 && (
                <div className="pt-8 space-y-6">
                  <p className="font-semibold">Applicant's Documents</p>
                  <div className="grid grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-8 gap-y-4 text-sm">
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
