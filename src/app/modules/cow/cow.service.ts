import { SortOrder } from "mongoose";
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
// import { SortOrder } from "mongoose";
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
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  console.log(Number(maxPrice));

  const andConditions = [];

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

  if (minPrice && maxPrice) {
    andConditions.push({
      $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
    });
  }
  if (minPrice) {
    andConditions.push({
      price: { $gte: minPrice },
    });
  }
  if (maxPrice) {
    andConditions.push({
      price: { $lte: maxPrice },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip } = paginationHelpers(paginationOption);

  const { sortBy, sortOrder } = paginationOption;
  const sortConditions: { [key: string]: SortOrder } = {};
  // console.log(sortBy, "jj");
  // console.log(sortOrder, "jj");
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  console.log(whereConditions);

  const result = await Cow.find(whereConditions)
    .populate("seller")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

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

export const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate("seller");
  return result;
};

export const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("seller");
  return result;
};

export const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};
