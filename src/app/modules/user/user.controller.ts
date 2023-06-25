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
    // console.log(dataResult);

    const result = await createUser(dataResult);

    // return res.status(200).json({ result });

    // sendResponse<IUser>(res, {
    //   statusCode: status.OK,
    //   success: true,
    //   message: "user created successfully!",
    //   data: result,
    // });

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

    // res.status(200).json({ result });

    sendResponse<IUser[]>(res, {
      statusCode: status.OK,
      success: true,
      message: "User retrived successfully",
      data: result,
    });
  }
);
