export class Validator {
  constructor() {
    this.errorMessage = this.errorMessage;
  }
  whiteSpaces(credentials) {
    const invalidFields = Object.keys(credentials).filter(
      (field) => !credentials[field] || credentials[field].trim().length === 0
    );
    const message =
      "Please fill the field(s)" + invalidFields.join(", ") + "correctly!";
    this.errorMessage = message;
    return invalidFields.length !== 0;
  }

  notEmpty(value) {
    return Boolean(value && value.trim().length !== 0);
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Boolean(regex.test(email));
  }

  validateOTPCode(code) {
    const regex = /^[0-9]+$/;
    return regex.test(code);
  }

  validateNumber(code) {
    const regex = /^[0-9]+$/;
    return regex.test(code);
  }

  validatePhoneNumber(phone) {
    const trimmedNumber = phone.trim();
    const regex = /^(?:\+)?\d{1,}$/;
    return Boolean(
      regex.test(trimmedNumber) &&
        trimmedNumber.length >= 11 &&
        trimmedNumber.length <= 14
    );
  }

  atLeastOneValueNotEmpty(obj) {
    return !Object.values(obj).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        // !value &&
        value.trim().length !== 0
    );
  }

  // validate file type
  validateFileType = (file) => {
    // Get the file extension
    const extension = file?.name.split(".").pop().toLowerCase();

    // List of allowed extensions
    const allowedExtensions = ["pdf", "jpeg", "jpg", "png"];

    // Check if the extension is allowed
    if (!allowedExtensions.includes(extension)) {
      // toast.warning("Please upload a PDF or image file.", { autoClose: 10000 });
      return false;
    } else {
      return true;
    }
  };

  confirmPassword(new_password, confirm_password) {
    return new_password === confirm_password;
  }
}

export const validator = new Validator();

export default Validator;
