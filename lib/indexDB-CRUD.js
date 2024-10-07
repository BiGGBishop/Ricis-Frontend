import { getDocuments } from "./indexDB";

export const getAllDocuments = () => {
  getDocuments()
    .then((documents) => {
      return documents;
      //   console.log(documents);
    })
    .catch((error) => {
      console.error("Failed to load documents from IndexedDB:", error);
    });
};

// const getDocuments = () => {};

const deleteAllDocuments = () => {};

const deleteDocuments = () => {};
