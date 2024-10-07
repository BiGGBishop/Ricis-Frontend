import {
  BounceLoader,
  ClipLoader,
  GridLoader,
  HashLoader,
} from "react-spinners";

const ImageUploadLoader = ({ isUploading, isSubmitting, isLoading }) => {
  return (
    <div className="flex justify-center items-center gap-4 fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[9999]">
      {isLoading && <HashLoader size={40} color="#fff" />}
      {/* <BounceLoader size={40} color="#fff" /> */}
      {isUploading && (
        <p className="text-white text-xl lg:text-3xl italic">
          Preparing Documents...
        </p>
      )}
      {isSubmitting && (
        <p className="text-white text-xl lg:text-3xl italic">
          Submitting Documents...
        </p>
      )}
    </div>
  );
};

export default ImageUploadLoader;
