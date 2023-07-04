import { ErrorRequestHandler } from "express";

import config from "../../config";
import ApiError from "../../errors/ApiError";
import { IGenericErrorMessages } from "../../interface/error";
import { handleValidationError } from "../../errors/handleValidationError";
import { handleCastError } from "../../errors/handleCastError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === "development"
    ? console.log("globalErrorHandler", err)
    : console.log("globalErrorHandler", err);

  let statuscode = 500;
  let message = "something went wrong";
  let errorMessages: IGenericErrorMessages[] = [];

  if (err?.name === "validationError") {
    const simplifiedError = handleValidationError(err);
    statuscode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statuscode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (err instanceof ApiError) {
    statuscode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  }

  // res.status(400).json({ error: err })

  res.status(400).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
