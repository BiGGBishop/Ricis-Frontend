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

export const POST = async (req, res) => {
  if (req.method === "POST") {
    return await uploadImageHandler(req);
  } else {
    return NextResponse.json({ status: 405, error: "Method Not Allowed" }); // Method Not Allowed
  }
};

const uploadImageHandler = async (req) => {
  const fileStr = req.body.file; // Assuming the image is sent as a base64 string from the frontend

  try {
    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "application_files", // Set this up in your Cloudinary settings
    });

    console.log(uploadResponse);

    // Send the uploaded image URL back to the frontend
    return NextResponse.json({ status: 200, data: uploadResponse.secure_url });
  } catch (error) {
    // Handle any errors that may occur during the upload process
    console.error("Error uploading image:", error);
    return NextResponse.json({
      error: "Something went wrong during image upload",
      status: 500,
    });
  }
};


// export const POST = async (req) => {
  
//   const data = await req.formData();
//   const image = await data.get("file");
//   const fileBuffer = await image.arrayBuffer();

//   var mime = image.type; 
//   var encoding = 'base64'; 
//   var base64Data = Buffer.from(fileBuffer).toString('base64');
//   var fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

//   try {
    
//     const uploadToCloudinary = () => {
//       return new Promise((resolve, reject) => {

//           var result = cloudinary.uploader.upload(fileUri, {
//             invalidate: true
//           })
//             .then((result) => {
//               console.log(result);
//               resolve(result);
//             })
//             .catch((error) => {
//               console.log(error);
//               reject(error);
//             });
//       });
//     };

//     const result = await uploadToCloudinary();
    
//     let imageUrl = result.secure_url;

//     return NextResponse.json(
//       { success: true, imageUrl: imageUrl },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("server err", error);
//     return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
//   }
// };

