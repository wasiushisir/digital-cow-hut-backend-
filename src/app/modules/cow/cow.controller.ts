import { SortOrder } from "mongoose";
// import { paginatedOption } from "./../../../interface/pagination";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { createCow } from "./cow.service";
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
  // const paginatedOption = {
  //   ...req.query,
  //   // page: req.query.page,
  //   // limit: req.query.limit,
  //   // sortBy: req.query.sortBy,
  //   // sortOrder: req.query.sortOrder,
  // };

  // const filters = {
  //   ...req.query,
  //   // searchTerm: req.query.searchTerm,
  //   // minPrice: req.query.minPrice,
  //   // maxPrice: req.query.maxPrice,
  //   // location: req.query?.location,
  // };
  const queries = {};

  if (req.query.limit) {
    const limit = req.query.limit;
    queries.limit = limit;
  }
  if (req.query.page) {
    const page = req.query.page;
    queries.page = page;
  }
  if (req.query.sortBy) {
    const sortBy = req.query.sortBy;
    queries.sortBy = sortBy;
  }
  if (req.query.sortOrder) {
    const sortOrder = req.query.sortOrder;
    queries.SortOrder = sortOrder;
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
