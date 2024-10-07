import { generateSignature } from "@/generateSignature";
import { useRef, useState } from "react";
// import styles from "../styles/Home.module.css";
export function ImageUpload() {
  const formRef = useRef(null);
  const formFile = useRef();
  // Example code to show how to upload images using an unsigned preset
  // and a form.

  // Note, for security reasons, the upload preset used in this example
  // sets the access control mode of the uploaded assets to restricted,
  // so the URLs returned in the response will return 404 errors.

  const url = "https://api.cloudinary.com/v1_1/hzxyensd5/image/upload";

  const handleUpload = (e) => {
    console.log("hand");

    const files = formFile.current.files;
    console.log(files)
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      console.log(file)
      formData.append("file", file);
      formData.append("upload_preset", "docs_upload_example_us_preset");

      console.log(formData);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="">
      <form method="post" enctype="multipart/form-data" ref={formRef}>
        <input type="file" ref={formFile} name="files[]" multiple />
      </form>

      <button
        onClick={() => {
          handleUpload();
        }}
      >
        cluck
      </button>
    </div>
  );
}
