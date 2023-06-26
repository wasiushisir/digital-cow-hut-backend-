import { SortOrder } from "mongoose";

type IPaginated = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  minPrice?: number;
  maxPrice?: number;
  location?: string | undefined;
};

type PaginatedResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
  minPrice: number;
  maxPrice: number;
  location: string | undefined;
};

export const paginationHelpers = (
  paginattionData: IPaginated
): PaginatedResult => {
  const page = Number(paginattionData.page || 1);
  const limit = Number(paginattionData.limit || 0);
  const skip = (page - 1) * limit;
  const sortBy = paginattionData.sortBy || "createdAt";
  const sortOrder = paginattionData.sortOrder || "desc";
  const minPrice = Number(paginattionData.minPrice || 0);
  const maxPrice = Number(paginattionData.maxPrice || 0);
  const location = paginattionData.location || undefined;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    location,
  };
};
