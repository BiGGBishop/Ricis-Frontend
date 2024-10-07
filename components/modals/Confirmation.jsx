import Btn from "../Btn";

const Confirmation = ({ confirmAction, closeModal, loading }) => {
  // const
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[9999]">
      <div className="bg-white px-4 py-6 rounded shadow-md md:w-[500px] z-[9999] space-y-10">
        <div className="space-y-2">
          <h1 className="lg:text-xxl text-lg text-gray-800 font-semibold">
            Resubmit Application
          </h1>
          <p className="text-sm text-slate-500">
            Are you sure you want to re-submit this application ?
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={closeModal}
            className="text-sm bg-slate-800 py-2 px-6 shadow-md rounded-md text-white hover:opacity-75 transform active:scale-75 transition-transform"
          >
            cancel
          </button>
          <Btn
            text="Resubmit"
            handleClick={confirmAction}
            bgColorClass="bg-blue-400"
            loading={loading}
            loadingMsg="Re-submitting..."
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
