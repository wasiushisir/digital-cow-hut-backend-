import { SortOrder } from "mongoose";
// import { paginatedOption } from "./../../../interface/pagination";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { createCow, deleteCow, getSingleCow, updateCow } from "./cow.service";
import { sendResponse } from "../../../shared/sendResponse";
import { ICow } from "./cow.interface";
import status from "http-status";
import pick from "../../../shared/pick";

import { getCow } from "../../modules/cow/cow.service";
import { paginationFields } from "../../../constants/pagination";
import { cowFilterableFields } from "../../modules/cow/cow.constant";

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
  type Org = { [key: string]: string };

  const queries: Org = {};

  if (req.query.limit) {
    const limit = req.query.limit as string;
    queries.limit = limit;
  }
  if (req.query.page) {
    const page = req.query.page as string;
    queries.page = page;
  }
  if (req.query.sortBy) {
    const sortBy = req.query.sortBy as string;
    queries.sortBy = sortBy;
  }
  if (req.query.sortOrder) {
    const sortOrder = req.query.sortOrder as string;
    queries.sortOrder = sortOrder;
  }

  // const paginatedOption = pick(req.query, paginationFields);
  const filters = pick(req.query, cowFilterableFields);

  const result = await getCow(queries, filters);
  console.log(filters);

  sendResponse<ICow[]>(res, {
    statusCode: status.OK,
    success: true,
    message: "cow retrived successfully",

    meta: result.meta,
    data: result.data,
  });
});

export const getSingleCowFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    // console.log(id);

    const result = await getSingleCow(id);

    sendResponse<ICow>(res, {
      statusCode: status.OK,
      success: true,
      message: "single cow retrived successfully",

      data: result,
    });
  }
);

export const updateCowFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await updateCow(id, updatedData);

    sendResponse<ICow>(res, {
      statusCode: status.OK,
      success: true,
      message: "Cow updated successfully !",
      data: result,
    });
  }
);

export const deleteCowFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteCow(id);

    sendResponse<ICow>(res, {
      statusCode: status.OK,
      success: true,
      message: "Cow deleted successfully",
      data: result,
    });
  }
);
