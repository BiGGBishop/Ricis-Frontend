const TextFieldSkeleton = () => {
  return (
    <div className="w-full">
      <span className="block mb-3 lg:w-24 w-28 h-4 bg-gray-200 animate-pulse"></span>
      <div className="lg:w-96 w-full h-12 bg-gray-200 animate-pulse rounded-xl"></div>
    </div>
  );
};

export default TextFieldSkeleton;
