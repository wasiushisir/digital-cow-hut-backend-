import { SortOrder } from "mongoose";

export type paginatedOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type Ifilters = {
  searchTerm?: string;
  // minPrice?: number;
  // maxPrice?: number;
  location?: string;
};
