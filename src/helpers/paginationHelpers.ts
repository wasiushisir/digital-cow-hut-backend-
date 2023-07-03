import { SortOrder } from "mongoose";

type IPaginated = {
  page?: number;
  limit?: number;
  skip?: number;
  // sortBy?: string;
  // sortOrder?: SortOrder;
  // minPrice?: number;
  // maxPrice?: number;
  // location?: string | undefined;
};

type PaginatedResult = {
  page: number;
  limit: number;
  skip: number;
  // sortBy: string;
  // sortOrder: SortOrder;
  // minPrice: number;
  // maxPrice: number;
  // location: string | undefined;
};

export const paginationHelpers = (
  paginattionData: IPaginated
): PaginatedResult => {
  const page = Number(paginattionData.page || 1);

  const limit = Number(paginattionData.limit || 0);
  const skip = (page - 1) * limit;
  console.log(paginattionData);
  // const sortBy = paginattionData.sortBy || "createdAt";
  // const sortOrder = paginattionData?.sortOrder || "desc";
  // console.log(sortOrder, "from pagi helpers");

  return {
    page,
    limit,
    skip,
    // sortBy,
    // sortOrder,
  };
};
