import mongoose from "mongoose";
import { IGenericErrorMessages } from "../interface/error";

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessages[] = [
    {
      path: error.path,
      message: "Invalid id",
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Cast Error",
    errorMessage: errors,
  };
};
