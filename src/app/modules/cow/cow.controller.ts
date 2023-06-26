import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { createCow } from "./cow.service";
import { sendResponse } from "../../../shared/sendResponse";
import { ICow } from "./cow.interface";
import status from "http-status";

import { getCow } from "../cow/cow.service";

export const createCowFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await createCow(data);

    sendResponse<ICow>(res, {
      statusCode: status.OK,
      success: true,
      message: "Cow created successfully",
      data: result,
    });
  }
);

export const getCowFromDb = catchAsync(async (req: Request, res: Response) => {
  const paginatedOption = {
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    location: req.query.location,
  };
  console.log(paginatedOption);

  const result = await getCow(paginatedOption);

  sendResponse<ICow[]>(res, {
    statusCode: status.OK,
    success: true,
    message: "cow retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});
