import { useState } from "react";
import { ClipLoader } from "react-spinners";

const Modal = ({
  handleStatBtn,
  text,
  btnLoader,
  handleClose,
  type,
  setReason,
}) => {
  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-content")) {
      handleClose();
    }
  };

  {
    return type === "pending" ? (
      <div>
        <div
          className="fixed inset-0 bg-[rgb(0,0,0,0.8)] z-[9999] bg-opacity-50 flex items-center justify-center modal-content"
          onClick={handleModalClick}
        >
          <div className="bg-white p-4 rounded shadow-md md:w-[500px] z-[9999]">
            <h1 className="text-black capitalize text-center mb-4 text-lg font-bold">
              {text} Application
            </h1>
            <p className="text-md font-semibold mb-2 text-center">
              Are you sure you have fully reviewed this applicaiton, and you
              want to {text} it
            </p>

            {text === "reject" && (
              <div className="mt-8  ">
                <h2>Reason:</h2>
                <textarea
                  className="border border-gray-300 rounded-[12px] w-full outline-none p-4 mt-2"
                  rows={5}
                  placeholder="Why are you rejecting this application?"
                  cols={10}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                ></textarea>
              </div>
            )}

            <div className="flex justify-center mt-8">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleClose}
              >
                No, Cancel
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => {
                  handleStatBtn();
                }}
              >
                {btnLoader ? <ClipLoader color="#000" size={25} /> : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center modal-content"
          onClick={handleModalClick}
        >
          <div className="bg-white p-4 rounded shadow-md md:w-[350px]">
            <p className="text-lg font-semibold mb-2 text-center">
              You are about to {text} the staff user account
            </p>
            <p className="mb-8 text-center">
              This action can not be undone.Are you sure you want to continue?
            </p>
            <div className="flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleClose}
              >
                No, Cancel
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => {
                  handleStatBtn();
                }}
              >
                {btnLoader ? <ClipLoader color="#000" size={25} /> : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
