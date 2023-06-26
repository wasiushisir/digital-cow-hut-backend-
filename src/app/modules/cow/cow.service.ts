// import { paginatedOption } from './../../../interface/pagination';
import { ICow } from "./cow.interface";
import { Cow } from "./cow.model";
import { paginatedOption } from "../../../../src/interface/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interface/common";

export const createCow = async (cow: ICow): Promise<ICow> => {
  const result = await Cow.create(cow);

  return result;
};

export const getCow = async (
  paginatedOption: paginatedOption
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice, location } =
    paginationHelpers(paginatedOption);
  console.log(location);

  const result = await Cow.find().sort().limit(limit).skip(skip);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },

    data: result,
  };
};
