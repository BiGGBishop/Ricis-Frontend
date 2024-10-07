// indexedDB.js

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("hulu", 1);

    request.onerror = (event) => {
      reject("Failed to open IndexedDB:", event.target.error);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log(db);

      // Create object store for documents
      const documentsStore = db.createObjectStore("applicationDocuments", {
        keyPath: "id",
        autoIncrement: true,
      });
      documentsStore.createIndex("docId", "docId", { unique: false });

      // Create object store for documents
      const draftDocumentsStore = db.createObjectStore("draftDocuments", {
        keyPath: "id",
        autoIncrement: true,
      });
      draftDocumentsStore.createIndex("docId", "docId", { unique: false });

      // // Create object store for documents
      // const editDocumentsStore = db.createObjectStore("editDocuments", {
      //   keyPath: "id",
      //   autoIncrement: true,
      // });
      // editDocumentsStore.createIndex("docId", "docId", { unique: false });
      // console.log(draftDocumentsStore);

      // Create object store for formData
      const formDataStore = db.createObjectStore("formData", {
        keyPath: "id",
        autoIncrement: true,
      });
      formDataStore.createIndex("name", "name", { unique: false });
    };
  });
};

export const saveDocumentData = (name, documents) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(name);
      const db = await openDB();
      const transaction = db.transaction(name, "readwrite");
      const objectStore = transaction.objectStore(name);
      const request = objectStore.add(documents);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject("Failed to save document data:", event.target.error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

// export const saveFormData = (formData) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const db = await openDB();
//       const transaction = db.transaction("formData", "readwrite");
//       const objectStore = transaction.objectStore("formData");
//       const request = objectStore.add({ formData });

//       request.onsuccess = () => {
//         resolve();
//       };

//       request.onerror = (event) => {
//         reject("Failed to save form data:", event.target.error);
//       };
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// indexedDB.js

// export const getFormData = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const db = await openDB();
//       const transaction = db.transaction("formData", "readonly");
//       const objectStore = transaction.objectStore("formData");
//       const request = objectStore.getAll();

//       request.onsuccess = (event) => {
//         const formData = event.target.result;
//         resolve(formData);
//       };

//       request.onerror = (event) => {
//         reject("Failed to get formData:", event.target.error);
//       };
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const getDocuments = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(name, "readonly");
      const objectStore = transaction.objectStore(name);
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        const documents = event.target.result;
        resolve(documents);
      };

      request.onerror = (event) => {
        reject("Failed to get documents:", event.target.error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

// indexedDB.js

export const deleteAllDocuments = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(name, "readwrite");
      const objectStore = transaction.objectStore(name);

      // Clear the entire object store
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject("Failed to delete all documents:", event.target.error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteSingleDocument = (name, selectedDoc, itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(name, "readwrite");
      const objectStore = transaction.objectStore(name);

      // Retrieve the document containing the array
      const request = objectStore.getAll();

      request.onsuccess = () => {
        const documents = request.result;

        const document = documents.find((doc) => doc.name === selectedDoc);

        const updatedData = document.data.filter(
          (file) => file.name !== itemId
        );

        document.data = updatedData;

        // Update the object in IndexedDB with the modified array
        const updateRequest = objectStore.put(document);
        updateRequest.onsuccess = () => {
          resolve();
        };
        updateRequest.onerror = (event) => {
          reject("Failed to update document:", event.target.error);
        };

        // Iterate through all documents and find the item in the "data" array
        // for (const document of documents) {
        //   const index = document.data.findIndex((item) => item.name === itemId);

        //   if (index !== -1) {
        //     // Remove the item from the array
        //     document.data.splice(index, 1);

        //     // Update the object in IndexedDB with the modified array
        //     const updateRequest = objectStore.put(document);
        //     updateRequest.onsuccess = () => {
        //       resolve();
        //     };
        //     updateRequest.onerror = (event) => {
        //       reject("Failed to update document:", event.target.error);
        //     };
        //     return; // Exit the loop after updating the first matching document
        //   }
        // }

        // Reject if item is not found in any document
        reject("Item not found in any document data array");
      };

      request.onerror = (event) => {
        reject("Failed to retrieve documents:", event.target.error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

// indexedDB.js

export const updateSingleDocument = (name, item_name, newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(name, "readwrite");
      const objectStore = transaction.objectStore(name);

      // Retrieve the document containing the array
      const request = objectStore.getAll();

      request.onsuccess = () => {
        const documents = request.result;

        // Iterate through all documents and find the item in the "data" array
        // for (const document of documents) {
        const document = documents.find((doc) => doc.name === item_name);
        // const index = document.findIndex((item) => item.name === itemId);

        // if (index !== -1) {
        if (document) {
          const updatedItem = [...document.data, ...newData];
          // Update the item with the merged data
          document.data = updatedItem;

          // Update the object in IndexedDB with the modified array
          const updateRequest = objectStore.put(document);
          updateRequest.onsuccess = () => {
            resolve();
          };
          updateRequest.onerror = (event) => {
            reject("Failed to update document:", event.target.error);
          };
          return; // Exit the loop after updating the first matching document
          //   }
          // }
        }

        // Reject if item is not found in any document
        reject("Item not found in any document data array");
      };

      request.onerror = (event) => {
        reject("Failed to retrieve documents:", event.target.error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteDocumentsByDraftId = async (docId) => {
  try {
    const db = await openDB();
    const transaction = db.transaction("draftDocuments", "readwrite");
    const objectStore = transaction.objectStore("draftDocuments");

    const documents = await getDocuments("draftDocuments"); // Assuming you have a getDocuments function

    documents.forEach((document) => {
      if (document.docId === docId) {
        objectStore.delete(document.id);
      }
    });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = (event) => {
        reject("Failed to delete documents:", event.target.error);
      };
    });
  } catch (error) {
    throw new Error("Failed to delete documents:", error);
  }
};

// Transfer all curent application documents to draft documents when save as draft is triggered
export const transferDocuments = (applicationId, draftId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(name);
      const db = await openDB();
      const transaction = db.transaction("draftDocuments", "readwrite");
      const objectStore = transaction.objectStore("draftDocuments");

      const documents = await getDocuments("applicationDocuments");
      const drafts = await getDocuments("draftDocuments");

      const currentDraft = drafts?.find(
        (draft) => draft.applicationId === applicationId
      );

      if (currentDraft) {
        const incomingDocuments = documents.map((doc) => {
          return {
            name: doc.name,
            data: doc.data,
            applicationId,
            draftId,
          };
        });

        const updatedDraft = [...currentDraft.data, ...incomingDocuments];
        currentDraft.data = updatedDraft;

        const updateRequest = objectStore.put(currentDraft);
        updateRequest.onsuccess = () => {
          resolve();
        };
        updateRequest.onerror = (event) => {
          reject("Failed to update document:", event.target.error);
        };
      } else {
        for (document of documents) {
          const newDraft = {
            name: document.name,
            data: document.data,
            applicationId,
            draftId,
          };

          const request = objectStore.add(newDraft);

          request.onerror = (event) => {
            reject("Failed to save document data:", event.target.error);
          };
        }
      }

      // Transaction completion handler
      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = (event) => {
        reject("Transaction failed:", event.target.error);
      };
    } catch (error) {
      reject(error);
    }
  });
};
