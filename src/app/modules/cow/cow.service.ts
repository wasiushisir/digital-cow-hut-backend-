// import { IGenericResponse } from './../../../interface/common';
import { ICow } from "./cow.interface";
// import { paginatedOption } from './../../../interface/pagination';
import { CowFilters } from "../../modules/cow/cow.interface";
import { Cow } from "./cow.model";
import {
  Ifilters,
  paginatedOptions,
} from "../../../../src/interface/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
// import { IGenericResponse } from "../../../interface/common";
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interface/common";
import { cowFilterableFields } from "./cow.constant";
// import { IGenericResponse} from '../../../interface/common';

export const createCow = async (cow: ICow): Promise<ICow> => {
  const result = await Cow.create(cow);

  return result;
};

export const getCow = async (
  paginationOption: paginatedOptions,
  filters: CowFilters
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, minPrice, ...filtersData } = filters;

  const cows = await Cow.find({ price: { $lte: minPrice } });
  console.log(minPrice, "get all cow", cows);

  const andConditions = [];
  // andConditions.push(cows);

  // console.log(searchTerm);
  // console.log(paginationOption, "bx");

  // andConditions.push(...cows)

  if (searchTerm) {
    andConditions.push({
      $or: cowFilterableFields.map((fields) => ({
        [fields]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       { title: { $regex: searchTerm, $options: 'i' } },
  //       { code: { $regex: searchTerm, $options: 'i' } },
  //       { year: { $regex: searchTerm, $options: 'i' } },
  //     ],
  //   },
  // ]
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers(paginationOption);
  const sortConditions: { [key: string]: SortOrder } = {};
  console.log(sortBy);
  console.log(sortOrder);
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  // console.log(sortConditions);
  console.log(andConditions, "vv");
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  console.log(whereConditions);

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // console.log(result);

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
