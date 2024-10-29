'use client';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import WithAuth from '@/components/withAuth';
// import FPI from "@/app/user/FPI";
import Drop from '@/app/user/application-type/documents/Drop';
// import Document from "@/app/user/application-type/[applicationId]/preview/Document";
import Document from '@/app/user/application-type/documents/Document';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Check, DocumentEmpty, file } from '@/svgs';
import { toast } from 'react-toastify';
import { validator } from '@/utils/validator';
import {
  deleteAllDocuments,
  deleteSingleDocument,
  saveDocumentData,
  updateSingleDocument,
} from '@/lib/indexDB';
import { getDocuments } from '@/lib/indexDB';
import useFiles from '@/hooks/useFiles';
import useDND from '@/hooks/useDND';

const Documents = () => {
  const router = useRouter();
  const params = useParams();
  const param = params.draftId;
  const draftId = param.split('-')[0];
  const applicationId = param.split('-')[1];

  const form_name = JSON.parse(localStorage.getItem('form_name'));

  const generatedDraftDocuments = JSON.parse(
    localStorage.getItem('generatedDraftDocuments')
  );
  const defaultDoc = generatedDraftDocuments[0]?.form_field.name;

  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(defaultDoc);

  const {
    selectedDocFiles,
    setSelectedDocFiles,
    handleFileUpload,
    sizeErrorFiles,
    setSizeErrorFiles,
  } = useFiles(
    'draftDocuments',
    documents,
    selectedDoc,
    applicationId,
    draftId
  );

  const {
    dragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDND(handleFileUpload);

  const handleFileChange = (e) => {
    handleFileUpload(e.target.files);
  };

  const currentDocuments = documents?.find((doc) => doc.name === selectedDoc);

  //   Delete from selected document
  const removeAllDocument = () => {
    deleteAllDocuments('draftDocuments')
      .then(() => {
        console.log('All documents deleted successfully');
        // Optionally, update the state or perform any other actions after deletion
      })
      .catch((error) => {
        console.error('Failed to delete all documents:', error);
      });
  };

  // console

  const removeSingleDocument = (itemId) => {
    deleteSingleDocument('draftDocuments', selectedDoc, itemId)
      .then(() => {
        console.log('Item deleted successfully from document data');
      })
      .catch((error) => {
        console.error('Failed to delete item from document data:', error);
      });

    getDocuments('draftDocuments')
      .then((documents) => {
        const singleDraftDocuments = documents?.filter(
          (doc) => doc.docId === draftId && doc.applicationId === applicationId
        );
        setDocuments(singleDraftDocuments);
        console.log(singleDraftDocuments);
      })
      .catch((error) => {
        console.error('Failed to load documents from IndexedDB:', error);
      });
  };

  console.log(documents);

  useEffect(() => {
    getDocuments('draftDocuments')
      .then((documents) => {
        const singleDraftDocuments = documents?.filter(
          (doc) => doc.docId === draftId && doc.applicationId === applicationId
        );
        setDocuments(singleDraftDocuments);
        console.log();
      })
      .catch((error) => {
        console.error('Failed to load documents from IndexedDB:', error);
      });
  }, [selectedDocFiles]);

  const previewForm = () => {
    const id = `${draftId}-${applicationId}`;
    router.push(`/user/drafts/${id}/preview`);
  };

  const addedDocs = JSON.parse(localStorage.getItem('documents'));

  const documentsEmpty =
    documents?.length === 0
      ? true
      : documents?.length !== generatedDraftDocuments?.length;
  console.log(documentsEmpty);
  console.log(currentDocuments);

  return (
    <DashboardLayout header={`Application`} icon="">
      <div className="space-y- w-full">
        <div className="space-y-4">
          <div className="flex justify-between items-center w-full">
            <div className="">
              <h1 className="text-black font-bold">
                Application Name:{' '}
                <span className="text-[#46B038]"> {form_name}</span>
              </h1>
              <p className="text-gray-600 text-sm">
                Please add all required documents
              </p>
            </div>
          </div>
          <div className="bg-white w-full shadow-md rounded-md space-y-6 lg:p-6 py-6 px-3 h-fit">
            <div className="flex items-center gap-1">
              <h1 className="text-[#46B038] font-bold">Draft's Documents:</h1>
              {/* <span className="font-semibold text-gray-500">{draftId}</span> */}
            </div>
            <div className="grid lg:grid-cols-[3fr_7fr] grid-cols-1 gap-4">
              <div className="bg-gray-100 space-y-3 px-3 py-2 text-[#0F5805] rounded-md text-sm">
                {generatedDraftDocuments?.map((doc) => {
                  // const filledDoc =
                  //   documents.find((current) => doc.name === selectedDoc)?.data
                  //     ?.length !== 0;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc?.form_field.name)}
                      className={`flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg ${
                        selectedDoc === doc.form_field.name
                          ? 'bg-gray-300 font-semibold'
                          : ''
                      }`}
                    >
                      <p>{doc.form_field.name.split('_').join(' ')}</p>
                      {/* {filledDoc && (
                        <span className="flex items-center justify-center rounded-full bg-[#69CB5C] w-4 h-4">
                          {Check}
                        </span>
                      )} */}
                      {doc?.required && <span className="text-red-500">*</span>}
                    </div>
                  );
                })}
              </div>
              <div className="w-full space-y-5">
                <Drop
                  documentName={selectedDoc}
                  onChange={handleFileChange}
                  dragging={dragging}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
                {sizeErrorFiles.length > 0 && (
                  <div className="text-red-700 font-medium text-sm space-y-2">
                    <p className="font-semibold">
                      File size must be less than 10mb.
                    </p>
                    {sizeErrorFiles.map((file) => (
                      <p key={file} className="italic">
                        {file}
                      </p>
                    ))}
                  </div>
                )}
                <div className="w-full space-y-4">
                  {(currentDocuments?.data?.length === 0 ||
                    !currentDocuments) && (
                    <div className="flex flex-col items-center space-y-3">
                      <span>{DocumentEmpty}</span>
                      <p className="text-sm text-gray-500">
                        No document selected.
                      </p>
                    </div>
                  )}
                  {currentDocuments?.data?.map((doc) => (
                    <Document
                      key={doc.name}
                      name={doc?.name}
                      removeDocument={() => removeSingleDocument(doc.name)}
                    />
                  ))}
                </div>
                <div className="pt-20 space-x-3 text-sm">
                  {/* <button
                    type="button"
                    onClick={removeAllDocument}
                    // onClick={() => router.push("/user/drafts")}
                    className="px-4 py-2 border border-[#46B038] text-gray-600 rounded-md hover:opacity-70"
                  >
                    Cancel
                  </button> */}
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-gray-900 text-white rounded-md hover:opacity-70 transform active:scale-75 transition-transform"
                  >
                    Back
                  </button>
                  <button
                    // disabled={documentsEmpty}
                    type="button"
                    onClick={previewForm}
                    className="px-6 py-2 bg-[#46B038] hover:opacity-70 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70 transform active:scale-75 transition-transform"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(Documents);
