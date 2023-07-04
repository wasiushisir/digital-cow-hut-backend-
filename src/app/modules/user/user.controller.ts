import { Request, Response, RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import status from "http-status";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../user/user.service";
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

export const getSingleUserFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    // console.log(id);

    const result = await getSingleUser(id);

    // console.log(result, "kiki_2");

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: "single user retrived successfully",

      data: result,
    });
  }
);

export const updateUserFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await updateUser(id, updatedData);

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: "User updated successfully !",
      data: result,
    });
  }
);

export const deleteUserFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteUser(id);

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  }
);
