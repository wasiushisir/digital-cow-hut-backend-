import { Request, Response, RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import status from "http-status";
import { getAllUser } from "../user/user.service";
import { IUser } from "./user.interface";
import { createUser } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";

export const createUserFromDb: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...dataResult } = req.body;

    const result = await createUser(dataResult);

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: "User created successfully",
      data: result,
    });
  }
);

export const getAllUsersFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllUser();

    sendResponse<IUser[]>(res, {
      statusCode: status.OK,
      success: true,
      message: "User retrived successfully",
      data: result,
    });
  }
);
