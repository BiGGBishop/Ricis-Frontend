import { useState } from "react";

const useForm = (InitialData) => {
  const [formData, setFormData] = useState(InitialData);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event?.target;
    const files = event.target.files;

    if (name === "media") {
      if (files) {
        setFormData((prevState) => {
          return { ...prevState, media: files[0] };
        });
        setMediaPreview(window.URL.createObjectURL(files[0]));
      }
    } else {
      setFormData((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
    // callback();
  };

  return { mediaPreview, setMediaPreview, formData, setFormData, handleChange };
};

export default useForm;
