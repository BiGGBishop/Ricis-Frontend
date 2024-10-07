const { useRouter } = require("next/navigation");

const EmptyApplication = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[9999]">
      <div className="bg-white px-4 py-6 rounded shadow-md md:w-[500px] z-[9999] space-y-10">
        <div className="space-y-2">
          <h1 className="lg:text-2xl text-lg text-gray-800">Unavailable Application</h1>
          <p className="text-sm text-slate-500">
            This application is not available at the moment. Please check back
            later
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/user")}
            className="text-sm bg-blue-400 py-2 px-6 shadow-md rounded-md text-white hover:opacity-75 transform active:scale-75 transition-transform"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.back()}
            className="text-sm bg-slate-800 py-2 px-6 shadow-md rounded-md text-white hover:opacity-75 transform active:scale-75 transition-transform"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyApplication;
