const DeleteStaff = ({setDisplayDeleteModal}) => {
  return (
    <div onClick={() => setDisplayDeleteModal(false)} className="flex justify-center items-center fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[9999]">
      <div className="bg-white px-4 py-6 rounded shadow-md w-[300px] md:w-[400px] z-[9999] ">
        <div className="space-y-2">
          <h1 className="text-xl text-gray-800 text-center font-bold">
            You are about to delete the Staff User account
          </h1>
          <p className="text-sm textgray-400 text-center">
            This action cannot be undone. Are you sure you want to continue?
          </p>
        </div>
        <div className="flex gap-x-8 pt-8 justify-center">
          <button onClick={() => setDisplayDeleteModal(false)} className="bg-[#46B038] shadow-sm rounded-md text-sm text-white py-2 px-6">
            No, cancel
          </button>
          <button className="bg-[#F0F2F2] shadow-sm rounded-md flex gap-x-4 px-6 py-2">
            <p className="font-medium text-sm">Continue</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStaff;
