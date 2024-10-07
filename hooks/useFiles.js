import { useState } from "react";
import { validator } from "@/utils/validator";
import { toast } from "react-toastify";
import { saveDocumentData } from "@/lib/indexDB";
import { updateSingleDocument } from "@/lib/indexDB";

const useFiles = (name, documents, selectedDoc, applicationId, draftId) => {
  const [selectedDocFiles, setSelectedDocFiles] = useState([]);
  const [sizeErrorFiles, setSizeErrorFiles] = useState([]);

  const currentDocuments = documents?.find((doc) => doc.name === selectedDoc);

  const handleFileUpload = (files) => {
    // Clear the error state
    setSizeErrorFiles([]);

    // const { name, value } = event.target;
    // const files = event.target.files;
    // console.log(files);
    const fileTypeIsValid = validator.validateFileType(files[0]);
    // console.log(Array.from(doc));

    if (files.length > 1 || currentDocuments?.data?.length === 1) {
      return toast.warning("Select just one file", { autoClose: 10000 });
    }

    if (!fileTypeIsValid) {
      return toast.warning("Please upload a PDF or image file.", {
        autoClose: 10000,
      });
    }

    const updatedSelectedDocFiles = [];
    // Loop through each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if file size is less than or equal to 10MB (in bytes)
      if (file.size <= 10 * 1024 * 1024) {
        const reader = new FileReader();

        // Read file content asynchronously
        reader.onload = function (event) {
          const fileContent = event.target.result;

          updatedSelectedDocFiles.push({
            name: file.name,
            type: file.type,
            content: fileContent,
          });
          setSelectedDocFiles((prevDocs) => [
            ...prevDocs,
            ...updatedSelectedDocFiles,
          ]);
          const isExist = documents?.find((doc) => doc?.name === selectedDoc);
          if (isExist) {
            updateSingleDocument(
              name,
              selectedDoc,
              updatedSelectedDocFiles
            )
              .then(() => {
                console.log("Item updated successfully");
              })
              .catch((error) => {
                console.error("Failed to update item:", error);
              });
          } else {
            saveDocumentData(name, {
              name: selectedDoc,
              data: updatedSelectedDocFiles,
              applicationId,
              docId: draftId,
            })
              .then(() => {
                console.log("Document data saved successfully");
              })
              .catch((error) => {
                console.error("Failed to save document data:", error);
              });
          }
        };

        // Read the file as data URL
        reader.readAsDataURL(file);
      } else {
        // Display error message for files larger than 10MB
        setSizeErrorFiles((prevErrorFiles) => [...prevErrorFiles, file.name]);
      }
    }
  };

  return {
    selectedDocFiles,
    setSelectedDocFiles,
    handleFileUpload,
    sizeErrorFiles,
    setSizeErrorFiles,
  };
};

export default useFiles;
