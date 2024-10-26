export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const frontendBaseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_FRONTEND_DEVELOPMENT_BASE_URL
    : NEXT_PUBLIC_FRONTEND_PRODUCTION_BASE_URL;
export const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const api_key = process.env.NEXT_CLOUDINARY_API_KEY;
export const api_secret = process.env.NEXT_CLOUDINARY_API_SECRET;
export const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// export const verifyOTPUrl = "/auth/verify-otp";
// export const requestOTPUrl = "/auth/request-registration-otp";
// export const registrationUrl = "/auth/register";
// export const signInUrl = "/auth/login";
export const verifyOTPUrl = "/auth/verify/otp";
export const requestOTPUrl = "/auth/otp";
export const registrationUrl = "/auth/register/user";
export const registrationUrlStaff = "/auth/register/staff";
export const signInUrl = "/auth/login/user";
export const signInUrlStaff = "/auth/login/staff";
