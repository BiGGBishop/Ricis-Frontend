import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { cloud_name, api_key, api_secret } from "@/lib/configs";

// Cloudinary config
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
  secure: true,
});

export const POST = async (req) => {
  if (req.method === "POST") {
    const fileStr = req.body.file; // Assuming the image is sent as a base64 string from the frontend
    console.log(fileStr);
    try {
      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        { file: fileStr },
        {
          upload_preset: "application_files", // Set this up in your Cloudinary settings
        }
      );

      // Send the uploaded image URL back to the frontend
      res.status(200).json({ imageURL: uploadResponse.secure_url });
    } catch (error) {
      // Handle any errors that may occur during the upload process
      console.error("Error uploading image:", error);
      res
        .status(500)
        .json({ error: "Something went wrong during image upload" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
