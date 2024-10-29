import { Cloud, PlusCircle } from "@/svgs";
import { useState } from "react";

const Drop = ({
  documentName,
  onChange,
  className,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  dragging,
}) => {
  return (
    <div
      className={`drag-drop-container ${
        dragging ? "opacity-50" : ""
      }`}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      dragging={dragging}
    >
      <label
        htmlFor="files"
        className={` ${className} flex flex-col items-center gap-y-3 bg-gray-100 rounded-md p-6 w-full text-sm border-2 border-dashed border-gray-400 cursor-pointer`}
      >
        <div className="text-center">
          <span className="m-0">{Cloud}</span>
          <p className="-mt-4">Drop file</p>
          <p className="text-gray-400 text-sm">OR</p>
        </div>
        <p className="">{PlusCircle}</p>
        <div className="text-center max-w-lg ">
          <p className="ext-gray-600">
            click on the plus sign to add your{" "}
            <span className="font-semibold">
              {documentName?.split("_").join(" ")}
            </span>
          </p>
          <p className="text-gray-400 text-sm">
            Ensure that the document you upload is in either JPEG or PDF format.
            Additionally, please keep in mind that the file size must not
            surpass 10MB
          </p>
        </div>
        <input
          className="hidden"
          id="files"
          type="file"
          name={documentName}
          multiple
          onChange={onChange}
          accept="image/*,.pdf"
          // accept=""
        />
      </label>
    </div>
  );
};

export default Drop;
