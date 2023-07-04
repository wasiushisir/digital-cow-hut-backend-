import mongoose from "mongoose";
import { IGenericResponse } from "../interface/common";
import { IGenericErrorMessages } from "../interface/error";

export const handleValidationError = (
  error: mongoose.Error.ValidationError
) => {
  const errors: IGenericErrorMessages[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessage: errors,
  };
};

//  export default handleValidationError;
