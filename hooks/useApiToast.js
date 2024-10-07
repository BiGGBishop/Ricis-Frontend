import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useApiToast = ({
  data,
  isLoading,
  isSuccess,
  isError,
  error,
  loadingMsg,
  successMsg,
}) => {
  const [id, setId] = useState(undefined);

  useEffect(() => {
    if (isLoading && !isError) {
      setId(toast.loading(loadingMsg));
    }
    if (error) {
      if ("status" in error) {
        const errMsg = "error" in error ? error.error : error.data?.message;
        toast.update(id, {
          render: errMsg,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
          render: error?.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
    if (isSuccess) {
      toast.update(id, {
        render: successMsg,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
  }, [isLoading, isSuccess, data, error]);
};

export default useApiToast;
