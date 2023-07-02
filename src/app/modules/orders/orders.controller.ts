import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { IOrder } from "./orders.interface";
import status from "http-status";
import { createOrder } from "./orders.service";

export const createOrderFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await createOrder(data);

    sendResponse<IOrder>(res, {
      statusCode: status.OK,
      success: true,
      message: "Order done successfully",
      data: result,
    });
  }
);
