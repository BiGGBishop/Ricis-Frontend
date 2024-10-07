const NotificationSkeleton = () => {
    return (
      <div className="p-4 bg-gray-50 rounded-md space-y-5 w-full">
        <div className="flex justify-between">
          <div
            className={`flex items-center w-32 h-6 animate-pulse bg-gray-200
            } text-white rounded-lg text-xs font-semibold`}
          ></div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full animate-pulse bg-gray-200"></span>
            <span className="w-28 h-2 animate-pulse bg-gray-200"></span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-44 h-4 animate-pulse bg-gray-200"></span>
          </div>
          <p className="w-full h-14 animate-pulse bg-gray-200"></p>
        </div>
      </div>
    );
  };
  
  export default NotificationSkeleton;
  